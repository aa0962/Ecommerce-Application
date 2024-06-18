import React from 'react'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import {BrowserRouter as Router } from 'react-router-dom'

const App=()=>{
  return(
    <Router>
    <div className='App'>
      <Header/>
      <Pages/>

    </div>
    </Router>
  )
}

export default App