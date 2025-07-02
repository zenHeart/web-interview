import { Component } from 'react'

export default class ClassComponent extends Component<{ value: string }> {
  componentDidUpdate () {
    setTimeout(() => {
      console.log('类组件 props（最新）:', this.props.value)
    }, 3000)
  }

  render () {
    return <div>类组件当前 value: {this.props.value}</div>
  }
}
