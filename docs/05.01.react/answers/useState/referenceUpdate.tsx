import { useState } from 'react'

// 错误示例：直接修改对象
function ObjectMutationWrong () {
  const [person, setPerson] = useState({ name: 'Alice', age: 25 })

  function handleBirthday () {
    // 错误：直接修改状态对象
    person.age += 1
    setPerson(person) // 不会触发重新渲染，因为引用没变
  }

  return (
      <div>
         <p>姓名: {person.name}, 年龄: {person.age}</p>
         <button onClick={handleBirthday}>过生日(不生效)</button>
      </div>
  )
}

// 正确示例：创建新对象
function ObjectMutationCorrect () {
  const [person, setPerson] = useState({ name: 'Alice', age: 25 })

  function handleBirthday () {
    // 正确：创建新对象
    setPerson({ ...person, age: person.age + 1 })
  }

  return (
      <div>
         <p>姓名: {person.name}, 年龄: {person.age}</p>
         <button onClick={handleBirthday}>过生日(生效)</button>
      </div>
  )
}

// 错误示例：直接修改数组
function ArrayMutationWrong () {
  const [items, setItems] = useState(['苹果', '香蕉'])

  function addItem () {
    // 错误：直接修改状态数组
    items.push('橙子')
    setItems(items) // 不会触发重新渲染，因为引用没变
  }

  return (
      <div>
         <ul>
            {items.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
         <button onClick={addItem}>添加水果(不生效)</button>
      </div>
  )
}

// 正确示例：创建新数组
function ArrayMutationCorrect () {
  const [items, setItems] = useState(['苹果', '香蕉'])

  function addItem () {
    // 正确：创建新数组
    setItems([...items, '橙子'])
  }

  return (
      <div>
         <ul>
            {items.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
         <button onClick={addItem}>添加水果(生效)</button>
      </div>
  )
}

export default function ReferenceUpdate () {
  return (
      <div>
         <h2>引用类型状态更新示例</h2>

         <h3>对象更新</h3>
         <p>错误方式：直接修改对象属性</p>
         <ObjectMutationWrong />

         <p>正确方式：创建新对象</p>
         <ObjectMutationCorrect />

         <h3>数组更新</h3>
         <p>错误方式：直接修改数组内容</p>
         <ArrayMutationWrong />

         <p>正确方式：创建新数组</p>
         <ArrayMutationCorrect />
      </div>
  )
}
