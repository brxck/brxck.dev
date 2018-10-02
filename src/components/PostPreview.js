import React from 'react'
import { Link } from 'gatsby'

const PostPreview = ({ post }) => {
  return (
    <article>
      <h3>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </h3>
      <h4>{post.frontmatter.date}</h4>
      <p>{post.excerpt}</p>
    </article>
  )
}

export default PostPreview
