import React from 'react'

const ProjectPreview = ({ project }) => {
  const { repo, tags } = project.frontmatter
  return (
    <article key={project.id} className="py-2">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <h3 className="mb-1 text-lg">
            <a
              href={project.frontmatter.link || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.frontmatter.title}
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
        <ul className="hidden gap-1 pb-5 sm:flex">
          {tags.map((tech, index) => (
            <li
              className="px-1 py-0.5 text-xs text-indigo-600 border border-indigo-600 rounded-md dark:text-green-500 dark:border-green-600"
              key={index}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <p dangerouslySetInnerHTML={{ __html: project.html }}></p>
      <p></p>
    </article>
  )
}

export default ProjectPreview
