import { PropTypes } from 'prop-types'
import React from 'react'
export default function Pagination({
  handleCurrentPage,
  currentPage,
  handleNbOfRows,
  nbOfPages,
  theme,
}) {
  let options = ['10', '20', '30', '50', '100']
  return (
    <div className="table-container-pagination">
      <form className="table-container-pagination-select">
        <label className={theme} htmlFor="nbOfRows">
          Rows per page :
        </label>
        <select
          data-testid="nbOfRows-select"
          id="nbOfRows-list"
          onChange={(e) => handleNbOfRows(e.target.value)}
        >
          {options.map((o) => (
            <option data-testid="select-option" key={o}>
              {o}
            </option>
          ))}
        </select>
      </form>
      {nbOfPages > 1 ? (
        <div className={`table-container-pagination-btnContainer ${theme}`}>
          <button
            aria-label="previous button"
            data-testid="pagination-arrow-btn"
            className="table-container-pagination-btnContainer-btn"
            onClick={() => handleCurrentPage('previous')}
          >
            <svg
              className="arrow-previous"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
          <div className="table-container-pagination-btnContainer-currentPage">{currentPage}</div>
          <button
            aria-label="next button"
            data-testid="pagination-arrow-btn"
            className="table-container-pagination-btnContainer-btn"
            onClick={() => handleCurrentPage('next')}
          >
            <svg className="arrow-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
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
  theme: PropTypes.string,
}
