import { PropTypes } from 'prop-types'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from './Table.jsx'
import Search from './Search.jsx'
import Pagination from './Pagination.jsx'
import { mockedList, mockedColumns } from './data/mockedEmployeeList.js'
import { SortList, SearchList, ShowList, FindObjectIndexInArray } from './features.js'
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
  numberOfRowsPerPage = 10,
  showIndex = true,
}) {
  const [inputSearch, setInputSearch] = useState('')
  const [list, setList] = useState(data)
  const [isASC, setASC] = useState(true)
  const [type, setType] = useState('string')
  const [key, setKey] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(numberOfRowsPerPage)
  const maxNbOfRowsPerPage = Math.round(Math.ceil(data.length / rowsPerPage))
  const [currentPage, setCurrentPage] = useState(1)
  const [nbOfPages, setNbOfPages] = useState(maxNbOfRowsPerPage)
  const [selected, setSelected] = useState([])

  const handleSort = (el) => {
    setASC(!isASC)
    setKey(el.field)
    setType(el.type)
  }

  function handleSearch(event) {
    console.log(event)
    event.preventDefault()
    let input = event.target.elements.search.value
    setInputSearch(input.toLowerCase())
  }

  useEffect(() => {
    const searchedList = SearchList(data, inputSearch)
    const newList = ShowList(searchedList, rowsPerPage, currentPage)
    setList(newList)
  }, [inputSearch, rowsPerPage, currentPage])

  useEffect(() => {
    const sortedList = sortListFunc(data, key, isASC, type)
    setKey('')
    const newList = ShowList(sortedList, rowsPerPage, currentPage)
    setList(newList)
  }, [key, type, isASC, rowsPerPage, currentPage])

  function handleNbOfRows(el) {
    setRowsPerPage(parseInt(el))
    const nb = Math.ceil(data.length / el)
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
      let isFound = FindObjectIndexInArray(el, selected)
      if (isFound !== -1) {
        let newSelected = [...selected]
        newSelected.splice(isFound, 1)
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
      {title !== '' ? <h1 data-testid="title">{title}</h1> : null}
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
        showIndex={showIndex}
      />
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  sortListFunc: PropTypes.func,
  theme: PropTypes.string,
  getSelection: PropTypes.func,
  unableSelection: PropTypes.bool,
  unableMultipleSelection: PropTypes.bool,
  numberOfRowsPerPage: PropTypes.number,
  showIndex: PropTypes.bool,
}
