import React from 'react'
import { Link } from 'gatsby'
import style from '../styles/card.module.scss'

const PostPreview = ({ post }) => {
  return (
    <article className={style.card}>
      <div className={style.body}>
        <h3>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h3>
        <div className={style.description}>
          <p>{post.excerpt}</p>
        </div>
        <div className={style.footer}>
          <span>{post.frontmatter.date}</span>
        </div>
      </div>
    </article>
  )
}

export default PostPreview
