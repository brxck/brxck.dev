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
        <h2 className="text-3xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500">
          Hi, I'm Brock.
        </h2>
        <div className="my-3 content">
          <p>
            I'm a full stack developer creating applications that make the
            University of Arizona a better place to learn and work.
          </p>
          <p>
            When I'm not coding, I prefer to be in a hammock or planning a
            backpacking trip into the wilderness.
          </p>
        </div>
      </header>
      <main>
        <h3
          className="mt-3 mb-2 text-2xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
          id="posts"
        >
          writing
        </h3>
        {posts.nodes.map((post) => (
          <PostPreview key={post.fields.slug} post={post} />
        ))}
        <Link to="/archive">archive →</Link>
        <h3
          className="mt-3 mb-2 text-2xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
          id="work"
        >
          work
        </h3>
        <p>
          Here is a selection of my peronal projects and open source work. I
          keep more code and contributions over at my{' '}
          <a href="https://github.com/brxck">Github.</a>
        </p>
        {projects.nodes.map((project) => (
          <Project key={project.frontmatter.title} project={project} />
        ))}
        <h3
          className="mt-3 mb-2 text-2xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
          id="contact"
        >
          contact
        </h3>
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
