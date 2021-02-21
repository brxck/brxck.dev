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
      <div className="flex flex-col xl:items-center">
        <h1
          className="z-10 italic font-black tracking-wider text-center text-indigo-600 text-7xl md:text-8xl"
          style={{ marginBottom: '-2.5rem' }}
        >
          <div className="mt-5 -mb-3">Brock</div>{' '}
          <div>
            M
            <span className="relative pb-8" style={{ top: '-0.18em' }}>
              c
            </span>
            Elroy
          </div>
        </h1>
        <div className="transform bg-indigo-700 rounded-mega rotate-8 translate-y-36">
          <div className="transform border-indigo-900 border-3 rounded-mega -rotate-0.5 -translate-y-4">
            <div className="transform rotate-0.5">
              <div className="max-w-4xl transform -translate-y-32 bg-white rounded-mega -rotate-8">
                <div className="transform bg-blue-100 rounded-mega rotate-0.5">
                  <nav className="absolute z-10 text-2xl italic font-black tracking-wide text-indigo-600 underline top-5 -right-28">
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
                  <nav className="absolute z-10 text-2xl italic font-black tracking-wide text-blue-100 underline top-52 -right-36">
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
                  <div className="p-16 transform border-indigo-900 border-3 rounded-mega -rotate-0.5 translate-y-2">
                    <div className="text-lg transform -translate-y-2 -rotate-05">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
