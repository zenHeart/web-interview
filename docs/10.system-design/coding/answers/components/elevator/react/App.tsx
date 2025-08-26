import React from 'react'
import Elevator from './Elevator'
import './Elevator.css'

export default function App () {
  const sections = [ { id:'s1', title:'一' }, { id:'s2', title:'二' }, { id:'s3', title:'三' } ]
  return <Elevator sections={sections} />
}
