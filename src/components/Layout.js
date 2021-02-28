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

      <aside className="absolute bottom-0 w-full max-w-3xl mb-3 transform -translate-x-1/2 top-44 left-1/2">
        {/* Background shapes! */}
        <div
          className="absolute w-full origin-top-left transform translate-y-24 bg-indigo-700 dark:bg-green-700 h-2/3 -right-64 rounded-mega rotate-12"
          style={{ maxHeight: 1300 }}
        >
          <div className="h-full transform border-indigo-900 dark:border-green-400 origin-top-left rounded-mega rotate-0.5 border-3 translate-x-3"></div>
        </div>
        <div className="absolute w-full h-full bg-white dark:bg-gray-900 rounded-mega">
          <div className="h-full origin-top transform translate-x-3 -translate-y-2 border-indigo-400 dark:border-green-900 border-3 rounded-mega"></div>
        </div>

        <nav className="absolute text-2xl italic font-black leading-snug tracking-wide text-indigo-500 underline dark:text-green-500 top-12 -right-52 w-44">
          <ul>
            {Object.entries(social.siteMetadata).map(([name, link]) => (
              <li key={name}>
                <a href={link}>{name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="absolute text-2xl italic font-black leading-snug tracking-wide text-indigo-100 underline top-64 -right-52 w-44 dark:text-green-100">
          <ul>
            <li>
              <Link to="/#home">home</Link>
            </li>
            <li>
              <Link to="/#writing">writing</Link>
            </li>
            <li>
              <Link to="/#work">work</Link>
            </li>
            <li>
              <Link to="/#contact">contact</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col h-full lg:items-center">
        <h1
          className="z-10 pl-10 italic font-black tracking-wider text-center text-indigo-500 dark:text-green-500 text-8xl"
          style={{ marginBottom: '-2.5rem' }}
        >
          <div className="mt-5 -mb-3">Brock</div> <div>McElroy</div>
        </h1>

        <div className="h-full max-w-3xl" style={{ minHeight: '74vh' }}>
          <main className="relative p-16 text-gray-900 left-2 dark:text-gray-50">
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
