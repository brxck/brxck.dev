import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import ScrollingCards from '../components/ScrollingCards'
import Contact from '../components/Contact'

const IndexPage = ({ data }) => {
  const projects = data.allProjectsJson.edges
  const projectImages = data.allFile.edges
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <header id="home">
        <h1>Hi, I'm Brock.</h1>
        <p>
          I'm a full stack web developer at the University of Arizona in Tucson,
          AZ. I believe in sustainability in all things — I aim to write code
          that is performant, understandable, and robust.
        </p>
      </header>
      <ScrollingCards>
        {posts.map(({ node }) => (
          <PostPreview key={node.id} post={node} />
        ))}
      </ScrollingCards>
      <div>
        <div>
          <Link to="/archive">archive →</Link>
        </div>
        <h2 id="mail">mail</h2>
        <Contact />
      </div>
      <main>
        <h2 id="work">work</h2>
        <div>
          <p>
            These are some of the things I've been working on recently. I keep
            more code and contributions over at my{' '}
            <a href="https://github.com/brxck">Github.</a>
          </p>
        </div>
        <ScrollingCards>
          {projects.map(({ node }) => (
            <Project key={node.id} project={node} images={projectImages} />
          ))}
        </ScrollingCards>
        <h2 id="posts">posts</h2>
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
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }

    allFile(filter: { relativePath: { regex: "/^projects.*.png/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default IndexPage
