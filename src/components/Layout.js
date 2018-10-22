import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navigation from './Navigation'
import Social from './Social'
import { StaticQuery, graphql } from 'gatsby'
import 'normalize.css'
import '../styles/global.scss'
import '../styles/typography.scss'
import style from '../styles/Layout.module.scss'

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
              content: `Brock McElroy is a web-developer working with modern JavaScript and Ruby on Rails.`,
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Navigation />
        <div className={style.content}>{children}</div>
        <div className={style.cardLayout} />
        <Social />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
