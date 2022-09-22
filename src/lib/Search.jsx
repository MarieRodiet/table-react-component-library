import React from 'react'
import { PropTypes } from 'prop-types'

export default function Search({ handleSearch, theme }) {
  return (
    <form onSubmit={handleSearch} className="search">
      <label htmlFor="search">Search</label>
      <input className={theme} name="search" id="search" />
      <button className={theme}>Search</button>
    </form>
  )
}

Search.propTypes = {
  handleSearch: PropTypes.func,
  theme: PropTypes.string,
}
