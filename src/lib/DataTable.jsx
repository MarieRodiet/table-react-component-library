import { PropTypes } from 'prop-types'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from './Table'
import Search from './Search'
import Pagination from './Pagination'
import { SortList, SearchList, ShowList } from './Sort'

export default function DataTable({ data, columns, title, sortListFunc = SortList }) {
  const [inputSearch, setInputSearch] = useState('')
  const [list, setList] = useState(data)
  const [isASC, setASC] = useState(true)
  const [key, setKey] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const maxNbOfRowsPerPage = Math.round(Math.ceil(data.length / rowsPerPage))
  const [currentPage, setCurrentPage] = useState(1)
  const [nbOfPages, setNbOfPages] = useState(maxNbOfRowsPerPage)

  const handleSort = (header) => {
    setASC(!isASC)
    setKey(header)
  }

  function handleSearch(event) {
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
    const sortedList = sortListFunc(data, key, isASC)
    setKey('')
    const newList = ShowList(sortedList, rowsPerPage, currentPage)
    setList(newList)
  }, [key, isASC, rowsPerPage, currentPage])

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

  return (
    <>
      <h1>{title}</h1>
      <Search handleSearch={handleSearch} />
      <Pagination
        handleNbOfRows={handleNbOfRows}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
        nbOfPages={nbOfPages}
        rowsPerPage={rowsPerPage}
      />
      <Table data={list} columns={columns} handleSort={handleSort} />
    </>
  )
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  sortListFunc: PropTypes.func,
}