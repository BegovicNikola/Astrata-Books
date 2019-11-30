import React, { useContext } from 'react'
import BookDataContext from '../../providers/bookData/bookDataContext'

import './Books.css'

const Books = () => {
  const bookDataContext = useContext(BookDataContext)

  const {
    books,
    filter,
    sortTitle,
    sortPages,
    sortBooksByTitle,
    sortBooksByPages
  } = bookDataContext
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="headings">
              <p>Title</p>
              {sortTitle === 'asc' ? (
                <span onClick={() => sortBooksByTitle('desc')}>
                  <i className="material-icons right">arrow_downward</i>
                </span>
              ) : (
                <span onClick={() => sortBooksByTitle('asc')}>
                  <i className="material-icons right">arrow_upward</i>
                </span>
              )}
            </th>
            <th>Author</th>
            <th>Year</th>
            <th className="headings">
              <p>Pages</p>
              {sortPages === 'asc' ? (
                <span onClick={() => sortBooksByPages('desc')}>
                  <i className="material-icons right">arrow_downward</i>
                </span>
              ) : (
                <span onClick={() => sortBooksByPages('asc')}>
                  <i className="material-icons right">arrow_upward</i>
                </span>
              )}
            </th>
            <th>Quantity</th>
          </tr>
        </thead>
        {books ? (
          <tbody>
            {books &&
              books.map(book =>
                book.author === filter || filter === '' ? (
                  <tr key={book.id} className="collection-item">
                    <td>img</td>
                    {/* Property is called "cover" */}
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.published}</td>
                    <td>{book.pages}</td>
                    <td>{book.quantity}</td>
                  </tr>
                ) : null
              )}
          </tbody>
        ) : (
          <tbody>
            <tr>No books</tr>
          </tbody>
        )}
      </table>
    </div>
  )
}

export default Books
