import React from 'react'
import { PropTypes } from 'prop-types'

export default function Search({ handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="search">
      <label htmlFor="search">Search</label>
      <input name="search" id="search" />
      <button>Search</button>
    </form>
  )
}

Search.propTypes = {
  handleSearch: PropTypes.func,
}
