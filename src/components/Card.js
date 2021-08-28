import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Tags from './Tags'

const Card = ({ image, title, children, link, repo, tags, className }) => {
  return (
    <article
      className={`relative flex flex-col justify-between flex-1 px-5 text-sm bg-white border-2 border-indigo-400 rounded-2xl dark:bg-gray-900 dark:border-green-400 ${className}`}
    >
      <div>
        {image && (
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            className="mb-5 -mx-5 border-b rounded-b-none rounded-2xl"
            alt={title}
          />
        )}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg">
            <a
              href={link}
              target={link.includes('://') && '_blank'}
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </h3>
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Source repository"
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
        <div className="mb-3 prose-sm dark:prose-dark-sm">{children}</div>
      </div>
      <Tags tags={tags}></Tags>
    </article>
  )
}

export default Card
