import React from 'react'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import ScrollingCards from '../components/ScrollingCards'
import { Link, graphql } from 'gatsby'

import style from '../styles/indexStyle.module.scss'

const IndexPage = ({ data }) => {
  console.log(data)
  const projects = data.allProjectsJson.edges
  const projectImages = data.allFile.edges
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <header className={style.text}>
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
        <h2 className={style.section}>Work</h2>
        <ScrollingCards>
          {projects.map(({ node }) => (
            <Project key={node.id} project={node} images={projectImages} />
          ))}
        </ScrollingCards>
        <h2 className={style.section}>Posts</h2>
        <ScrollingCards>
          {posts.map(({ node }) => (
            <PostPreview key={node.id} post={node} />
          ))}
        </ScrollingCards>
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

    allFile(filter: { relativePath: { regex: "/^projects.*.png/" } }) {
      edges {
        node {
          name
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 400) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export default IndexPage
