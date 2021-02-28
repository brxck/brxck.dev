import React from 'react'
import { Link } from 'gatsby'

const PostPreview = ({ post }) => {
  return (
    <article className="relative text-sm bg-white border rounded-2xl dark:bg-gray-900 dark:border-gray-700">
      <div className="absolute w-full h-full -m-1 border-2 border-indigo-300 pointer-events-none dark:border-green-500 rounded-2xl"></div>
      <div className="flex flex-col justify-between h-full p-5">
        <div className="prose-sm">
          <h3>
            <Link to={post.fields.slug} className="link">
              {post.frontmatter.title}
            </Link>
          </h3>
          <p>{post.excerpt}</p>
        </div>
        <div className="py-1 text-xs">{post.frontmatter.date}</div>
        <ul className="flex flex-wrap gap-1 py-1">
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
    </article>
  )
}

export default PostPreview
