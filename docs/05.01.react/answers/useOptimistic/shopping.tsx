import { useOptimistic, useState } from 'react'

// 模拟一个将商品添加到购物车的 API 调用
async function addToCart (item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item) // 延迟一段时间后返回商品
    }, 1000)
  })
}

function ShoppingCart () {
  // 这个状态保存购物车中实际已确认的商品
  const [carts, setCarts] = useState([])

  // useOptimistic 管理购物车的乐观视图。
  // 当调用 addOptimisticCart 时，第二个参数（reducer 函数）
  // 决定了乐观视图 (optimisticCarts) 如何立即更新。
  const [optimisticCarts, addOptimisticCart] = useOptimistic(
    carts, // useOptimistic 跟踪的基础状态
    (currentCarts, newItem) => {
      // 这个函数在 addOptimisticCart 被调用时立即执行。
      // 它创建临时的、乐观的状态。
      return [newItem, ...currentCarts]
    }
  )

  const handleAddToCart = async (item) => {
    // 1. 立即更新 UI，显示一个“乐观的”商品版本。
    // 我们添加一个 'isOptimistic' 标志来在视觉上区分它。
    addOptimisticCart({ ...item, isOptimistic: true })

    try {
      // 2. 执行实际的异步服务器操作。
      const addedItem = await addToCart(item)

      // 3. 如果服务器操作成功，更新实际的 'carts' 状态。
      // 当 'carts' 更新时，useOptimistic 会自动将 'optimisticCarts'
      // 与这个新的 'carts' 状态进行协调，从而“确认”乐观的商品。
      setCarts((prevCarts) => [addedItem, ...prevCarts])
    } catch (error) {
      // 4. 如果服务器操作失败，记录错误。
      // 如果没有用新商品调用 'setCarts'，useOptimistic 将自动回滚 'optimisticCarts'
      // 到上一个确认的 'carts' 状态，从而“撤销”乐观的更新。
      console.error('添加商品到购物车失败:', error)
    }
  }

  return (
    <div>
      <h1>购物车</h1>
      <button onClick={() => handleAddToCart({
        sku: 'item1',
        name: '商品 1'
      })}>添加商品 1</button>
      <button onClick={() => handleAddToCart({
        sku: 'item2',
        name: '商品 2'
      })}>添加商品 2</button>

      <ul>
        {/* 渲染 optimisticCarts，它包含已确认和待处理的商品 */}
        {optimisticCarts.map((item, index) => (
          // 如果 sku 是唯一的，用它作为 key 更好。如果不能保证唯一，则回退到 index。
          <li key={item.sku || index}>
            {item.name} {item.isOptimistic && <span style={{ color: 'gray' }}>(正在添加...)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShoppingCart
