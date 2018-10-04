import React, { Component } from 'react'
import style from '../styles/ScrollingCards.module.scss'

class ScrollingCards extends Component {
  constructor(props) {
    super(props)
    this.scrolling = React.createRef()
  }

  componentDidMount() {
    this.scrolling.current.scrollLeft = '100'
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
