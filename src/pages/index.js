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
      <header>
        <p>Hi, I'm Brock.</p>
        <p>
          I am a web developer from Tucson, Arizona. I believe in sustainability
          in all things — I aim to write code that is performant,
          understandable, and robust.
        </p>
        <p>
          These are some of the things I've been working on recently. I keep
          more code and contributions over at my{' '}
          <a href="https://github.com/brxck">Github.</a>
        </p>
      </header>
      <main>
        <h2>Work</h2>
        {projects.map(({ node }) => (
          <Project key={node.id} project={node} />
        ))}
        <h2>Posts</h2>
        {posts.map(({ node }) => (
          <PostPreview key={node.id} post={node} />
        ))}
      </main>
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

    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            categories
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

export default IndexPage
