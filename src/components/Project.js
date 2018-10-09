import React, { Component } from 'react'
import Img from 'gatsby-image'
import Icon from '@mdi/react'
import { mdiGithubCircle } from '@mdi/js'
import style from '../styles/card.module.scss'

class Project extends Component {
  cardImage(image) {
    if (image) return <Img fluid={image.node.childImageSharp.fluid} />
  }

  render() {
    const { project, data, images } = this.props
    const image = images.find(
      ({ node: { name } }) => name === project.name.toLowerCase()
    )

    return (
      <article className={style.card}>
        <div className={style.image}>{this.cardImage(image)}</div>
        <div className={style.header}>
          <h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            <Icon path={mdiGithubCircle} size={1} color="hsl(0, 0%, 29%)" />
          </a>
        </div>
        <div className={style.body}>
          <div className={style.description}>
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>{data}</p>
          </div>
          <div className={style.footer}>
            <ul className={style.tags}>
              {project.technology.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    )
  }
}

export default Project
