import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectPreview from '../components/ProjectPreview'
import PostPreview from '../components/PostPreview'

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
            I'm a full-stack software engineer based in the Pacific Northwest.
          </p>
        </div>
      </header>

      <main>
        <h2 className="mt-10 mb-3 heading" id="work">
          work
        </h2>

        <p>Some of the personal, public stuff I've built.</p>

        <br />

        {projects.nodes.map((project) => (
          <ProjectPreview key={project.id} project={project} />
        ))}

        <div className="flex items-center justify-between mt-10 mb-5">
          <Link to="/archive">
            <h2 className="heading" id="writing">
              writing
            </h2>
          </Link>
          <Link className="text-lg italic" to="/archive">
            more →
          </Link>
        </div>

        {posts.nodes.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allMarkdownRemark(
      limit: 4
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
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
      limit: 6
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        html
        frontmatter {
          title
          link
          repo
          date(formatString: "DD MMMM, YYYY")
          tags
        }
      }
    }
  }
`

export default IndexPage
