import React from 'react'
import List from './lib'

const App = () => {
  const getSelection = (el) => {
    console.table(el)
  }
  return <List title="Employees" getSelection={getSelection} unableMultipleSelection={true} />
}

export default App
