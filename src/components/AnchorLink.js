import React, { Component } from 'react'

export default class AnchorLink extends Component {
  scroll(e) {
    e.preventDefault()
    const target = this.props.target
    const top =
      document.getElementById(target).getBoundingClientRect().top +
      window.scrollY
    window.scroll({ top: top, behavior: 'smooth' })
  }

  render() {
    return (
      <a href="#" onClick={e => this.scroll(e)}>
        {this.props.children}
      </a>
    )
  }
}
