import React from 'react'

const Project = ({ project }) => {
  return (
    <article>
      <h3>
        <a href={project.link} target="_blank">
          {project.name}
        </a>
      </h3>
      <span>{project.date}</span>
      <p>{project.description}</p>
      <a href={project.repo} target="_blank">
        Code
      </a>
      <ul>
        {project.technology.map(tech => (
          <li>{tech}</li>
        ))}
      </ul>
    </article>
  )
}

export default Project
