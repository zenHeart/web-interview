import React from 'react'
import Upload from './Upload'
import './Upload.css'

export default function App () {
  return <Upload chunkSize={128*1024} concurrency={3} />
}
