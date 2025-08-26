import React from 'react'
import Carousel from './Carousel'
import './Carousel.css'

export default function App () {
  return (
    <Carousel items={[<div>1</div>,<div>2</div>,<div>3</div>]} autoplay interval={1500} width={320} height={160} />
  )
}
