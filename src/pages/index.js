import React from 'react'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import ScrollingCards from '../components/ScrollingCards'
import Contact from '../components/Contact'
import { Link, graphql } from 'gatsby'

import style from '../styles/indexStyle.module.scss'

const IndexPage = ({ data }) => {
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
      </header>
      <main>
        <h1 id="work" className={style.section}>
          work
        </h1>
        <div className={style.text}>
          <p>
            Lately I've been enjoying working with modern JavaScript front-ends
            backed by Ruby on Rails APIs. This site was made from scratch using
            Gatsby and React.
          </p>
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
        <h1 id="posts" className={style.section}>
          posts
        </h1>
        <ScrollingCards>
          {posts.map(({ node }) => (
            <PostPreview key={node.id} post={node} />
          ))}
        </ScrollingCards>
        <div className={style.text}>
          <h1 id="mail" className={style.section}>
            mail
          </h1>
          <Contact />
        </div>
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
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
