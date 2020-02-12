import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import SmoothLink from './SmoothLink'

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
      <nav>
        <ul>
          <li>
            <SmoothLink to="/">home</SmoothLink>
          </li>
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
