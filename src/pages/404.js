import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div>
      <h1>404 Not Found</h1>
      <p>
        Sorry pal I couldn't find that one, want me to give you a lift back to
        the <Link to="/">homepage?</Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
