#!/usr/bin/env node

// 全局CLI工具实现演示
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

// 版本和描述
program
  .name('my-cli-tool')
  .version('1.0.0')
  .description('Node.js全局CLI工具演示');

// 基础命令：问候
program
  .command('hello')
  .description('打印问候语')
  .option('-n, --name <name>', '指定名字', 'World')
  .option('-l, --lang <language>', '指定语言', 'en')
  .action((options) => {
    const greetings = {
      en: `Hello, ${options.name}!`,
      zh: `你好，${options.name}！`,
      es: `¡Hola, ${options.name}!`,
      fr: `Bonjour, ${options.name}!`
    };
    
    console.log(greetings[options.lang] || greetings.en);
  });

// 文件操作命令：统计代码行数
program
  .command('count')
  .description('统计文件或目录的代码行数')
  .argument('<path>', '文件或目录路径')
  .option('-e, --ext <extensions>', '文件扩展名(逗号分隔)', '.js,.ts,.jsx,.tsx')
  .option('-i, --ignore <patterns>', '忽略模式(逗号分隔)', 'node_modules,dist,.git')
  .action(async (filePath, options) => {
    const extensions = options.ext.split(',');
    const ignorePatterns = options.ignore.split(',');
    
    let totalLines = 0;
    let fileCount = 0;
    
    function countLines(content) {
      return content.split('\n').length;
    }
    
    function shouldIgnore(filePath) {
      return ignorePatterns.some(pattern => filePath.includes(pattern));
    }
    
    function processPath(currentPath) {
      if (shouldIgnore(currentPath)) return;
      
      const stats = fs.statSync(currentPath);
      
      if (stats.isFile()) {
        const ext = path.extname(currentPath);
        if (extensions.includes(ext)) {
          const content = fs.readFileSync(currentPath, 'utf8');
          const lines = countLines(content);
          totalLines += lines;
          fileCount++;
          console.log(`${currentPath}: ${lines} lines`);
        }
      } else if (stats.isDirectory()) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => {
          processPath(path.join(currentPath, file));
        });
      }
    }
    
    try {
      processPath(filePath);
      console.log(`\n总计: ${fileCount} 个文件, ${totalLines} 行代码`);
    } catch (error) {
      console.error(`错误: ${error.message}`);
      process.exit(1);
    }
  });

// 配置生成命令
program
  .command('init')
  .description('初始化项目配置文件')
  .option('-t, --template <type>', '模板类型', 'basic')
  .action((options) => {
    const templates = {
      basic: {
        name: 'my-project',
        version: '1.0.0',
        description: 'A Node.js project',
        main: 'index.js',
        scripts: {
          start: 'node index.js',
          test: 'jest'
        }
      },
      cli: {
        name: 'my-cli-tool',
        version: '1.0.0',
        description: 'A CLI tool built with Node.js',
        main: 'bin/cli.js',
        bin: {
          'my-tool': './bin/cli.js'
        },
        dependencies: {
          commander: '^9.0.0'
        }
      }
    };
    
    const config = templates[options.template] || templates.basic;
    
    try {
      fs.writeFileSync('package.json', JSON.stringify(config, null, 2));
      console.log(`已生成 ${options.template} 模板的 package.json`);
      
      if (options.template === 'cli') {
        // 创建bin目录和CLI入口文件
        if (!fs.existsSync('bin')) {
          fs.mkdirSync('bin');
        }
        
        const cliContent = `#!/usr/bin/env node
const { program } = require('commander');

program
  .version('1.0.0')
  .description('My CLI Tool')
  .option('-v, --verbose', '详细输出')
  .action((options) => {
    console.log('CLI工具运行成功！');
    if (options.verbose) {
      console.log('详细信息: 这是一个示例CLI工具');
    }
  });

program.parse(process.argv);
`;
        
        fs.writeFileSync('bin/cli.js', cliContent);
        fs.chmodSync('bin/cli.js', '755'); // 添加执行权限
        console.log('已创建 bin/cli.js 文件');
        console.log('运行 "npm link" 来安装全局命令');
      }
    } catch (error) {
      console.error(`创建失败: ${error.message}`);
      process.exit(1);
    }
  });

// 全局错误处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供命令，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
