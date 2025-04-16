/**
 * 典型场景：将后端数据结构适配成前端组件所需格式
 * 统一后端返回值，适配不同组件要求，避免直接修改第三方接口或组件源代码。
 */
// 原始数据（来自后端）
const backendUser = {
  uid: 1001,
  username: 'Alice',
  gender: 1
}

// 前端组件需要的数据结构
// { id: number, name: string, genderText: string }

function userAdapter (rawUser) {
  return {
    id: rawUser.uid,
    name: rawUser.username,
    genderText: rawUser.gender === 1 ? '女' : '男'
  }
}

// 使用
const adaptedUser = userAdapter(backendUser)
console.log(adaptedUser) // { id: 1001, name: 'Alice', genderText: '女' }
