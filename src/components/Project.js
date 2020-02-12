import React, { Component } from 'react'
import Img from 'gatsby-image'
import Icon from '@mdi/react'
import { mdiGithubCircle } from '@mdi/js'

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
      <article>
        <div>{this.cardImage(image)}</div>
        <div>
          <h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} repository`}
            >
              <Icon path={mdiGithubCircle} size={1} color="hsl(0, 0%, 29%)" />
            </a>
          )}
        </div>
        <div>
          <div>
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>{data}</p>
          </div>
          <div>
            <ul>
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
