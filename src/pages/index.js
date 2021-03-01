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
        <h1 className="mb-3 text-3xl italic font-black tracking-wide text-indigo-500 dark:text-green-500">
          Hi, I'm Brock.
        </h1>
        <div className="prose dark:prose-dark">
          <p>
            I'm a full stack web developer. Currently, I'm at the creating
            applications that make the University of Arizona a better place to
            learn and work.
          </p>
          <p>
            I enjoy doing deep dives for the best solutions, whether I am
            orchestrating containers in AWS, writing an API in Django, or
            building an application in React.
          </p>
          <p>
            In the past, I have been a teaching assistant for the University of
            Arizona's web development bootcamp and a freelance web developer.
          </p>
          <p>
            When I'm not coding, I prefer to be in a hammock or planning a
            backpacking trip into the wilderness.
          </p>
        </div>
      </header>

      <main>
        <div className="flex items-center justify-between mt-6 mb-5">
          <Link to="/archive">
            <h2 className="heading" id="writing">
              writing
            </h2>
          </Link>
          <Link className="text-lg italic" to="/archive">
            more →
          </Link>
        </div>
        <div className="relative flex flex-col gap-4 lg:flex-row lg:-left-1/3 lg:w-5/3">
          {posts.nodes.map((post) => (
            <PostPreview key={post.fields.slug} post={post} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 heading" id="work">
          work
        </h2>
        <p>
          A selection of my peronal projects and open source work. I keep more
          code and contributions over at my{' '}
          <a href="https://github.com/brxck">Github.</a>
        </p>
        <div className="relative flex flex-col justify-center gap-4 mt-5 lg:flex-row lg:-left-1/3 lg:w-5/3">
          {projects.nodes.map((project) => (
            <div key={project.frontmatter.title} className="lg:w-1/3">
              <Project project={project} />
            </div>
          ))}
        </div>

        <h2 className="mt-6 mb-3 heading" id="contact">
          contact
        </h2>
        <Contact />
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allMarkdownRemark(
      limit: 3
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
      limit: 3
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        html
        frontmatter {
          title
          link
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
