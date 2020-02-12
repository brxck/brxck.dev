import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Navigation = () => (
  <nav>
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
