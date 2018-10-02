import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const projects = data.allProjectsJson.edges
  console.log(projects)
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {projects.map(({ node }) => (
        <h2 key={node.name}>{node.name}</h2>
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
          tech
          date
          description
        }
      }
    }
  }
`

export default IndexPage
