// comand input a
function inputA (status) {
  // 1. 全选则覆盖
  if (status.choiceAll) {
    return {
      ...status,
      string: 'a'
    }
  }
  // 没全选则追加
  return {
    ...status,
    string: status.string + 'a'

  }
}

// comand ctrl-c
function copy (status) {
  // 未选择不处理
  if (!status.choiceAll) return status

  return {
    ...status,
    choiceAll: false,
    clipboard: status.string
  }
}

// comand ctrl-x
function cut (status) {
  // 未选择不处理
  if (!status.choiceAll) return status

  return {
    ...status,
    choiceAll: false,
    string: '',
    clipboard: status.string
  }
}

// comand ctrl-v
function paste (status) {
  // 剪切板无内容粘贴无效
  if (!status.clipboard) return status
  // 有选中则覆盖
  if (status.choiceAll) {
    return {
      ...status,
      choiceAll: false,
      string: status.clipboard
    }
  }
  // 无选中则追加
  return {
    ...status,
    string: status.string + status.clipboard
  }
}

// comand ctrl-a
function choicAll (status) {
  // 无选中则追加
  return {
    ...status,
    choiceAll: true
  }
}

const Commands = [
  inputA,
  copy,
  cut,
  paste,
  choicAll
]
export function handleCommand (commandIds, status = {
  string: '',
  clipboard: '',
  choiceAll: false
}) {
  return commandIds.reduce((curStatus, opId) => {
    const curOp = Commands[opId - 1]
    const nextStatus = curOp(curStatus)
    return nextStatus
  }, status).string.length
}

// console.log(handleCommand([1, 1, 1]))
console.log(handleCommand([1, 1, 1, 5, 2, 4]))
