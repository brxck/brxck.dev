import React from 'react'
import { Link } from 'gatsby'
import cardStyle from '../styles/card.module.scss'

const PostPreview = ({ post }) => {
  return (
    <article className={cardStyle.card}>
      <div className={cardStyle.body}>
        <h3>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className={cardStyle.footer}>
          <span>{post.frontmatter.date}</span>
        </div>
      </div>
    </article>
  )
}

export default PostPreview
