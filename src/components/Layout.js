import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql, Link } from 'gatsby'

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
      <div className="flex flex-col h-full lg:items-center">
        <h1
          className="z-10 pl-10 italic font-black tracking-wider text-center text-indigo-500 text-7xl md:text-8xl"
          style={{ marginBottom: '-2.5rem' }}
        >
          <div className="mt-5 -mb-3">Brock</div>{' '}
          <div>
            M
            <span
              className="relative pb-8 tracking-tight"
              style={{ top: '-0.18em' }}
            >
              c
            </span>
            Elroy
          </div>
        </h1>
        <div
          className="relative h-full max-w-3xl"
          style={{ minHeight: '74vh' }}
        >
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <div className="h-full transform bg-indigo-700 rounded-mega rotate-8 translate-y-36">
              <div className="transform border-indigo-900 border-3 rounded-mega -rotate-0.5 -translate-y-4 h-full">
                <div className="transform rotate-0.5 h-full">
                  <div className="h-full transform -translate-y-32 rounded-mega -rotate-8">
                    <div className="transform bg-white dark:bg-gray-900 rounded-mega rotate-0.5 h-full">
                      <nav className="absolute z-10 text-2xl italic font-black leading-snug tracking-wide text-indigo-500 underline top-4 -right-48 w-44">
                        <ul>
                          {Object.entries(social.siteMetadata).map(
                            ([name, link]) => (
                              <li key={name}>
                                <a href={link}>{name}</a>
                              </li>
                            )
                          )}
                        </ul>
                      </nav>
                      <nav className="absolute z-10 text-2xl italic font-black leading-snug tracking-wide text-indigo-100 underline top-52 -right-48 w-44">
                        <ul>
                          <li>
                            <Link to="/#home">home</Link>
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
                      <div className="p-16 transform border-indigo-900 border-3 rounded-mega -rotate-0.5 translate-y-2 h-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-16 text-gray-900 -translate-y-2 left-5 dark:text-gray-50">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
