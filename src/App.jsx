import React from 'react'
import List from './lib'

const App = () => {
  function showMeSelectedRows(el) {
    console.log(el)
  }
  return <List title="Employees" getSelectedRows={showMeSelectedRows} />
}

export default App
