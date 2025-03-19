const fs = require('fs')
const path = require('path')

module.exports = function (babel) {
  return {
    name: 'babel-plugin-todo-collector',

    pre (state) {
      console.log('🚀 Entering babel-plugin-todo-collector')
      const options = state.opts || {}
      this.todos = []
      this.outputFile = options.outputFile || 'todo.md'
      this.projectRoot = options.projectRoot || process.cwd()
    },

    visitor: {
      Program: {
        enter (path, state) {
          console.log(`📑 Processing file: ${state.file.opts.filename}`)

          const comments = path.container.comments || []
          const filename = state.file.opts.filename

          comments.forEach(comment => {
            const todoMatch = comment.value.match(/TODO:?\s*(.*)/i)
            if (todoMatch) {
              const todo = todoMatch[1].trim()
              const { line, column } = comment.loc.start

              this.todos.push({
                content: todo,
                file: filename,
                line,
                column
              })
            }
          })
        },

        exit () {
          console.log('✅ Finished processing file')
        }
      }
    },

    post (state) {
      if (this.todos.length > 0) {
        const markdown = this.todos.map(todo => {
          const relativePath = path.relative(this.projectRoot, todo.file)
          const fileName = path.basename(todo.file)
          return `* [ ] ${todo.content}, 详见 [${fileName}](${relativePath}#L${todo.line},${todo.column})`
        }).join('\n')

        fs.writeFileSync(
          path.join(process.cwd(), this.outputFile),
          markdown,
          'utf-8'
        )

        console.log(`✅ Collected ${this.todos.length} TODOs into ${this.outputFile}`)
      }
      console.log('👋 Exiting babel-plugin-todo-collector')
    }
  }
}
