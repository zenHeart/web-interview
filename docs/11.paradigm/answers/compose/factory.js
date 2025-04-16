// 定义行走行为的函数
const canWalk = (state) => ({
  walk: () => console.log(`${state.name} is walking at speed ${state.speed}.`)
})

// 定义跑步行为的函数
const canRun = (state) => ({
  run: () => console.log(`${state.name} is running fast!`)
})

// 创建一个具有行走和跑步能力的生物的工厂函数
const createWalkerRunner = (name, speed) => {
  const state = { name, speed }
  return { ...state, ...canWalk(state), ...canRun(state) }
}

const cheetah = createWalkerRunner('Cheetah', 120)
cheetah.walk() // 输出: Cheetah is walking at speed 120.
cheetah.run() // 输出: Cheetah is running fast!
