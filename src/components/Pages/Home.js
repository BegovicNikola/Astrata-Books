import React, { useContext } from 'react'
import BookDataContext from '../../providers/bookData/bookDataContext'
import { Link } from 'react-router-dom'
import Header from '../Layout/Header'
import Preloader from '../Layout/Preloader'
import Books from '../Books/Books'

const Home = () => {
  const bookDataContext = useContext(BookDataContext)

  const { isLoading } = bookDataContext
  return (
    <div>
      <Header />
      <Link
        to="/add"
        className="btn-floating btn-large waves-effect waves-light white"
        style={{ position: 'absolute', top: 80, left: 20 }}
      >
        <i className="material-icons" style={{ color: '#6495ED' }}>
          add
        </i>
      </Link>
      {isLoading ? <Preloader /> : <Books />}
    </div>
  )
}

export default Home
