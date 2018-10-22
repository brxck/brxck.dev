import React from 'react'
import { Link } from 'gatsby'
import style from '../styles/card.module.scss'

const PostPreview = ({ post }) => {
  return (
    <article className={style.card}>
      <div className={style.header}>
        <h3>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h3>
      </div>
      <div className={style.body}>
        <div className={style.description}>
          <p>{post.excerpt}</p>
        </div>
        <div className={style.footer}>
          <div>
            <ul className={style.tags}>
              {post.frontmatter.tags.split(' ').map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
            <div className={style.date}>{post.frontmatter.date}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostPreview
