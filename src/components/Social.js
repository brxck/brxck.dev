import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import style from '../styles/Navigation.module.scss'

const Navigation = () => (
  <nav className={style.navigation}>
    <ul>
      <StaticQuery
        query={graphql`
          query SocialQuery {
            dataJson {
              github
              twitter
              instagram
              linkedin
            }
          }
        `}
        render={({ dataJson }) => (
          <>
            {Object.entries(dataJson).map(([name, link]) => (
              <li key={name}>
                <a href={link}>{name}</a>
              </li>
            ))}
          </>
        )}
      />
    </ul>
  </nav>
)

export default Navigation
