import React from 'react'
import DataTable from './DataTable'
import { mockedList, columns } from './data/mockedEmployeeList.js'

export default function List() {
  return <DataTable data={mockedList} columns={columns} title="Employees" />
}
