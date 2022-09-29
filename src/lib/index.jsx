import React from 'react'
import { PropTypes } from 'prop-types'
import DataTable from './DataTable'

export default function List({
  data,
  columns,
  title,
  theme,
  sortListFunc,
  unableSelection,
  getSelection,
  unableMultipleSelection,
}) {
  return (
    <DataTable
      data={data}
      columns={columns}
      title={title}
      theme={theme}
      sortListFunc={sortListFunc}
      getSelection={getSelection}
      unableSelection={unableSelection}
      unableMultipleSelection={unableMultipleSelection}
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
  getSelection: PropTypes.func,
  unableSelection: PropTypes.bool,
  unableMultipleSelection: PropTypes.bool,
}
