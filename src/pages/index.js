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
        <h1 className="mb-3 text-4xl italic font-black tracking-wide text-indigo-500 dark:text-green-500">
          Hi, I'm Brock.
        </h1>
        <div className="prose dark:prose-dark">
          <p>
            I'm a full stack developer creating applications that make the
            University of Arizona a better place to learn and work.
          </p>
          <p>
            A a arcu taciti diam vitae suspendisse hendrerit ut sit sociis ut
            nunc elementum integer mi blandit hendrerit lorem.Vulputate vitae
            suspendisse a cubilia massa suscipit molestie himenaeos nascetur
            integer ac posuere per porta a dignissim consequat parturient
            tincidunt hac nam.Eget convallis a nibh fames dui fringilla
            consectetur magnis a.
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
        <div
          className="relative flex gap-4 -left-1/3"
          style={{ width: '166%' }}
        >
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
        <div
          className="relative flex flex-wrap justify-center gap-4 mt-5 -left-1/3"
          style={{ width: '166%' }}
        >
          {projects.nodes.map((project) => (
            <div key={project.frontmatter.title} style={{ maxWidth: '32%' }}>
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
