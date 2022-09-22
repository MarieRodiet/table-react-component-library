import { PropTypes } from 'prop-types'
import React from 'react'
import { ReactComponent as ArrowSvg } from './assets/arrow-up-solid.svg'

export default function Pagination({
  handleCurrentPage,
  currentPage,
  handleNbOfRows,
  nbOfPages,
  rowsPerPage,
  theme,
}) {
  return (
    <div className="table-container-pagination">
      <form className="table-container-pagination-select">
        <label className={theme} htmlFor="nbOfRows">
          Rows per page :
        </label>
        <select
          defaultValue={rowsPerPage}
          id="nbOfRows-list"
          onChange={(e) => handleNbOfRows(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </form>
      {nbOfPages > 1 ? (
        <div className={`table-container-pagination-btnContainer ${theme}`}>
          <button
            className="table-container-pagination-btnContainer-btn"
            onClick={() => handleCurrentPage('previous')}
          >
            <ArrowSvg className="arrow-previous" />
          </button>
          <div className="table-container-pagination-btnContainer-currentPage">{currentPage}</div>
          <button
            className="table-container-pagination-btnContainer-btn"
            onClick={() => handleCurrentPage('next')}
          >
            <ArrowSvg className="arrow-next" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

Pagination.propTypes = {
  handleCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  handleNbOfRows: PropTypes.func,
  nbOfPages: PropTypes.number,
  rowsPerPage: PropTypes.number,
  theme: PropTypes.string,
}
