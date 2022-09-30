import { PropTypes } from 'prop-types'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from './Table.jsx'
import Search from './Search.jsx'
import Pagination from './Pagination.jsx'
import { mockedList, mockedColumns } from './data/mockedEmployeeList.js'
import { SortList, SearchList, ShowList, OrderData } from './Sort'
import './index.css'

export default function DataTable({
  data = mockedList,
  columns = mockedColumns,
  title = 'TITLE',
  sortListFunc = SortList,
  theme = 'light',
  getSelection,
  unableSelection = true,
  unableMultipleSelection = true,
}) {
  let columnsFields = columns.map((el) => el.field)
  const orderedData = OrderData(columnsFields, data)
  const [inputSearch, setInputSearch] = useState('')
  const [list, setList] = useState(orderedData)
  const [isASC, setASC] = useState(true)
  const [type, setType] = useState('string')
  const [key, setKey] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const maxNbOfRowsPerPage = Math.round(Math.ceil(orderedData.length / rowsPerPage))
  const [currentPage, setCurrentPage] = useState(1)
  const [nbOfPages, setNbOfPages] = useState(maxNbOfRowsPerPage)
  const [selected, setSelected] = useState([])

  const handleSort = (el) => {
    setASC(!isASC)
    setKey(el.field)
    setType(el.type)
  }

  function handleSearch(event) {
    event.preventDefault()
    let input = event.target.elements.search.value
    setInputSearch(input.toLowerCase())
  }

  useEffect(() => {
    const searchedList = SearchList(orderedData, inputSearch)
    const newList = ShowList(searchedList, rowsPerPage, currentPage)
    setList(newList)
  }, [inputSearch, rowsPerPage, currentPage])

  useEffect(() => {
    const sortedList = sortListFunc(orderedData, key, isASC, type)
    setKey('')
    const newList = ShowList(sortedList, rowsPerPage, currentPage)
    setList(newList)
  }, [key, type, isASC, rowsPerPage, currentPage])

  function handleNbOfRows(el) {
    setRowsPerPage(parseInt(el))
    const nb = Math.ceil(orderedData.length / el)
    setNbOfPages(nb)
    setCurrentPage(1)
  }

  const handleCurrentPage = (order) => {
    if (order === 'previous') {
      if (currentPage === 1) {
        setCurrentPage(maxNbOfRowsPerPage)
      } else setCurrentPage(currentPage - 1)
    } else {
      if (currentPage === maxNbOfRowsPerPage) {
        setCurrentPage(1)
      } else setCurrentPage(currentPage + 1)
    }
  }

  const updateSelection = (el) => {
    if (unableMultipleSelection) {
      let toUpdate = []
      if (selected.length > 0 && selected.includes(el)) {
        let newSelected = [...selected]
        let toBeRemoved = [...selected].indexOf(el)
        newSelected.splice(toBeRemoved, 1)
        toUpdate = newSelected
      } else {
        toUpdate = [...selected, el]
      }
      setSelected(toUpdate)
      getSelection(toUpdate)
    } else {
      let array = new Array()
      array.push(el)
      setSelected(array)
      getSelection(array)
    }
  }

  return (
    <div className={`listContainer ${theme}`}>
      <div className="listContainer-content">
        <h1 data-testid="title">{title}</h1>
        <Search handleSearch={handleSearch} theme={theme} />
        <Pagination
          handleNbOfRows={handleNbOfRows}
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          nbOfPages={nbOfPages}
          rowsPerPage={rowsPerPage}
          theme={theme}
        />
        <Table
          data={list}
          columns={columns}
          handleSort={handleSort}
          theme={theme}
          select={unableSelection ? updateSelection : () => {}}
          selectedRows={unableSelection ? selected : []}
        />
      </div>
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  sortListFunc: PropTypes.func,
  theme: PropTypes.string,
  getSelection: PropTypes.func.isRequired,
  unableSelection: PropTypes.bool,
  unableMultipleSelection: PropTypes.bool,
}
