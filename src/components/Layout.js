import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Navigation from './Navigation'
import Social from './Social'
import { StaticQuery, graphql } from 'gatsby'
import 'normalize.css'
import '../styles/typography.scss'

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: `Brock McElroy is a full stack web developer finding robust, accessible solutions.`,
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Container>
          <Navigation />
          {children}
          <Social />
        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
