import React from 'react'
import { Link } from 'gatsby'

const PostPreview = ({ post }) => {
  return (
    <article>
      <div>
        <h3>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h3>
      </div>
      <div>
        <div>
          <p>{post.excerpt}</p>
        </div>
        <div>
          <div>
            <ul>
              {post.frontmatter.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
            <div>{post.frontmatter.date}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostPreview
