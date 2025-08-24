// Node.js MySQL数据库连接和操作演示
const mysql = require('mysql2/promise');
const { EventEmitter } = require('events');

/**
 * 1. MySQL连接池管理器
 */
class MySQLConnectionManager {
  constructor(config = {}) {
    this.config = {
      host: config.host || 'localhost',
      port: config.port || 3306,
      user: config.user || 'root',
      password: config.password || 'password',
      database: config.database || 'test_db',
      connectionLimit: config.connectionLimit || 10,
      acquireTimeout: config.acquireTimeout || 60000,
      reconnect: config.reconnect !== false,
      ...config
    };
    
    this.pool = null;
    this.isConnected = false;
  }

  // 创建连接池
  async createPool() {
    try {
      this.pool = mysql.createPool({
        ...this.config,
        waitForConnections: true,
        queueLimit: 0
      });

      console.log('MySQL连接池创建成功');
      this.isConnected = true;
      
      // 测试连接
      await this.testConnection();
      return this.pool;
    } catch (error) {
      console.error('创建MySQL连接池失败:', error);
      throw error;
    }
  }

  // 测试连接
  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('MySQL连接测试成功');
      return true;
    } catch (error) {
      console.error('MySQL连接测试失败:', error);
      return false;
    }
  }

  // 执行查询
  async query(sql, params = []) {
    if (!this.pool) {
      throw new Error('连接池未初始化');
    }

    try {
      const [rows, fields] = await this.pool.execute(sql, params);
      return { rows, fields };
    } catch (error) {
      console.error('SQL执行错误:', error);
      throw error;
    }
  }

  // 开始事务
  async beginTransaction() {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();
    
    return {
      async query(sql, params) {
        const [rows] = await connection.execute(sql, params);
        return rows;
      },
      
      async commit() {
        await connection.commit();
        connection.release();
      },
      
      async rollback() {
        await connection.rollback();
        connection.release();
      }
    };
  }

  // 关闭连接池
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.isConnected = false;
      console.log('MySQL连接池已关闭');
    }
  }

  // 获取连接池状态
  getPoolStatus() {
    if (!this.pool) {
      return { status: '未连接' };
    }

    return {
      totalConnections: this.pool._allConnections.length,
      freeConnections: this.pool._freeConnections.length,
      connectionLimit: this.config.connectionLimit,
      acquireTimeout: this.config.acquireTimeout
    };
  }
}

/**
 * 2. 数据访问对象(DAO)模式实现
 */
class UserDAO {
  constructor(connectionManager) {
    this.db = connectionManager;
  }

  // 创建用户表
  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await this.db.query(sql);
    console.log('用户表创建成功');
  }

  // 创建用户
  async createUser(userData) {
    const { username, email, password } = userData;
    const sql = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;
    
    const result = await this.db.query(sql, [username, email, password]);
    return {
      id: result.rows.insertId,
      username,
      email,
      created_at: new Date()
    };
  }

  // 根据ID查找用户
  async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const result = await this.db.query(sql, [id]);
    return result.rows[0] || null;
  }

  // 根据用户名查找用户
  async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const result = await this.db.query(sql, [username]);
    return result.rows[0] || null;
  }

  // 获取所有用户
  async findAll(limit = 10, offset = 0) {
    const sql = 'SELECT id, username, email, created_at FROM users LIMIT ? OFFSET ?';
    const result = await this.db.query(sql, [limit, offset]);
    return result.rows;
  }

  // 更新用户
  async updateUser(id, updateData) {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) {
      throw new Error('没有要更新的字段');
    }
    
    values.push(id);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    const result = await this.db.query(sql, values);
    return result.rows.affectedRows > 0;
  }

  // 删除用户
  async deleteUser(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = await this.db.query(sql, [id]);
    return result.rows.affectedRows > 0;
  }

  // 用户统计
  async getUserStats() {
    const sql = `
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users_30_days,
        MIN(created_at) as first_user_date,
        MAX(created_at) as latest_user_date
      FROM users
    `;
    
    const result = await this.db.query(sql);
    return result.rows[0];
  }
}

/**
 * 3. 数据库迁移管理器
 */
class MigrationManager {
  constructor(connectionManager) {
    this.db = connectionManager;
    this.migrations = [];
  }

  // 创建迁移表
  async createMigrationsTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await this.db.query(sql);
    console.log('迁移表创建成功');
  }

  // 添加迁移
  addMigration(name, upFunction, downFunction) {
    this.migrations.push({
      name,
      up: upFunction,
      down: downFunction
    });
  }

  // 检查迁移是否已执行
  async isMigrationExecuted(name) {
    const sql = 'SELECT COUNT(*) as count FROM migrations WHERE name = ?';
    const result = await this.db.query(sql, [name]);
    return result.rows[0].count > 0;
  }

  // 执行迁移
  async runMigrations() {
    await this.createMigrationsTable();
    
    for (const migration of this.migrations) {
      const isExecuted = await this.isMigrationExecuted(migration.name);
      
      if (!isExecuted) {
        console.log(`执行迁移: ${migration.name}`);
        
        try {
          await migration.up(this.db);
          
          // 记录迁移执行
          const sql = 'INSERT INTO migrations (name) VALUES (?)';
          await this.db.query(sql, [migration.name]);
          
          console.log(`迁移 ${migration.name} 执行成功`);
        } catch (error) {
          console.error(`迁移 ${migration.name} 执行失败:`, error);
          throw error;
        }
      } else {
        console.log(`迁移 ${migration.name} 已执行，跳过`);
      }
    }
  }

  // 回滚迁移
  async rollbackMigration(name) {
    const migration = this.migrations.find(m => m.name === name);
    if (!migration) {
      throw new Error(`迁移 ${name} 不存在`);
    }

    const isExecuted = await this.isMigrationExecuted(name);
    if (!isExecuted) {
      console.log(`迁移 ${name} 尚未执行，无需回滚`);
      return;
    }

    try {
      await migration.down(this.db);
      
      // 删除迁移记录
      const sql = 'DELETE FROM migrations WHERE name = ?';
      await this.db.query(sql, [name]);
      
      console.log(`迁移 ${name} 回滚成功`);
    } catch (error) {
      console.error(`迁移 ${name} 回滚失败:`, error);
      throw error;
    }
  }
}

/**
 * 4. 查询构建器
 */
class QueryBuilder {
  constructor(table, db) {
    this.table = table;
    this.db = db;
    this.reset();
  }

  reset() {
    this._select = '*';
    this._where = [];
    this._joins = [];
    this._orderBy = [];
    this._groupBy = [];
    this._having = [];
    this._limit = null;
    this._offset = null;
    this._params = [];
    return this;
  }

  select(columns) {
    this._select = Array.isArray(columns) ? columns.join(', ') : columns;
    return this;
  }

  where(column, operator, value) {
    if (arguments.length === 2) {
      value = operator;
      operator = '=';
    }
    
    this._where.push(`${column} ${operator} ?`);
    this._params.push(value);
    return this;
  }

  whereIn(column, values) {
    const placeholders = values.map(() => '?').join(', ');
    this._where.push(`${column} IN (${placeholders})`);
    this._params.push(...values);
    return this;
  }

  join(table, condition) {
    this._joins.push(`JOIN ${table} ON ${condition}`);
    return this;
  }

  leftJoin(table, condition) {
    this._joins.push(`LEFT JOIN ${table} ON ${condition}`);
    return this;
  }

  orderBy(column, direction = 'ASC') {
    this._orderBy.push(`${column} ${direction}`);
    return this;
  }

  groupBy(column) {
    this._groupBy.push(column);
    return this;
  }

  having(condition) {
    this._having.push(condition);
    return this;
  }

  limit(count) {
    this._limit = count;
    return this;
  }

  offset(count) {
    this._offset = count;
    return this;
  }

  // 构建查询SQL
  buildQuery() {
    let sql = `SELECT ${this._select} FROM ${this.table}`;
    
    if (this._joins.length > 0) {
      sql += ' ' + this._joins.join(' ');
    }
    
    if (this._where.length > 0) {
      sql += ' WHERE ' + this._where.join(' AND ');
    }
    
    if (this._groupBy.length > 0) {
      sql += ' GROUP BY ' + this._groupBy.join(', ');
    }
    
    if (this._having.length > 0) {
      sql += ' HAVING ' + this._having.join(' AND ');
    }
    
    if (this._orderBy.length > 0) {
      sql += ' ORDER BY ' + this._orderBy.join(', ');
    }
    
    if (this._limit !== null) {
      sql += ` LIMIT ${this._limit}`;
    }
    
    if (this._offset !== null) {
      sql += ` OFFSET ${this._offset}`;
    }
    
    return { sql, params: this._params };
  }

  // 执行查询
  async get() {
    const { sql, params } = this.buildQuery();
    const result = await this.db.query(sql, params);
    this.reset();
    return result.rows;
  }

  // 获取第一条记录
  async first() {
    const results = await this.limit(1).get();
    return results[0] || null;
  }

  // 获取记录数
  async count() {
    this._select = 'COUNT(*) as count';
    const result = await this.first();
    return result ? result.count : 0;
  }
}

/**
 * 演示用法
 */
async function demonstrateMySQLOperations() {
  console.log('=== Node.js MySQL操作演示 ===\n');

  // 由于演示环境限制，我们使用模拟的方式
  console.log('注意: 这是一个模拟演示，实际使用需要真实的MySQL数据库\n');

  // 1. 连接管理演示
  console.log('1. 连接池管理演示:');
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'demo_db',
    connectionLimit: 10
  };
  
  const db = new MySQLConnectionManager(dbConfig);
  console.log('MySQL连接配置:', dbConfig);
  console.log('连接池状态: 未连接\n');

  // 2. DAO模式演示
  console.log('2. DAO模式操作示例:');
  const userDAO = new UserDAO(db);
  
  console.log('创建用户示例:');
  const newUser = {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashed_password'
  };
  console.log('用户数据:', newUser);
  
  console.log('查询用户示例:');
  console.log('SQL: SELECT * FROM users WHERE username = ?');
  console.log('参数: ["john_doe"]');
  
  console.log('更新用户示例:');
  console.log('SQL: UPDATE users SET email = ? WHERE id = ?');
  console.log('参数: ["newemail@example.com", 1]\n');

  // 3. 查询构建器演示
  console.log('3. 查询构建器示例:');
  const qb = new QueryBuilder('users', db);
  
  const query1 = qb
    .select(['id', 'username', 'email'])
    .where('status', 'active')
    .where('created_at', '>', '2023-01-01')
    .orderBy('created_at', 'DESC')
    .limit(10)
    .buildQuery();
  
  console.log('构建的查询:');
  console.log('SQL:', query1.sql);
  console.log('参数:', query1.params);
  
  const query2 = new QueryBuilder('users', db)
    .select('users.*, profiles.avatar')
    .leftJoin('profiles', 'users.id = profiles.user_id')
    .whereIn('users.id', [1, 2, 3])
    .buildQuery();
  
  console.log('\nJOIN查询示例:');
  console.log('SQL:', query2.sql);
  console.log('参数:', query2.params);

  // 4. 事务示例
  console.log('\n4. 事务操作示例:');
  console.log('开始事务 -> 插入用户 -> 插入用户资料 -> 提交事务');
  console.log(`
    const transaction = await db.beginTransaction();
    try {
      await transaction.query('INSERT INTO users ...', params1);
      await transaction.query('INSERT INTO profiles ...', params2);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  `);

  // 5. 迁移管理示例
  console.log('\n5. 数据库迁移示例:');
  const migration = new MigrationManager(db);
  
  migration.addMigration('001_create_users_table', 
    // UP
    async (db) => {
      await db.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE,
          email VARCHAR(100) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    },
    // DOWN  
    async (db) => {
      await db.query('DROP TABLE users');
    }
  );
  
  console.log('迁移已添加: 001_create_users_table');
  console.log('执行: migration.runMigrations()');
  console.log('回滚: migration.rollbackMigration("001_create_users_table")');

  console.log('\n演示完成！实际项目中需要连接真实的MySQL数据库。');
}

// 如果直接运行此文件
if (require.main === module) {
  demonstrateMySQLOperations().catch(console.error);
}

module.exports = {
  MySQLConnectionManager,
  UserDAO,
  MigrationManager,
  QueryBuilder,
  demonstrateMySQLOperations
};
