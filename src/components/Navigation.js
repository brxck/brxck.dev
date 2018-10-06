import React from 'react'
import AnchorLink from './AnchorLink'
import style from '../styles/Navigation.module.scss'

const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <AnchorLink target="work">work</AnchorLink>
      </li>
      <li>
        <AnchorLink target="posts">posts</AnchorLink>
      </li>
      <li>
        <AnchorLink target="contact">contact</AnchorLink>
      </li>
    </ul>
  </nav>
)

export default Navigation
