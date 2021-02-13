import React from 'react'
import Img from 'gatsby-image'
import Icon from '@mdi/react'
import { mdiGithubCircle } from '@mdi/js'

const Project = ({ project }) => {
  const { title, repo, tags, link } = project.frontmatter
  return (
    <article>
      <div></div>
      <div>
        <h3>
          <a href={link || ''} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} repository`}
          >
            <Icon path={mdiGithubCircle} size={1} color="hsl(0, 0%, 29%)" />
          </a>
        )}
      </div>
      <div>
        <div>
          <p>{project.html}</p>
        </div>
        <div>
          <ul>
            {tags.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default Project
