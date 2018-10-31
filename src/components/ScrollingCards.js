import React, { Component } from 'react'
import Icon from '@mdi/react'
import Waypoint from 'react-waypoint'
import anime from 'animejs'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import style from '../styles/ScrollingCards.module.scss'

class ScrollingCards extends Component {
  animated = false

  constructor(props) {
    super(props)
    this.scrolling = React.createRef()
    this.left = React.createRef()
    this.right = React.createRef()
  }

  componentDidMount = () => {
    // Hide scrollbar and show buttons if javascript enabled
    if (window.innerWidth > 1200) {
      this.scrolling.current.style.overflow = 'hidden'
      this.left.current.style.display = 'block'
      this.right.current.style.display = 'block'
    }
  }

  animate = () => {
    if (this.animated === true) return
    const scrolling = this.scrolling.current
    const fadeWidth = scrolling.clientWidth * 0.05
    const paddingWidth = scrolling.firstChild.clientWidth
    scrolling.style.willChange = true
    anime({
      targets: scrolling,
      scrollLeft: paddingWidth - fadeWidth,
      delay: 100,
      callback: () => (scrolling.style.willChange = false),
    })
    this.animated = true
  }

  scroll = amount => {
    const scrolling = this.scrolling.current
    const current = scrolling.scrollLeft
    const offset = scrolling.firstChild.clientWidth / 4
    anime({
      targets: scrolling,
      scrollLeft: Math.max(
        offset,
        Math.min(
          current + amount,
          scrolling.scrollWidth - scrolling.clientWidth - offset
        )
      ),
    })
  }

  render() {
    return (
      <div className={style.container}>
        <Waypoint onEnter={this.animate} />
        <div className={style.left}>
          <button ref={this.left} onClick={() => this.scroll(-400)}>
            <Icon path={mdiChevronLeft} color="currentColor" />
          </button>
        </div>
        <div className={style.right}>
          <button ref={this.right} onClick={() => this.scroll(400)}>
            <Icon path={mdiChevronRight} color="currentColor" />
          </button>
        </div>

        <div ref={this.scrolling} className={style.scrolling}>
          <div className={style.padding} />
          <>{this.props.children}</>
          <div className={style.padding} />
        </div>
      </div>
    )
  }
}

export default ScrollingCards
