import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import BookDataContext from './bookDataContext'
import BookDataReducer from './bookDataReducer'
import {
  FETCH_BOOKS,
  IS_LOADING,
  FILTER_BOOKS,
  ADD_BOOKS,
  SORT_BOOKS,
  FETCH_AUTHORS
} from '../actionTypes'

const BookDataProvider = props => {
  const initialState = {
    books: [],
    sortTitle: null,
    sortPages: null,
    authors: [],
    filter: '',
    isLoading: false
  }

  const [state, dispatch] = useReducer(BookDataReducer, initialState)

  useEffect(() => {
    fetchAuthors()
    fetchBooks()
    return () => {}
    // eslint-disable-next-line
  }, [])

  console.log(state)

  const fetchBooks = async () => {
    initLoading()

    const res = await axios.get(`/books`)

    dispatch({
      type: FETCH_BOOKS,
      payload: {
        books: res.data
      }
    })
  }

  const fetchAuthors = async () => {
    initLoading()

    const res = await axios.get(`/authors`)

    dispatch({
      type: FETCH_AUTHORS,
      payload: {
        authors: res.data
      }
    })
  }

  const compare = (a, b) => {
    if (a > b) return 1
    if (b > a) return -1

    return 0
  }

  const sortBooksByTitle = sort => {
    dispatch({
      type: SORT_BOOKS,
      payload: {
        ...state,
        sortTitle: sort,
        sortPages: 'desc',
        books:
          sort === 'asc'
            ? state.books.sort((a, b) => compare(a.title, b.title))
            : state.books.sort((a, b) => compare(b.title, a.title))
      }
    })
  }

  const sortBooksByPages = sort => {
    dispatch({
      type: SORT_BOOKS,
      payload: {
        ...state,
        sortPages: sort,
        sortTitle: 'desc',
        books:
          sort === 'asc'
            ? state.books.sort((a, b) => a.pages - b.pages)
            : state.books.sort((a, b) => b.pages - a.pages)
      }
    })
  }

  const filterBooks = filter => {
    dispatch({
      type: FILTER_BOOKS,
      payload: {
        filter
      }
    })
  }

  const addBooks = async book => {
    initLoading()

    const res = await axios.post('/books', book)

    dispatch({
      type: ADD_BOOKS,
      payload: {
        books: res.data
      }
    })
  }

  const initLoading = () => dispatch({ type: IS_LOADING })

  return (
    <BookDataContext.Provider
      value={{
        books: state.books,
        sortTitle: state.sortTitle,
        sortPages: state.sortPages,
        filter: state.filter,
        authors: state.authors,
        isLoading: state.isLoading,
        fetchBooks,
        sortBooksByTitle,
        sortBooksByPages,
        filterBooks,
        addBooks
      }}
    >
      {props.children}
    </BookDataContext.Provider>
  )
}

export default BookDataProvider
