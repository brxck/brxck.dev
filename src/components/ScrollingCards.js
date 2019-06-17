import React, { useState, useRef, useEffect } from 'react'
import Icon from '@mdi/react'
import Waypoint from 'react-waypoint'
import anime from 'animejs'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

import style from '../styles/ScrollingCards.module.scss'

function ScrollingCards(props) {
  const scrolling = useRef()
  const left = useRef()
  const right = useRef()

  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    function handleResize() {
      // Hide scrollbar and show buttons if javascript enabled
      if (window.innerWidth > 1500) {
        scrolling.current.style.overflow = 'hidden'
        left.current.style.display = 'block'
        right.current.style.display = 'block'
      } else {
        scrolling.current.style.overflow = 'scroll'
        left.current.style.display = 'hidden'
        right.current.style.display = 'hidden'
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function animate() {
    if (animated === true) return
    const { current } = scrolling
    const fadeWidth = current.clientWidth * 0.05
    const paddingWidth = current.firstChild.clientWidth
    current.style.willChange = true
    anime({
      targets: current,
      scrollLeft: paddingWidth - fadeWidth,
      delay: 100,

      callback: () => (current.style.willChange = false),
    })
    setAnimated(true)
  }

  function scroll(amount) {
    const { current } = scrolling
    const { scrollLeft } = current
    const offset = current.firstChild.clientWidth / 4
    anime({
      targets: current,
      duration: 800,
      elasticity: 100,
      scrollLeft: Math.max(
        offset,
        Math.min(
          scrollLeft + amount,
          current.scrollWidth - current.clientWidth - offset
        )
      ),
    })
  }

  return (
    <div className={style.container}>
      <Waypoint onEnter={animate} />
      <div className={style.left}>
        <button
          ref={left}
          onClick={() => scroll(-400)}
          aria-label="scroll left"
        >
          <Icon path={mdiChevronLeft} color="currentColor" />
        </button>
      </div>
      <div className={style.right}>
        <button
          ref={right}
          onClick={() => scroll(400)}
          aria-label="scroll right"
        >
          <Icon path={mdiChevronRight} color="currentColor" />
        </button>
      </div>

      <div ref={scrolling} className={style.scrolling}>
        <div className={style.padding} />
        <>{props.children}</>
        <div className={style.padding} />
      </div>
    </div>
  )
}

export default ScrollingCards
