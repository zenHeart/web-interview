// 类组件
import React from 'react'

class UserDataClass extends React.Component {
  state = { data: null, loading: true }
  controller = null // 用于取消请求

  componentDidMount () {
    this.controller = new AbortController()
    fetch('https://httpbin.org/uuid', {
      signal: this.controller.signal
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('[Class] Fetched data:', data, this)
        this.setState({ data, loading: false })
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('[Class] Request aborted')
        } else {
          console.error(err)
        }
      })
  }

  componentWillUnmount () {
    this.controller.abort() // 取消请求
  }

  render () {
    const { data, loading } = this.state
    return (
      <div style={{ border: '1px solid #aaa', padding: '10px', margin: '10px' }}>
        <h2>类组件</h2>
        {loading ? <p>加载中...</p> : <p>用户 id：{data.uuid}</p>}
      </div>
    )
  }
}

export default UserDataClass
