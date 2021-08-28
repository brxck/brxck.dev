import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Card from '../components/Card'

const Artwork = ({ data }) => {
  const arts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <header>
        <h1 className="mb-5 heading">Artwork</h1>
        <div className="mb-5 prose dark:prose-dark">
          <p>I started painting with watercolors in May 2021.</p>
        </div>
      </header>
      <main style={{ columnCount: 2 }} className="-mx-5">
        {arts.map(({ node }) => (
          <Card
            className="mb-5"
            key={node.fields.slug}
            {...node.frontmatter}
            link={node.fields.slug}
          >
            <span className="text-xs">{node.frontmatter.date}</span>
          </Card>
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/arts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: TRACED_SVG
                  layout: CONSTRAINED
                  width: 640
                  tracedSVGOptions: { color: "#6366f1" }
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Artwork
