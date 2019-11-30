import React, { useState, useContext } from 'react'
import BookDataContext from '../../providers/bookData/bookDataContext'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'

const AddBook = () => {
  const [book, setBook] = useState({
    id: uuid,
    title: '',
    author: '',
    pages: 0,
    published: 1900,
    quantity: 0,
    cover: 'img'
  })

  const bookDataContext = useContext(BookDataContext)

  const { addBooks } = bookDataContext
  return (
    <div>
      <Header />
      <Link
        to="/"
        className="btn-floating btn-large waves-effect waves-light white"
        style={{ position: 'absolute', top: 80, left: 20 }}
      >
        <i className="material-icons" style={{ color: '#6495ED' }}>
          arrow_back
        </i>
      </Link>
      <div className="container" style={{ marginTop: 40 }}>
        <form onSubmit={() => addBooks(book)}>
          <input
            className="w-100"
            placeholder="Title of the book"
            value={book.title}
            onChange={e => setBook({ ...book, title: e.target.value })}
          />
          <input
            className="w-100"
            placeholder="Name of the author"
            value={book.author}
            onChange={e => setBook({ ...book, author: e.target.value })}
          />
          <input
            type="number"
            min={1900}
            value={book.published}
            onChange={e => setBook({ ...book, published: e.target.value })}
          />
          <input
            type="number"
            min={0}
            value={book.pages}
            onChange={e => setBook({ ...book, pages: e.target.value })}
          />
          <input
            type="number"
            min={0}
            value={book.quantity}
            onChange={e => setBook({ ...book, quantity: e.target.value })}
          />
          <button className="btn waves-effect waves-light" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBook
