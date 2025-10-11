import { run } from 'node:test'

const app = {
  use (fn) {
    this.middlewares.push(fn)
  },
  middlewares: [],
  run (ctx) {}
}

app.use((ctx, next) => {
  ctx.a = 1
  console.log(1)
  next()
})

app.use((ctx, next) => {
  ctx.b = 2
  console.log(2)
  next()
})


app.