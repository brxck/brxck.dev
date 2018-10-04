import React, { Component } from 'react'
import style from '../styles/ScrollingCards.module.scss'

class ScrollingCards extends Component {
  constructor(props) {
    super(props)
    this.scrolling = React.createRef()
  }

  componentDidMount() {
    const fadeWidth = this.scrolling.current.clientWidth * 0.05
    const paddingWidth = this.scrolling.current.firstChild.clientWidth
    this.scrolling.current.scrollLeft = paddingWidth - fadeWidth
  }

  render() {
    return (
      <div className={style.container}>
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
