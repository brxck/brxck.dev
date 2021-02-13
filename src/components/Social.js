import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <nav>
      <ul>
        {Object.entries(data.dataJson).map(([name, link]) => (
          <li key={name}>
            <a href={link}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Social
