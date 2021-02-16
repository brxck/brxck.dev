import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import 'normalize.css'

import Navigation from './Navigation'
import Social from './Social'
import 'inter-ui/inter.css'
import '../styles/typography.css'
import '../styles/prism.css'

const Layout = ({ children }) => {
  const { site, social } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      social: site {
        siteMetadata {
          github
          twitter
          instagram
          linkedin
        }
      }
    }
  `)
  return (
    <>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
        <html lang="en" />
      </Helmet>
      <Navigation />
      <div>
        <div>{children}</div>
        <div />
      </div>
      <Social links={social.siteMetadata} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
