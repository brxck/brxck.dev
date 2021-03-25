import React from 'react'
import { Link } from 'gatsby'

const PostPreview = ({ post }) => {
  return (
    <article className="flex flex-col justify-between h-full py-3">
      <div className="flex justify-between">
        <h3 className="text-lg">
          <Link to={post.fields.slug} className="link">
            {post.frontmatter.title}
          </Link>
        </h3>
        <ul className="flex-wrap hidden gap-1 py-1 sm:flex">
          {post.frontmatter.tags.map((tag, index) => (
            <li
              className="px-1 text-xs text-indigo-600 border border-indigo-600 rounded-md dark:text-green-500 dark:border-green-600"
              key={index}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <p>{post.excerpt}</p>
    </article>
  )
}

export default PostPreview
