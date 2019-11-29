import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import BookDataContext from './bookDataContext'
import BookDataReducer from './bookDataReducer'
import {
  FETCH_BOOKS,
  IS_LOADING,
  FILTER_BOOKS,
  ADD_BOOKS,
  SORT_BOOKS
} from '../actionTypes'

const BookDataProvider = props => {
  const initialState = {
    books: [],
    sortTitle: null,
    sortPages: null,
    filter: null,
    isLoading: false
  }

  const [state, dispatch] = useReducer(BookDataReducer, initialState)

  useEffect(() => {
    fetchBooks()
    return () => {}
    // eslint-disable-next-line
  }, [])

  console.log(state)

  const fetchBooks = async (sort = null, filter = null) => {
    initLoading()

    const res = await axios.get(`/books`)

    dispatch({
      type: FETCH_BOOKS,
      payload: {
        books: res.data,
        sortTitle: sort,
        sortPages: sort,
        filter: filter
      }
    })
  }

  const sortBooksByTitle = sort => {
    dispatch({
      type: SORT_BOOKS,
      payload: {
        ...state,
        sortTitle: sort,
        sortPages: 'desc',
        // Yet to find an optimal solution
        books: state.books.sort((a, b) => a.title[0] - b.title[0])
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
        filter: filter
      }
    })
  }

  const addBooks = book => {
    const res = axios.post('/books', book)

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
