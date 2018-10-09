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
    // Set and animate initial scroll position
    const scrollingElement = this.scrolling.current
    const fadeWidth = scrollingElement.clientWidth * 0.05
    const paddingWidth = scrollingElement.firstChild.clientWidth
    anime({
      targets: this.scrolling.current,
      scrollLeft: paddingWidth - fadeWidth,
    })

    // Hide scrollbar and show buttons if javascript enabled
    if (window.innerWidth > 769) {
      scrollingElement.style.overflow = 'hidden'
      this.left.current.style.display = 'block'
      this.right.current.style.display = 'block'
    }
  }

  scroll(amount) {
    const scrolling = this.scrolling.current
    const current = scrolling.scrollLeft
    anime({
      targets: scrolling,
      scrollLeft: Math.max(
        200,
        Math.min(
          current + amount,
          scrolling.scrollWidth - scrolling.clientWidth - 200
        )
      ),
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
