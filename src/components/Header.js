import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ marginTop: '1rem' }}>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </div>
)

export default Header
