// Node.js MongoDB数据库操作演示
const { MongoClient, ObjectId } = require('mongodb');
const { EventEmitter } = require('events');

/**
 * 1. MongoDB连接管理器
 */
class MongoDBConnectionManager extends EventEmitter {
  constructor(options = {}) {
    super();
    this.uri = options.uri || 'mongodb://localhost:27017';
    this.dbName = options.dbName || 'demo_db';
    this.options = {
      maxPoolSize: options.maxPoolSize || 10,
      serverSelectionTimeoutMS: options.serverSelectionTimeoutMS || 5000,
      socketTimeoutMS: options.socketTimeoutMS || 45000,
      ...options
    };
    
    this.client = null;
    this.db = null;
    this.isConnected = false;
  }

  // 连接数据库
  async connect() {
    try {
      console.log(`连接MongoDB: ${this.uri}/${this.dbName}`);
      
      this.client = new MongoClient(this.uri, this.options);
      await this.client.connect();
      
      this.db = this.client.db(this.dbName);
      this.isConnected = true;
      
      console.log('MongoDB连接成功');
      this.emit('connected');
      
      // 监听连接事件
      this.setupEventListeners();
      
      return this.db;
    } catch (error) {
      console.error('MongoDB连接失败:', error);
      this.emit('error', error);
      throw error;
    }
  }

  // 设置事件监听器
  setupEventListeners() {
    this.client.on('close', () => {
      console.log('MongoDB连接关闭');
      this.isConnected = false;
      this.emit('disconnected');
    });

    this.client.on('error', (error) => {
      console.error('MongoDB连接错误:', error);
      this.emit('error', error);
    });

    this.client.on('reconnect', () => {
      console.log('MongoDB重连成功');
      this.isConnected = true;
      this.emit('reconnected');
    });
  }

  // 获取集合
  collection(name) {
    if (!this.isConnected || !this.db) {
      throw new Error('数据库未连接');
    }
    return this.db.collection(name);
  }

  // 关闭连接
  async close() {
    if (this.client) {
      await this.client.close();
      this.isConnected = false;
      console.log('MongoDB连接已关闭');
    }
  }

  // 获取数据库统计信息
  async getStats() {
    if (!this.isConnected || !this.db) {
      throw new Error('数据库未连接');
    }

    try {
      const stats = await this.db.stats();
      return {
        database: this.dbName,
        collections: stats.collections,
        objects: stats.objects,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize
      };
    } catch (error) {
      console.error('获取数据库统计信息失败:', error);
      throw error;
    }
  }

  // 测试连接
  async ping() {
    if (!this.isConnected || !this.db) {
      throw new Error('数据库未连接');
    }

    try {
      await this.db.admin().ping();
      return true;
    } catch (error) {
      console.error('数据库ping失败:', error);
      return false;
    }
  }
}

/**
 * 2. MongoDB模型基类
 */
class BaseModel {
  constructor(collectionName, db) {
    this.collectionName = collectionName;
    this.db = db;
    this.collection = db.collection(collectionName);
  }

  // 创建文档
  async create(document) {
    try {
      const result = await this.collection.insertOne({
        ...document,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return {
        _id: result.insertedId,
        ...document,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('创建文档失败:', error);
      throw error;
    }
  }

  // 批量创建
  async createMany(documents) {
    try {
      const now = new Date();
      const documentsWithTimestamps = documents.map(doc => ({
        ...doc,
        createdAt: now,
        updatedAt: now
      }));
      
      const result = await this.collection.insertMany(documentsWithTimestamps);
      return result.insertedIds;
    } catch (error) {
      console.error('批量创建文档失败:', error);
      throw error;
    }
  }

  // 根据ID查找
  async findById(id) {
    try {
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('根据ID查找文档失败:', error);
      throw error;
    }
  }

  // 查找单个文档
  async findOne(filter = {}, options = {}) {
    try {
      return await this.collection.findOne(filter, options);
    } catch (error) {
      console.error('查找单个文档失败:', error);
      throw error;
    }
  }

  // 查找多个文档
  async find(filter = {}, options = {}) {
    try {
      return await this.collection.find(filter, options).toArray();
    } catch (error) {
      console.error('查找文档失败:', error);
      throw error;
    }
  }

  // 分页查找
  async findPaginated(filter = {}, options = {}) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    try {
      const [documents, total] = await Promise.all([
        this.collection.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.collection.countDocuments(filter)
      ]);

      return {
        documents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('分页查找失败:', error);
      throw error;
    }
  }

  // 更新文档
  async updateById(id, update) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...update, 
            updatedAt: new Date() 
          } 
        }
      );
      
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('根据ID更新文档失败:', error);
      throw error;
    }
  }

  // 批量更新
  async updateMany(filter, update) {
    try {
      const result = await this.collection.updateMany(
        filter,
        { 
          $set: { 
            ...update, 
            updatedAt: new Date() 
          } 
        }
      );
      
      return result.modifiedCount;
    } catch (error) {
      console.error('批量更新文档失败:', error);
      throw error;
    }
  }

  // 删除文档
  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('根据ID删除文档失败:', error);
      throw error;
    }
  }

  // 批量删除
  async deleteMany(filter) {
    try {
      const result = await this.collection.deleteMany(filter);
      return result.deletedCount;
    } catch (error) {
      console.error('批量删除文档失败:', error);
      throw error;
    }
  }

  // 统计文档数量
  async count(filter = {}) {
    try {
      return await this.collection.countDocuments(filter);
    } catch (error) {
      console.error('统计文档数量失败:', error);
      throw error;
    }
  }

  // 聚合查询
  async aggregate(pipeline) {
    try {
      return await this.collection.aggregate(pipeline).toArray();
    } catch (error) {
      console.error('聚合查询失败:', error);
      throw error;
    }
  }

  // 创建索引
  async createIndex(keys, options = {}) {
    try {
      return await this.collection.createIndex(keys, options);
    } catch (error) {
      console.error('创建索引失败:', error);
      throw error;
    }
  }

  // 获取索引信息
  async getIndexes() {
    try {
      return await this.collection.indexes();
    } catch (error) {
      console.error('获取索引信息失败:', error);
      throw error;
    }
  }
}

/**
 * 3. 用户模型示例
 */
class UserModel extends BaseModel {
  constructor(db) {
    super('users', db);
  }

  // 初始化索引
  async initIndexes() {
    await this.createIndex({ username: 1 }, { unique: true });
    await this.createIndex({ email: 1 }, { unique: true });
    await this.createIndex({ createdAt: -1 });
    console.log('用户模型索引创建完成');
  }

  // 根据用户名查找用户
  async findByUsername(username) {
    return await this.findOne({ username });
  }

  // 根据邮箱查找用户
  async findByEmail(email) {
    return await this.findOne({ email });
  }

  // 用户统计
  async getUserStats() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          avgAge: { $avg: '$age' },
          minAge: { $min: '$age' },
          maxAge: { $max: '$age' }
        }
      }
    ];

    const result = await this.aggregate(pipeline);
    return result[0] || {};
  }

  // 按年龄分组统计
  async getUsersByAgeGroup() {
    const pipeline = [
      {
        $bucket: {
          groupBy: '$age',
          boundaries: [18, 25, 35, 45, 55, 100],
          default: 'Unknown',
          output: {
            count: { $sum: 1 },
            users: { $push: { username: '$username', age: '$age' } }
          }
        }
      }
    ];

    return await this.aggregate(pipeline);
  }

  // 活跃用户查询
  async getActiveUsers(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await this.find({
      lastLoginAt: { $gte: cutoffDate }
    });
  }
}

/**
 * 4. MongoDB查询构建器
 */
class MongoQueryBuilder {
  constructor(collection) {
    this.collection = collection;
    this.reset();
  }

  reset() {
    this._filter = {};
    this._sort = {};
    this._limit = null;
    this._skip = null;
    this._projection = null;
    return this;
  }

  // 条件查询
  where(field, operator, value) {
    if (arguments.length === 2) {
      value = operator;
      operator = '$eq';
    }

    // 操作符映射
    const operatorMap = {
      '=': '$eq',
      '!=': '$ne',
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      'in': '$in',
      'nin': '$nin'
    };

    const mongoOperator = operatorMap[operator] || operator;
    
    if (mongoOperator === '$eq') {
      this._filter[field] = value;
    } else {
      this._filter[field] = { [mongoOperator]: value };
    }

    return this;
  }

  // 范围查询
  whereBetween(field, min, max) {
    this._filter[field] = { $gte: min, $lte: max };
    return this;
  }

  // 正则查询
  whereRegex(field, pattern, options = 'i') {
    this._filter[field] = { $regex: pattern, $options: options };
    return this;
  }

  // 存在性查询
  whereExists(field, exists = true) {
    this._filter[field] = { $exists: exists };
    return this;
  }

  // 数组查询
  whereIn(field, values) {
    this._filter[field] = { $in: values };
    return this;
  }

  whereNotIn(field, values) {
    this._filter[field] = { $nin: values };
    return this;
  }

  // 逻辑查询
  whereOr(conditions) {
    this._filter.$or = conditions;
    return this;
  }

  whereAnd(conditions) {
    this._filter.$and = conditions;
    return this;
  }

  // 排序
  orderBy(field, direction = 1) {
    this._sort[field] = direction === 'desc' || direction === -1 ? -1 : 1;
    return this;
  }

  // 限制数量
  limit(count) {
    this._limit = count;
    return this;
  }

  // 跳过数量
  skip(count) {
    this._skip = count;
    return this;
  }

  // 字段选择
  select(fields) {
    if (typeof fields === 'string') {
      fields = fields.split(' ');
    }
    
    this._projection = {};
    fields.forEach(field => {
      this._projection[field] = 1;
    });
    
    return this;
  }

  // 执行查询
  async get() {
    let query = this.collection.find(this._filter);
    
    if (this._projection) {
      query = query.project(this._projection);
    }
    
    if (Object.keys(this._sort).length > 0) {
      query = query.sort(this._sort);
    }
    
    if (this._skip !== null) {
      query = query.skip(this._skip);
    }
    
    if (this._limit !== null) {
      query = query.limit(this._limit);
    }
    
    const result = await query.toArray();
    this.reset();
    return result;
  }

  // 获取第一条记录
  async first() {
    const results = await this.limit(1).get();
    return results[0] || null;
  }

  // 获取总数
  async count() {
    const count = await this.collection.countDocuments(this._filter);
    this.reset();
    return count;
  }

  // 构建聚合管道
  buildAggregatePipeline() {
    const pipeline = [];
    
    if (Object.keys(this._filter).length > 0) {
      pipeline.push({ $match: this._filter });
    }
    
    if (Object.keys(this._sort).length > 0) {
      pipeline.push({ $sort: this._sort });
    }
    
    if (this._skip !== null) {
      pipeline.push({ $skip: this._skip });
    }
    
    if (this._limit !== null) {
      pipeline.push({ $limit: this._limit });
    }
    
    if (this._projection) {
      pipeline.push({ $project: this._projection });
    }
    
    return pipeline;
  }
}

/**
 * 演示用法
 */
async function demonstrateMongoDBOperations() {
  console.log('=== Node.js MongoDB操作演示 ===\n');
  console.log('注意: 这是一个模拟演示，实际使用需要真实的MongoDB数据库\n');

  // 1. 连接管理演示
  console.log('1. MongoDB连接管理:');
  const dbManager = new MongoDBConnectionManager({
    uri: 'mongodb://localhost:27017',
    dbName: 'demo_app',
    maxPoolSize: 10
  });

  console.log('连接配置:', {
    uri: 'mongodb://localhost:27017',
    dbName: 'demo_app',
    maxPoolSize: 10
  });

  // 模拟连接事件
  dbManager.on('connected', () => {
    console.log('事件: 数据库连接成功');
  });

  dbManager.on('error', (error) => {
    console.log('事件: 连接错误 -', error.message);
  });

  console.log('连接状态: 模拟已连接\n');

  // 2. 基础CRUD操作演示
  console.log('2. 基础CRUD操作示例:');
  
  console.log('创建用户:');
  const newUser = {
    username: 'john_doe',
    email: 'john@example.com',
    age: 28,
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg'
    },
    tags: ['developer', 'nodejs', 'mongodb'],
    lastLoginAt: new Date()
  };
  console.log(JSON.stringify(newUser, null, 2));

  console.log('\n查询用户:');
  console.log('filter: { username: "john_doe" }');
  console.log('projection: { password: 0 }');

  console.log('\n更新用户:');
  console.log('filter: { _id: ObjectId("...") }');
  console.log('update: { $set: { lastLoginAt: new Date() } }');

  console.log('\n删除用户:');
  console.log('filter: { _id: ObjectId("...") }\n');

  // 3. 查询构建器演示
  console.log('3. 查询构建器示例:');
  const mockCollection = {
    find: (filter) => ({ 
      project: () => ({ 
        sort: () => ({ 
          skip: () => ({ 
            limit: () => ({ 
              toArray: async () => [] 
            }) 
          }) 
        }) 
      }) 
    }),
    countDocuments: async () => 0
  };

  const qb = new MongoQueryBuilder(mockCollection);
  
  console.log('复杂查询构建:');
  console.log(`
    qb.where('age', '>=', 18)
      .where('status', 'active')
      .whereIn('tags', ['developer', 'designer'])
      .orderBy('createdAt', -1)
      .limit(10)
      .select('username email profile')
      .get()
  `);

  console.log('构建的过滤条件:', {
    age: { $gte: 18 },
    status: 'active',
    tags: { $in: ['developer', 'designer'] }
  });

  // 4. 聚合查询演示
  console.log('\n4. 聚合查询示例:');
  console.log('用户年龄分组统计:');
  const ageGroupPipeline = [
    {
      $bucket: {
        groupBy: '$age',
        boundaries: [18, 25, 35, 45, 55, 100],
        default: 'Unknown',
        output: {
          count: { $sum: 1 },
          avgAge: { $avg: '$age' }
        }
      }
    }
  ];
  console.log(JSON.stringify(ageGroupPipeline, null, 2));

  console.log('\n标签使用统计:');
  const tagStatsPipeline = [
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ];
  console.log(JSON.stringify(tagStatsPipeline, null, 2));

  // 5. 索引管理演示
  console.log('\n5. 索引管理示例:');
  console.log('创建索引:');
  console.log('db.users.createIndex({ username: 1 }, { unique: true })');
  console.log('db.users.createIndex({ email: 1 }, { unique: true })');
  console.log('db.users.createIndex({ "profile.firstName": 1, "profile.lastName": 1 })');
  console.log('db.users.createIndex({ tags: 1 })');
  console.log('db.users.createIndex({ createdAt: -1 })');

  // 6. 事务演示(4.0+)
  console.log('\n6. 事务操作示例:');
  console.log(`
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await users.insertOne(userData, { session });
        await profiles.insertOne(profileData, { session });
        await logs.insertOne(logData, { session });
      });
    } finally {
      await session.endSession();
    }
  `);

  // 7. 性能优化建议
  console.log('\n7. MongoDB性能优化建议:');
  console.log('- 为常用查询字段创建索引');
  console.log('- 使用复合索引优化多字段查询');
  console.log('- 避免全表扫描，使用合适的过滤条件');
  console.log('- 使用聚合管道进行复杂数据分析');
  console.log('- 控制查询返回的字段数量');
  console.log('- 使用连接池管理数据库连接');
  console.log('- 定期监控慢查询日志');

  console.log('\n演示完成！');
}

// 如果直接运行此文件
if (require.main === module) {
  demonstrateMongoDBOperations().catch(console.error);
}

module.exports = {
  MongoDBConnectionManager,
  BaseModel,
  UserModel,
  MongoQueryBuilder,
  demonstrateMongoDBOperations
};
