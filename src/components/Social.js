import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import style from '../styles/Navigation.module.scss'

const Social = () => {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      dataJson {
        github
        twitter
        instagram
        linkedin
      }
    }
  `)
  return (
    <nav className={style.navigation}>
      <ul>
        {Object.entries(data).map(([name, link]) => (
          <li key={name}>
            <a href={link}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Social
