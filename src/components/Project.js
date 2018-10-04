import React from 'react'
import style from '../styles/card.module.scss'

const Project = ({ project }) => {
  return (
    <article className={style.card}>
      <div className={style.header}>
        <h3>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
      </div>
      <div className={style.body}>
        <div className={style.description}>
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <ul className={style.tags}>
          {project.technology.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <div className={style.footer}>
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            Code
          </a>
        </div>
      </div>
    </article>
  )
}

export default Project
