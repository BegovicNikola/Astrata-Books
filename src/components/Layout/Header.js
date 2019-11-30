import React, { useContext } from 'react'
import BookDataContext from '../../providers/bookData/bookDataContext'

const Header = () => {
  const path = window.location.href.split('/')
  const curr = path[3]

  const bookDataContext = useContext(BookDataContext)

  const { authors, filterBooks } = bookDataContext

  return (
    <nav className="blue" style={{ height: 'auto' }}>
      <div className="container row" style={{ display: 'flex' }}>
        <h1
          className="col s6"
          style={{ margin: 0, paddingTop: 40, textTransform: 'capitalize' }}
        >
          {`${curr} `}Books
        </h1>
        <div className="input-field text-white col s6">
          <select
            className="browser-default right"
            onChange={e => filterBooks(e.target.value)}
          >
            <option value={null}></option>

            {authors &&
              authors.map(author => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </nav>
  )
}

export default Header
