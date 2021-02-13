import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import ScrollingCards from '../components/ScrollingCards'
import Contact from '../components/Contact'

const IndexPage = ({ data }) => {
  const { posts, projects } = data
  console.log(data)
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
      <h2 id="posts">posts</h2>
      <ScrollingCards>
        {posts.nodes.map((post) => (
          <PostPreview key={post.fields.slug} post={post} />
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
          {projects.nodes.map((project) => (
            <Project key={project.frontmatter.title} project={project} />
          ))}
        </ScrollingCards>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    site: site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
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

    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          repo
          date(formatString: "DD MMMM, YYYY")
          tags
        }
        html
      }
    }
  }
`

export default IndexPage
