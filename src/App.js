import React, { useEffect } from 'react'
import BookDataProvider from './providers/bookData/bookDataProvider'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Pages/Home'
import AddBook from './components/Pages/AddBook'
import NotFound from './components/Pages/NotFound'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/css/material-icons.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit()
  })
  return (
    <BookDataProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddBook} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </BookDataProvider>
  )
}

export default App
