import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql, Link } from 'gatsby'

import DarkToggle from './DarkToggle'

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

      <div className="absolute bottom-0 w-full max-w-3xl mb-10 -mt-1 transform -translate-x-1/2 top-32 left-1/2">
        {/* Background shapes! */}
        <div
          className="absolute hidden w-full origin-top-left transform translate-y-24 bg-indigo-700 lg:block dark:bg-green-700 h-2/3 -right-64 rounded-mega rotate-12"
          style={{ maxHeight: 1300 }}
        >
          <div className="h-full transform border-indigo-900 dark:border-green-400 origin-top-left rounded-mega rotate-0.5 border-3 translate-x-3"></div>
        </div>
        <div className="absolute w-full h-full bg-white dark:bg-gray-900 sm:rounded-mega">
          <div className="h-full origin-top transform -translate-y-2 border-indigo-300 border-b-3 sm:translate-x-3 border-t-3 dark:border-green-800 sm:border-3 sm:rounded-mega"></div>
        </div>

        <aside className="hidden lg:block">
          <nav className="absolute text-2xl italic font-black leading-snug tracking-wide text-indigo-500 underline dark:text-green-500 top-10 -right-52 w-44">
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/#work">work</Link>
              </li>
              <li>
                <Link to="/#writing">writing</Link>
              </li>
              <li>
                <Link to="/#contact">contact</Link>
              </li>
            </ul>
          </nav>
          <nav className="absolute text-2xl italic font-black leading-snug tracking-wide top-64 -right-52 w-44">
            <ul>
              {Object.entries(social.siteMetadata).map(([name, link]) => (
                <li key={name}>
                  <a
                    className="text-indigo-100 underline dark:text-green-100"
                    href={link}
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* <li>
                <Link
                  className="text-indigo-100 underline dark:text-green-100"
                  to="/artwork"
                >
                  artwork
                </Link>
              </li> */}
            </ul>
          </nav>
        </aside>
      </div>

      <div className="flex flex-col h-full mb-10 sm:items-center">
        <h1 className="z-10 mt-5 text-6xl italic font-black tracking-wider text-center">
          <Link
            className="text-indigo-500 shadow-xl hover:no-underline dark:text-green-500"
            to="/"
          >
            <div className="-mb-2">Brock</div>
            <div>McElroy</div>
          </Link>
        </h1>

        <div className="absolute z-10 transform translate-x-48 right-1/2 top-10">
          <DarkToggle />
        </div>

        <div className="h-full max-w-3xl" style={{ minHeight: '74vh' }}>
          <main className="relative p-8 text-gray-900 md:p-16 md:pt-12 sm:left-2 dark:text-gray-50">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
