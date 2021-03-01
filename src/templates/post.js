import React from 'react'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

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
      <article className="prose dark:prose-dark">
        <h1>{post.frontmatter.title}</h1>
        <div className="-mt-6">{post.frontmatter.date}</div>
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
        tags
      }
    }
  }
`

export default PostTemplate
