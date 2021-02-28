import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

const Archive = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <header>
        <h1 className="mb-5 heading">writings archive</h1>
      </header>
      <main className="flex flex-wrap gap-4 -ml-36" style={{ width: '130%' }}>
        {posts.map(({ node }) => (
          <div key={node.id} className="flex flex-grow w-1/4">
            <PostPreview post={node} />
          </div>
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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
