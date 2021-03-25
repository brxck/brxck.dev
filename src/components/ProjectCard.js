import React from 'react'
import Img from 'gatsby-image'

const ProjectCard = ({ project }) => {
  const { title, repo, tags, link, preview } = project.frontmatter
  return (
    <article className="relative flex flex-col justify-between h-full px-5 text-sm bg-white border border-indigo-400 rounded-2xl dark:bg-gray-900 dark:border-green-400">
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
              title="Repository"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-git-pull-request"
              >
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                <line x1="6" y1="9" x2="6" y2="21"></line>
              </svg>
            </a>
          )}
        </div>
        <div className="prose-sm dark:prose-dark-sm">
          <p dangerouslySetInnerHTML={{ __html: project.html }}></p>
        </div>
      </div>
      <ul className="flex gap-1 pb-5">
        {tags.map((tech, index) => (
          <li
            className="px-1 py-0.5 text-xs text-indigo-600 border border-indigo-600 rounded-md dark:text-green-500 dark:border-green-600"
            key={index}
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ProjectCard
