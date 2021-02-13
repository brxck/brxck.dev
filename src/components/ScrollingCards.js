import React from 'react'

function ScrollingCards(props) {
  return (
    <div>
      <div>
        <div />
        <>{props.children}</>
        <div />
      </div>
    </div>
  )
}

export default ScrollingCards
