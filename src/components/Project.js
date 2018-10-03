import React from 'react'
import cardStyle from '../styles/card.module.scss'

const Project = ({ project }) => {
  return (
    <article className={cardStyle.card}>
      <div className={cardStyle.body}>
        <h3 className={cardStyle.title}>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <ul>
          {project.technology.map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
        </ul>
        <div className={cardStyle.footer}>
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            Code
          </a>
        </div>
      </div>
    </article>
  )
}

export default Project
