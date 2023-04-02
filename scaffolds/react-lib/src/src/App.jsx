import React from 'react'
import Hello from '../lib/Hello.jsx'
import badgerLogo from '/badger.svg'

function App() {
  return (
    <div className="app">
      <img src={badgerLogo} className="logo" alt="Badger logo" />
      <Hello/>
      <h3>{{dist}}</h3>
    </div>
  )
}

export default App
