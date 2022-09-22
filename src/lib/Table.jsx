import React from 'react'
import { PropTypes } from 'prop-types'
import { ReactComponent as ArrowSvg } from './assets/up-down-solid.svg'

export default function Table({ data, columns, handleSort, theme }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr className={`table-header-row-${theme}`}>
            {columns.map((el) => (
              <th key={el}>
                {el}
                <ArrowSvg className={`sort-svg-${theme}`} onClick={() => handleSort(el)} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr key={el.FirstName} className={`table-row-${theme}`}>
                {Object.keys(el).map((key, value) => {
                  return <td key={el[key] + el[value]}>{el[key]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  handleSort: PropTypes.func,
  theme: PropTypes.string,
}
