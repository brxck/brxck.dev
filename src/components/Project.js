import React, { Component } from 'react'
import Img from 'gatsby-image'
import style from '../styles/card.module.scss'

class Project extends Component {
  cardImage(image) {
    if (image) return <Img fixed={image.node.childImageSharp.fixed} />
  }

  render() {
    const { project, data, images } = this.props
    const image = images.find(
      ({ node: { name } }) => name === project.name.toLowerCase()
    )
    console.log(image)

    return (
      <article className={style.card}>
        <div className={style.image}>{this.cardImage(image)}</div>
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
              <p key={`${project.id}-desc-${index}`}>{paragraph}</p>
            ))}
            <p>{data}</p>
          </div>
          <ul className={style.tags}>
            {project.technology.map((tech, index) => (
              <li key={`${project.id}-tech-${index}`}>{tech}</li>
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
}

export default Project
