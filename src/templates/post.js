import React from 'react'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'
import style from '../styles/page.module.scss'

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Helmet
        title={`${post.frontmatter.title} | Brock McElroy`}
        meta={[
          {
            name: 'description',
            content: post.excerpt,
          },
        ]}
      />
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
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        categories
      }
    }
  }
`

export default PostTemplate
