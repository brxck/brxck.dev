import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Project from '../components/Project'
import Contact from '../components/Contact'

const IndexPage = ({ data }) => {
  const { posts, projects } = data
  return (
    <Layout>
      <header>
        <h1>Hi, I'm Brock.</h1>
        <p>
          I'm a full stack developer creating applications that make the
          University of Arizona a better place to learn and work.
        </p>
        <p>
          When I'm not coding, I prefer to be in a hammock or planning a
          backpacking trip into the wilderness.
        </p>
      </header>
      <main>
        <h2 id="posts">posts</h2>
        {posts.nodes.map((post) => (
          <PostPreview key={post.fields.slug} post={post} />
        ))}
        <Link to="/archive">archive →</Link>
        <h2 id="work">work</h2>
        <p>
          Here is a selection of my peronal projects and open source work. I
          keep more code and contributions over at my{' '}
          <a href="https://github.com/brxck">Github.</a>
        </p>
        {projects.nodes.map((project) => (
          <Project key={project.frontmatter.title} project={project} />
        ))}
        <h2 id="contact">contact</h2>
        <Contact />
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          tags
        }
        fields {
          slug
        }
      }
    }

    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        html
        frontmatter {
          title
          repo
          date(formatString: "DD MMMM, YYYY")
          tags
          preview {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
