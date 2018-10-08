import React, { Component } from 'react'
import Icon from '@mdi/react'
import anime from 'animejs'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import style from '../styles/ScrollingCards.module.scss'

class ScrollingCards extends Component {
  constructor(props) {
    super(props)
    this.scrolling = React.createRef()
    this.left = React.createRef()
    this.right = React.createRef()
  }

  componentDidMount() {
    const scrollingElement = this.scrolling.current

    // Hide scrollbar and show buttons if javascript enabled
    if (window.innerWidth > 769) {
      scrollingElement.style.overflow = 'hidden'
      this.left.current.style.display = 'block'
      this.right.current.style.display = 'block'
    }

    // Set initial scroll position
    const fadeWidth = scrollingElement.clientWidth * 0.05
    const paddingWidth = scrollingElement.firstChild.clientWidth
    scrollingElement.scrollLeft = paddingWidth - fadeWidth
  }

  scroll(amount) {
    const scrolling = this.scrolling.current
    const current = scrolling.scrollLeft
    const max = scrolling.scrollWidth - scrolling.clientWidth
    anime({
      targets: scrolling,
      scrollLeft: Math.min(current + amount, max),
    })
  }

  render() {
    return (
      <div className={style.container}>
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
