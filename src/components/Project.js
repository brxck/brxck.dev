import React from 'react'
import Img from 'gatsby-image'
import Icon from '@mdi/react'
import { mdiGithubCircle } from '@mdi/js'

const Project = ({ project }) => {
  const { title, repo, tags, link, preview } = project.frontmatter
  return (
    <article className="relative flex flex-col justify-between h-full px-5 text-sm bg-white border rounded-2xl dark:bg-gray-900 dark:border-gray-700">
      <div className="absolute z-10 w-full h-full -m-1 -ml-6 -mr-5 border-2 border-indigo-300 pointer-events-none dark:border-green-500 rounded-2xl"></div>
      <div>
        <Img
          className="-mx-5 rounded-b-none rounded-2xl"
          fluid={preview.childImageSharp.fluid}
        ></Img>
        <div className="flex items-center justify-between pt-5">
          <h3 className="text-lg">
            <a href={link || ''} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={` repository`}
            >
              <Icon path={mdiGithubCircle} size={1} color="hsl(0, 0%, 29%)" />
            </a>
          )}
        </div>
        <div className="prose-sm dark:prose-dark-sm">
          <p dangerouslySetInnerHTML={{ __html: project.html }}></p>
        </div>
      </div>
      <ul className="flex pb-5">
        {tags.map((tech, index) => (
          <li
            className="px-1 py-0.5 mr-1 text-xs text-indigo-600 border border-indigo-600 rounded-md dark:text-green-500 dark:border-green-600"
            key={index}
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Project
