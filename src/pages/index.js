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
        <h2 className="mb-3 text-4xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500">
          Hi, I'm Brock.
        </h2>
        <div className="prose dark:prose-dark">
          <p>
            I'm a full stack developer creating applications that make the
            University of Arizona a better place to learn and work.
          </p>
          <p>
            When I'm not coding, I prefer to be in a hammock or planning a
            backpacking trip into the wilderness.
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
            Himenaeos in fusce a lacus nibh parturient phasellus facilisi erat
            curae morbi cum habitant feugiat a aptent habitant.Duis vulputate
            mus a molestie diam parturient a euismod dapibus tempor ultrices
            lacus a fusce scelerisque sapien.Nulla aliquet a vestibulum aliquet
            vivamus ipsum a a suspendisse a velit consectetur dictum primis nunc
            cursus porta.Cursus morbi platea a dignissim scelerisque lacinia.
          </p>
        </div>
      </header>
      <main>
        <h3
          className="mt-3 mb-2 text-3xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
          id="writing"
        >
          writing
        </h3>
        {posts.nodes.map((post) => (
          <PostPreview key={post.fields.slug} post={post} />
        ))}
        <Link to="/archive">archive →</Link>

        <h3
          className="mt-3 mb-2 text-3xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
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
          className="mt-3 mb-2 text-3xl italic font-black leading-snug tracking-wide text-indigo-500 dark:text-green-500"
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
