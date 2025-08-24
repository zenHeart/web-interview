// Node.js 命令行工具 - 代码行数统计器
const fs = require('fs').promises;
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');

/**
 * 文件行数统计器类
 */
class LineCounter {
  constructor(options = {}) {
    this.options = {
      extensions: options.extensions || ['.js', '.ts', '.jsx', '.tsx'],
      includeEmpty: options.includeEmpty !== false,
      includeComments: options.includeComments !== false,
      maxDepth: options.maxDepth || Infinity,
      excludeDirs: options.excludeDirs || ['node_modules', '.git', 'dist', 'build'],
      ...options
    };
    
    this.stats = {
      totalFiles: 0,
      totalLines: 0,
      totalCodeLines: 0,
      totalEmptyLines: 0,
      totalCommentLines: 0,
      fileTypes: new Map(),
      errors: []
    };
  }

  /**
   * 统计指定目录下的代码行数
   */
  async countDirectory(dirPath, currentDepth = 0) {
    try {
      if (currentDepth > this.options.maxDepth) {
        return;
      }

      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          // 检查是否为排除目录
          if (this.options.excludeDirs.includes(entry.name)) {
            continue;
          }
          
          await this.countDirectory(fullPath, currentDepth + 1);
        } else if (entry.isFile()) {
          await this.countFile(fullPath);
        }
      }
    } catch (error) {
      this.stats.errors.push({
        path: dirPath,
        error: error.message
      });
    }
  }

  /**
   * 统计单个文件的行数
   */
  async countFile(filePath) {
    const ext = path.extname(filePath);
    
    // 检查文件扩展名
    if (this.options.extensions.length > 0 && !this.options.extensions.includes(ext)) {
      return;
    }

    try {
      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n');
      
      const fileStats = this.analyzeFileContent(lines, ext);
      
      // 更新总计
      this.stats.totalFiles++;
      this.stats.totalLines += fileStats.totalLines;
      this.stats.totalCodeLines += fileStats.codeLines;
      this.stats.totalEmptyLines += fileStats.emptyLines;
      this.stats.totalCommentLines += fileStats.commentLines;
      
      // 按文件类型统计
      if (!this.stats.fileTypes.has(ext)) {
        this.stats.fileTypes.set(ext, {
          files: 0,
          lines: 0,
          codeLines: 0,
          emptyLines: 0,
          commentLines: 0
        });
      }
      
      const typeStats = this.stats.fileTypes.get(ext);
      typeStats.files++;
      typeStats.lines += fileStats.totalLines;
      typeStats.codeLines += fileStats.codeLines;
      typeStats.emptyLines += fileStats.emptyLines;
      typeStats.commentLines += fileStats.commentLines;
      
    } catch (error) {
      this.stats.errors.push({
        path: filePath,
        error: error.message
      });
    }
  }

  /**
   * 分析文件内容，区分代码行、注释行、空行
   */
  analyzeFileContent(lines, ext) {
    let codeLines = 0;
    let emptyLines = 0;
    let commentLines = 0;
    
    let inBlockComment = false;
    const blockCommentStart = this.getBlockCommentStart(ext);
    const blockCommentEnd = this.getBlockCommentEnd(ext);
    const lineCommentStart = this.getLineCommentStart(ext);
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // 空行
      if (trimmed === '') {
        emptyLines++;
        continue;
      }
      
      let isCommentLine = false;
      
      // 检查块注释
      if (blockCommentStart && blockCommentEnd) {
        if (inBlockComment) {
          isCommentLine = true;
          if (trimmed.includes(blockCommentEnd)) {
            inBlockComment = false;
          }
        } else if (trimmed.startsWith(blockCommentStart)) {
          isCommentLine = true;
          if (!trimmed.includes(blockCommentEnd)) {
            inBlockComment = true;
          }
        }
      }
      
      // 检查行注释
      if (!isCommentLine && lineCommentStart && trimmed.startsWith(lineCommentStart)) {
        isCommentLine = true;
      }
      
      if (isCommentLine) {
        commentLines++;
      } else {
        codeLines++;
      }
    }
    
    return {
      totalLines: lines.length,
      codeLines,
      emptyLines,
      commentLines
    };
  }

  /**
   * 获取块注释开始标记
   */
  getBlockCommentStart(ext) {
    const map = {
      '.js': '/*',
      '.ts': '/*',
      '.jsx': '/*',
      '.tsx': '/*',
      '.css': '/*',
      '.java': '/*',
      '.c': '/*',
      '.cpp': '/*',
      '.php': '/*',
      '.html': '<!--',
      '.xml': '<!--',
      '.py': '"""',
      '.rb': '=begin'
    };
    return map[ext];
  }

  /**
   * 获取块注释结束标记
   */
  getBlockCommentEnd(ext) {
    const map = {
      '.js': '*/',
      '.ts': '*/',
      '.jsx': '*/',
      '.tsx': '*/',
      '.css': '*/',
      '.java': '*/',
      '.c': '*/',
      '.cpp': '*/',
      '.php': '*/',
      '.html': '-->',
      '.xml': '-->',
      '.py': '"""',
      '.rb': '=end'
    };
    return map[ext];
  }

  /**
   * 获取行注释开始标记
   */
  getLineCommentStart(ext) {
    const map = {
      '.js': '//',
      '.ts': '//',
      '.jsx': '//',
      '.tsx': '//',
      '.java': '//',
      '.c': '//',
      '.cpp': '//',
      '.php': '//',
      '.py': '#',
      '.rb': '#',
      '.sh': '#',
      '.yml': '#',
      '.yaml': '#'
    };
    return map[ext];
  }

  /**
   * 获取统计结果
   */
  getStats() {
    return this.stats;
  }

  /**
   * 格式化输出统计结果
   */
  formatOutput(options = {}) {
    const { colorize = true, detailed = false } = options;
    const stats = this.stats;
    
    let output = [];
    
    // 标题
    output.push(colorize ? chalk.blue.bold('📊 代码行数统计结果') : '📊 代码行数统计结果');
    output.push('='.repeat(50));
    
    // 总体统计
    output.push('📈 总体统计:');
    output.push(`  文件总数: ${colorize ? chalk.cyan(stats.totalFiles) : stats.totalFiles}`);
    output.push(`  总行数: ${colorize ? chalk.yellow(stats.totalLines) : stats.totalLines}`);
    output.push(`  代码行数: ${colorize ? chalk.green(stats.totalCodeLines) : stats.totalCodeLines}`);
    output.push(`  注释行数: ${colorize ? chalk.blue(stats.totalCommentLines) : stats.totalCommentLines}`);
    output.push(`  空行数: ${colorize ? chalk.gray(stats.totalEmptyLines) : stats.totalEmptyLines}`);
    output.push('');
    
    // 按文件类型统计
    if (stats.fileTypes.size > 0) {
      output.push('📋 按文件类型统计:');
      
      const sortedTypes = Array.from(stats.fileTypes.entries())
        .sort((a, b) => b[1].lines - a[1].lines);
      
      for (const [ext, typeStats] of sortedTypes) {
        const percentage = ((typeStats.lines / stats.totalLines) * 100).toFixed(1);
        output.push(`  ${ext || '无扩展名'}:`);
        output.push(`    文件数: ${typeStats.files}`);
        output.push(`    行数: ${colorize ? chalk.yellow(typeStats.lines) : typeStats.lines} (${percentage}%)`);
        
        if (detailed) {
          output.push(`    代码: ${colorize ? chalk.green(typeStats.codeLines) : typeStats.codeLines}`);
          output.push(`    注释: ${colorize ? chalk.blue(typeStats.commentLines) : typeStats.commentLines}`);
          output.push(`    空行: ${colorize ? chalk.gray(typeStats.emptyLines) : typeStats.emptyLines}`);
        }
        output.push('');
      }
    }
    
    // 错误信息
    if (stats.errors.length > 0) {
      output.push(colorize ? chalk.red.bold('❌ 处理错误:') : '❌ 处理错误:');
      for (const error of stats.errors) {
        output.push(`  ${error.path}: ${error.error}`);
      }
      output.push('');
    }
    
    // 统计摘要
    const codePercentage = ((stats.totalCodeLines / stats.totalLines) * 100).toFixed(1);
    const commentPercentage = ((stats.totalCommentLines / stats.totalLines) * 100).toFixed(1);
    const emptyPercentage = ((stats.totalEmptyLines / stats.totalLines) * 100).toFixed(1);
    
    output.push('📊 行数分布:');
    output.push(`  代码行占比: ${colorize ? chalk.green(codePercentage + '%') : codePercentage + '%'}`);
    output.push(`  注释行占比: ${colorize ? chalk.blue(commentPercentage + '%') : commentPercentage + '%'}`);
    output.push(`  空行占比: ${colorize ? chalk.gray(emptyPercentage + '%') : emptyPercentage + '%'}`);
    
    return output.join('\n');
  }

  /**
   * 导出统计结果为JSON
   */
  exportToJson() {
    return JSON.stringify({
      ...this.stats,
      fileTypes: Object.fromEntries(this.stats.fileTypes),
      timestamp: new Date().toISOString()
    }, null, 2);
  }

  /**
   * 导出统计结果为CSV
   */
  exportToCsv() {
    const rows = [];
    
    // CSV头部
    rows.push('文件类型,文件数,总行数,代码行数,注释行数,空行数');
    
    // 数据行
    for (const [ext, stats] of this.stats.fileTypes) {
      rows.push(`${ext},${stats.files},${stats.lines},${stats.codeLines},${stats.commentLines},${stats.emptyLines}`);
    }
    
    // 总计行
    rows.push(`总计,${this.stats.totalFiles},${this.stats.totalLines},${this.stats.totalCodeLines},${this.stats.totalCommentLines},${this.stats.totalEmptyLines}`);
    
    return rows.join('\n');
  }
}

/**
 * 命令行接口
 */
function createCLI() {
  program
    .name('line-counter')
    .description('统计指定目录下代码文件的行数')
    .version('1.0.0');

  program
    .argument('<directory>', '要统计的目录路径')
    .option('-e, --extensions <ext...>', '要统计的文件扩展名', ['.js', '.ts', '.jsx', '.tsx'])
    .option('-d, --max-depth <depth>', '最大目录深度', parseInt, Infinity)
    .option('--exclude <dirs...>', '排除的目录名', ['node_modules', '.git', 'dist', 'build'])
    .option('--no-comments', '不统计注释行')
    .option('--no-empty', '不统计空行')
    .option('--detailed', '显示详细统计信息')
    .option('--no-color', '禁用颜色输出')
    .option('--json', '以JSON格式输出')
    .option('--csv', '以CSV格式输出')
    .option('-o, --output <file>', '输出到文件')
    .action(async (directory, options) => {
      try {
        console.log(chalk.blue(`🔍 正在统计目录: ${directory}`));
        
        const counter = new LineCounter({
          extensions: options.extensions,
          includeComments: options.comments,
          includeEmpty: options.empty,
          maxDepth: options.maxDepth,
          excludeDirs: options.exclude
        });
        
        await counter.countDirectory(path.resolve(directory));
        
        let output;
        if (options.json) {
          output = counter.exportToJson();
        } else if (options.csv) {
          output = counter.exportToCsv();
        } else {
          output = counter.formatOutput({
            colorize: options.color,
            detailed: options.detailed
          });
        }
        
        if (options.output) {
          await fs.writeFile(options.output, output, 'utf8');
          console.log(chalk.green(`✅ 结果已保存到: ${options.output}`));
        } else {
          console.log(output);
        }
        
      } catch (error) {
        console.error(chalk.red(`❌ 错误: ${error.message}`));
        process.exit(1);
      }
    });

  return program;
}

// 演示用法
async function demonstrateLineCounter() {
  console.log('=== Node.js 代码行数统计工具演示 ===\n');

  // 创建测试文件结构
  await createTestFiles();

  try {
    // 1. 基础统计
    console.log('1. 基础行数统计演示:');
    const counter1 = new LineCounter({
      extensions: ['.js', '.ts', '.json']
    });
    
    await counter1.countDirectory('./test-project');
    console.log(counter1.formatOutput({ colorize: true, detailed: false }));
    
    // 2. 详细统计
    console.log('\n2. 详细统计信息:');
    const counter2 = new LineCounter({
      extensions: ['.js', '.ts']
    });
    
    await counter2.countDirectory('./test-project');
    console.log(counter2.formatOutput({ colorize: true, detailed: true }));
    
    // 3. JSON导出
    console.log('\n3. JSON格式导出:');
    console.log(counter2.exportToJson());
    
    // 4. CSV导出
    console.log('\n4. CSV格式导出:');
    console.log(counter2.exportToCsv());
    
  } finally {
    // 清理测试文件
    await cleanupTestFiles();
  }
}

// 创建测试文件
async function createTestFiles() {
  const testDir = './test-project';
  
  // 创建目录结构
  await fs.mkdir(testDir, { recursive: true });
  await fs.mkdir(`${testDir}/src`, { recursive: true });
  await fs.mkdir(`${testDir}/lib`, { recursive: true });
  
  // 创建测试文件
  await fs.writeFile(`${testDir}/src/index.js`, `
// 主入口文件
const express = require('express');
const app = express();

/**
 * 启动服务器
 */
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// 导出应用
module.exports = app;
  `.trim());

  await fs.writeFile(`${testDir}/src/utils.ts`, `
// TypeScript 工具函数
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * 用户工具类
 */
export class UserUtils {
  static validateEmail(email: string): boolean {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }
  
  // 格式化用户名
  static formatName(name: string): string {
    return name.trim().toLowerCase();
  }
}
  `.trim());

  await fs.writeFile(`${testDir}/lib/helper.js`, `
// 辅助函数库

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};
  `.trim());

  await fs.writeFile(`${testDir}/package.json`, JSON.stringify({
    name: 'test-project',
    version: '1.0.0',
    description: 'Test project for line counter',
    main: 'src/index.js'
  }, null, 2));
}

// 清理测试文件
async function cleanupTestFiles() {
  try {
    await fs.rm('./test-project', { recursive: true });
  } catch (error) {
    // 忽略清理错误
  }
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  if (process.argv.includes('--cli')) {
    // 运行CLI模式
    createCLI().parse();
  } else {
    // 运行演示模式
    demonstrateLineCounter().catch(console.error);
  }
}

module.exports = {
  LineCounter,
  createCLI,
  demonstrateLineCounter
};
