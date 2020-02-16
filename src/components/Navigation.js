import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import SmoothLink from './SmoothLink'

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;

  li {
    display: inline;
    padding: 1rem 2rem;
  }
`

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
        <List>
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
        </List>
      </nav>
    )}
  />
)

export default Navigation
