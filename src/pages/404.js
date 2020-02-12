import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Layout from '../components/Layout'
import image from '../images/404.jpg'

const NotFoundPage = () => (
  <Layout>
    <div>
      <img src={image} alt="404" />
    </div>
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
