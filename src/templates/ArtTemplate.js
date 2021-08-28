import React from 'react'
import Helmet from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Tags from '../components/Tags'

const ArtTemplate = ({ data }) => {
  const { excerpt, html } = data.markdownRemark
  const { image, title, tags, date } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <Helmet
        title={`${title} | Brock McElroy`}
        meta={[
          {
            name: 'description',
            content: excerpt,
          },
        ]}
      />
      <article className="prose dark:prose-dark">
        <h1>{title}</h1>
        <div className="-mt-5">{date}</div>
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt={title}
          className="my-10 -mx-3 border"
        />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <Tags tags={tags}></Tags>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: TRACED_SVG
              layout: CONSTRAINED
              width: 700
              tracedSVGOptions: { color: "#6366f1" }
            )
          }
        }
      }
    }
  }
`

export default ArtTemplate
