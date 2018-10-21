import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Layout from '../components/Layout'
import style from '../styles/page.module.scss'

const NotFoundPage = ({ data }) => (
  <Layout>
    <Link to="/">
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt="hero"
        className={style.hero}
        critical
      />
    </Link>
    <div className={style.text}>
      <h1 className={style.section}>404 Not Found</h1>
      <p>
        Sorry pal I couldn't find that one, want me to give you a lift back to
        the <Link to="/">homepage?</Link>
      </p>
    </div>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "car.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 740, quality: 85) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`

export default NotFoundPage
