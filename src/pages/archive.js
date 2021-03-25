import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

const Archive = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <header>
        <h1 className="mb-5 heading">archive</h1>
      </header>
      <main>
        {posts.map(({ node }) => (
          <PostPreview post={node} key={node.id} />
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default Archive
