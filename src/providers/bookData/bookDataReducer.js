import {
  FETCH_BOOKS,
  SORT_BOOKS,
  FILTER_BOOKS,
  ADD_BOOKS,
  IS_LOADING
} from '../actionTypes'

export default (state, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.payload.books,
        sortTitle: action.payload.sortTitle,
        sortPages: action.payload.sortPages,
        filter: action.payload.filter,
        isLoading: false
      }
    case SORT_BOOKS:
      return {
        ...state,
        sortTitle: action.payload.sortTitle,
        sortPages: action.payload.sortPages
      }
    case FILTER_BOOKS:
      return {
        ...state,
        filter: action.payload.filter
      }
    case ADD_BOOKS:
      return {
        ...state,
        books: [action.payload, ...state.books]
      }
    case IS_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
