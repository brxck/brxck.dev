import React, { useState, useRef } from 'react'
import Waypoint from 'react-waypoint'
import anime from 'animejs'

import style from '../styles/ScrollingCards.module.scss'

function ScrollingCards(props) {
  const scrolling = useRef()

  const [animated, setAnimated] = useState(false)

  function animate() {
    if (animated === true) return
    const { current } = scrolling
    const fadeWidth = current.clientWidth * 0.05
    const paddingWidth = current.firstChild.clientWidth

    current.style.willChange = true
    setTimeout(() => {
        anime({
            targets: current,
            scrollLeft: paddingWidth - fadeWidth,
            delay: 100,
      
            callback: () => (current.style.willChange = false),
          })
          setAnimated(true)
    }, 500);
    setAnimated(true)
    current.style.willChange = false
  }

  return (
    <div className={style.container}>
      <Waypoint onEnter={animate} />

      <div ref={scrolling} className={style.scrolling}>
        <div className={style.padding} />
        <>{props.children}</>
        <div className={style.padding} />
      </div>
    </div>
  )
}

export default ScrollingCards
