import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import style from '../styles/page.module.scss'

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <article className={style.text}>
        <h1>{post.frontmatter.title}</h1>
        <h2 className={style.subtitle}>{post.frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        categories
      }
    }
  }
`

export default PostTemplate
