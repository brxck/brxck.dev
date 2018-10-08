import React from 'react'
import SmoothLink from './SmoothLink'
import style from '../styles/Navigation.module.scss'

const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <li>
        <SmoothLink to="#work">work</SmoothLink>
      </li>
      <li>
        <SmoothLink to="#posts">posts</SmoothLink>
      </li>
      <li>
        <SmoothLink to="#mail">mail</SmoothLink>
      </li>
    </ul>
  </nav>
)

export default Navigation
