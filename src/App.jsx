import React from 'react'
import List from './lib'

const App = () => {
  function showSelection(el) {
    console.table(el)
  }
  return <List title="Employees" getSelection={showSelection} theme="light" />
}

export default App
