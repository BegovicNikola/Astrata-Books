import React from 'react'

const Header = () => {
  const path = window.location.href.split('/')
  const curr = path[3]

  return (
    <nav className="blue" style={{ height: 'auto' }}>
      <div className="container">
        <h1 style={{ margin: 0, paddingTop: 40, textTransform: 'capitalize' }}>
          {`${curr} `}Books
        </h1>
      </div>
    </nav>
  )
}

export default Header
