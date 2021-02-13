import React from 'react'

const Social = ({ links }) => {
  return (
    <nav>
      <ul>
        {Object.entries(links).map(([name, link]) => (
          <li key={name}>
            <a href={link}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Social
