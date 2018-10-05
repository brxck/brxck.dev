import React, { Component } from 'react'
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
    // scrollingElement.style.overflow = 'hidden'
    this.left.current.style.display = 'block'
    this.right.current.style.display = 'block'

    // Set initial scroll position
    const fadeWidth = scrollingElement.clientWidth * 0.05
    const paddingWidth = scrollingElement.firstChild.clientWidth
    scrollingElement.scrollLeft = paddingWidth - fadeWidth
  }

  scroll(amount) {
    const current = this.scrolling.current.scrollLeft
    const target = current + amount
    if (amount > 0) {
      const scrollInterval = setInterval(() => {
        if (this.scrolling.current.scrollLeft >= target) {
          clearInterval(scrollInterval)
        }
        this.scrolling.current.scrollLeft += 25
      }, 1000 / 60)
    } else if (amount < 0) {
      const scrollInterval = setInterval(() => {
        if (this.scrolling.current.scrollLeft <= target) {
          clearInterval(scrollInterval)
        }
        this.scrolling.current.scrollLeft -= 25
      }, 1000 / 60)
    }
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.left}>
          <button ref={this.left} onClick={() => this.scroll(-400)} />
        </div>
        <div className={style.right}>
          <button ref={this.right} onClick={() => this.scroll(400)} />
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
