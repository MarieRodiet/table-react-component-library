import React from 'react'
import DataTable from './DataTable'
import { mockedList, columns } from './data/mockedEmployeeList.js'

export default function List() {
  return (
    <div className="listContainer">
      <div className="listContainer-content">
        <DataTable data={mockedList} columns={columns} title="Employees" />
      </div>
    </div>
  )
}
