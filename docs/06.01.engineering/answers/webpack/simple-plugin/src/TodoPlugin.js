const fs = require('fs');
const path = require('path');

class TodoPlugin {
  constructor(options = {}) {
    this.todos = new Map();
    // 默认支持的文件后缀
    this.extensions = options.extensions || ['.js', '.jsx', '.ts', '.tsx'];
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync('TodoPlugin', (compilation, callback) => {
      this.todos.clear();
      
      // 获取所有模块
      const modules = compilation.modules;
      
      // 处理所有模块
      modules.forEach(module => {
        // 检查模块是否有源文件路径
        const resource = module.resource;
        
        if (!resource) return;
        
        // 检查文件扩展名
        const ext = path.extname(resource);
        if (!this.extensions.includes(ext)) return;
        
        // 排除 node_modules
        if (resource.includes('node_modules')) return;
        
        // 处理文件
        this.processFile(resource);
      });

      // 生成 TODO.md 内容
      let todoContent = '# TODO List\n\n';
      
      // 按照文件路径排序，使输出更稳定
      const sortedEntries = Array.from(this.todos.entries())
        .sort(([pathA], [pathB]) => pathA.localeCompare(pathB));
      
      // 生成 markdown
      sortedEntries.forEach(([file, todos]) => {
        const basename = path.basename(file);
        const relativePath = path.relative(process.cwd(), file);
        todoContent += `## [${basename}](${relativePath})\n`;
        
        // 按行号排序 TODO 项
        const sortedTodos = todos.sort((a, b) => a.line - b.line);
        sortedTodos.forEach(todo => {
          const location = `${relativePath}#L${todo.line},${todo.column}`;
          todoContent += `* [ ] [${todo.text}](${location})\n`;
        });
        
        todoContent += '\n';
      });

      // 将 TODO.md 写入项目根目录
      const outputPath = path.join(
        compiler.context, // 使用 compiler.context 获取项目根目录
        'TODO.md'
      );
      fs.writeFileSync(outputPath, todoContent);

      callback();
    });
  }

  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      // 使用正则表达式匹配 TODO 注释
      const todoRegex = /\/\/\s*TODO:\s*(.+)/;
      
      lines.forEach((line, index) => {
        const match = line.match(todoRegex);
        if (match) {
          const todoText = match[1].trim();
          const lineNumber = index + 1;
          const columnNumber = line.indexOf('TODO:') + 1;

          if (!this.todos.has(filePath)) {
            this.todos.set(filePath, []);
          }
          
          this.todos.get(filePath).push({
            text: todoText,
            line: lineNumber,
            column: columnNumber
          });
        }
      });
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
}

module.exports = TodoPlugin; 