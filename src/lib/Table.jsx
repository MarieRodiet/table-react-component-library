import React from 'react'
import { PropTypes } from 'prop-types'
import Row from './Row'
import { OrderData, FindObjectIndexInArray } from './features.js'

export default function Table({
  data,
  columns,
  handleSort,
  theme,
  select,
  selectedRows,
  showIndex,
}) {
  let columnsFields = columns.map((el) => el.field)
  const orderedData = OrderData(columnsFields, data)

  return (
    <table className="table">
      <thead className="table-header">
        <tr className={`table-header-row-${theme}`}>
          {showIndex ? <th style={{ minWidth: `20px` }}>index</th> : null}
          {columns.map((el) => (
            <th key={el.field} style={{ minWidth: `${el.width}px` }}>
              {el.header}
              {el.sortable ? (
                <svg
                  key={el.type + ' ' + el.header}
                  data-testid="sort-arrow"
                  className={`sort-svg-${theme}`}
                  onClick={() => handleSort(el)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M145.6 7.7C141 2.8 134.7 0 128 0s-13 2.8-17.6 7.7l-104 112c-6.5 7-8.2 17.2-4.4 25.9S14.5 160 24 160H80V352H24c-9.5 0-18.2 5.7-22 14.4s-2.1 18.9 4.4 25.9l104 112c4.5 4.9 10.9 7.7 17.6 7.7s13-2.8 17.6-7.7l104-112c6.5-7 8.2-17.2 4.4-25.9s-12.5-14.4-22-14.4H176V160h56c9.5 0 18.2-5.7 22-14.4s2.1-18.9-4.4-25.9l-104-112z" />
                </svg>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orderedData.map((el, i) => {
          let isSelected = false
          let index = FindObjectIndexInArray(el, selectedRows)
          index != -1 ? (isSelected = true) : false
          return (
            <Row
              key={el.FirstName}
              el={el}
              isSelected={isSelected}
              theme={theme}
              select={select}
              showIndex={showIndex ? i.toString() : ''}
            />
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  handleSort: PropTypes.func,
  theme: PropTypes.string,
  select: PropTypes.func,
  selectedRows: PropTypes.array,
  showIndex: PropTypes.bool,
}
