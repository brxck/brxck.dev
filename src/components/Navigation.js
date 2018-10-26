import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import SmoothLink from './SmoothLink'
import style from '../styles/Navigation.module.scss'

const Navigation = props => (
  <StaticQuery
    query={graphql`
      query IconQuery {
        file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width: 32, quality: 85) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <nav className={style.navigation}>
        <SmoothLink to="/">
          <Img
            fixed={data.file.childImageSharp.fixed}
            alt="icon"
            critical
            className={style.icon}
          />
        </SmoothLink>
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
    )}
  />
)

export default Navigation
