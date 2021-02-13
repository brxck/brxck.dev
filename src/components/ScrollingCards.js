import React from 'react'

import style from '../styles/ScrollingCards.module.scss'

function ScrollingCards(props) {
  return (
    <div className={style.container}>
      <div className={style.scrolling}>
        <div className={style.padding} />
        <>{props.children}</>
        <div className={style.padding} />
      </div>
    </div>
  )
}

export default ScrollingCards
