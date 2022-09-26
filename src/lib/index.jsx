import React from 'react'
import { PropTypes } from 'prop-types'
import DataTable from './DataTable'

export default function List({ data, columns, title, theme, sortListFunc, getSelectedRows }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      title={title}
      theme={theme}
      sortListFunc={sortListFunc}
      getSelectedRows={getSelectedRows}
    />
  )
}

List.propTypes = {
  greetee: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  theme: PropTypes.string,
  sortListFunc: PropTypes.func,
  getSelectedRows: PropTypes.func,
}
