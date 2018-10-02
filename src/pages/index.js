import React from 'react'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import { Link, graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const projects = data.allProjectsJson.edges
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {projects.map(({ node }) => (
        <Project key={node.id} project={node} />
      ))}
      <h1>Posts</h1>
      {posts.map(({ node }) => (
        <PostPreview key={node.id} post={node} />
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  {
    allProjectsJson {
      edges {
        node {
          name
          repo
          link
          technology
          date
          description
        }
      }
    }

    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
            categories
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
