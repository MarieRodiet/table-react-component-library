import React from 'react'
import { describe, expect, test, afterEach } from 'vitest'
import List from './index.jsx'
import renderer from 'react-test-renderer'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testList, testColumns } from './data/testData'

describe('List', () => {
  afterEach(cleanup)

  test('Default props (Title, data and theme) work', () => {
    const { container } = render(<List />)
    expect(screen.getByText('TITLE'))

    expect(screen.getByText('Champ'))
    expect(screen.getByText('Julie'))
    expect(screen.getByText('7 Route de Paris'))
    expect(screen.getByText('Eugene'))

    const tableRows = container.querySelectorAll('.table-row-light')
    expect(tableRows.length).toBe(10)
    expect(document.querySelectorAll('.light').length).toBe(5)
  })

  test('Using debug', () => {
    render(<List data={testList} columns={testColumns} />)
    screen.debug()
  })

  test('List custom title and dark theme work', () => {
    const { container } = render(<List title="TEST TITLE" theme="dark" />)
    const tableRows = container.querySelectorAll('.table-row-dark')
    expect(tableRows.length).toBe(10)
    expect(screen.getByText('TEST TITLE'))
  })

  test('List columns and data props should render with pagination showing only the first 10 rows. Some pagination arrows should help navigate to the next and previous page', () => {
    const { container, getAllByTestId } = render(<List data={testList} columns={testColumns} />)
    const tableRows = container.querySelectorAll('.table-row-light')
    let arrowBtns = getAllByTestId('pagination-arrow-btn')
    expect(tableRows.length).toBe(10)
    expect(arrowBtns.length).toBe(2)
    //HEADERS
    expect(screen.getByText('Prenom'))
    expect(screen.getByText('Nom'))
    expect(screen.getByText('Date de Naissance'))
    expect(screen.getByText('Date de Debut'))
    expect(screen.getByText('Rue'))
    expect(screen.getByText('Ville'))
    expect(screen.getByText('Etat'))
    expect(screen.getByText('Code Postal'))
    expect(screen.getByText('Departement'))

    //FIRST DATA OBJECT
    expect(screen.getByText('ATEST'))
    expect(screen.getByText('XTEST'))
    expect(screen.getByText('12/29/0022'))
    expect(screen.getByText('01/09/1992'))
    expect(screen.getByText('AB Street'))
    expect(screen.getByText('AB City'))
    expect(screen.getByText('AL'))
    expect(screen.getByText('0000'))
    expect(screen.getByText('LLLL'))
  })

  test('It would match snapshot', () => {
    const component = renderer.create(<List data={testList} columns={testColumns} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Inserting the value of testList.FirstName in the search field should render the list with just one row', async () => {
    const { container } = render(<List data={testList} columns={testColumns} />)
    const searchInput = container.querySelector('#search-input')
    const searchButton = container.querySelector('#search-button')
    fireEvent.change(searchInput, { target: { value: 'ATEST' } })
    expect(searchInput.value).toBe('ATEST')
    await userEvent.click(searchButton)
    const tableRows = container.querySelectorAll('.table-row-light')
    expect(tableRows.length).toBe(1)
  })

  test('Clicking on a row should change its color and return the selected object', async () => {
    let s = []
    function showSelection(selection) {
      s = selection
    }
    const { container } = render(
      <List data={testList} columns={testColumns} getSelection={showSelection} />
    )
    const tableRows = container.querySelectorAll('.table-row-light')
    await userEvent.click(tableRows[0])
    const coloredCells = container.querySelectorAll('.selectedStyle')
    expect(coloredCells.length).toBe(9)
    expect(s[0].FirstName).toBe(testList[0].FirstName)
  })

  test('Selecting 20 in the Pagination should remove the pagination arrows and render all the data at once', async () => {
    const { container, getByTestId, getAllByTestId } = render(
      <List data={testList} columns={testColumns} />
    )
    let options = getAllByTestId('select-option')
    let select = getByTestId('nbOfRows-select')
    let arrowBtns = await getAllByTestId('pagination-arrow-btn')
    fireEvent.change(select, { target: { value: 20 } })
    const tableRows = container.querySelectorAll('.table-row-light')
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
    expect(tableRows.length).toBe(testList.length)
    expect(arrowBtns).not.toBeNull()
  })

  test('Clicking on a string header arrow should sort the columns string values', async () => {
    const { getAllByTestId } = render(<List data={testList} columns={testColumns} />)
    const sortArrows = await getAllByTestId('sort-arrow')
    fireEvent.click(sortArrows[0])
    let firstRow = getAllByTestId('cell')
    expect(firstRow[0].textContent).toBe('LTEST')
  })

  test('Clicking on a date header arrow should sort the columns date values', async () => {
    const { getAllByTestId } = render(<List data={testList} columns={testColumns} />)
    const sortArrows = await getAllByTestId('sort-arrow')
    fireEvent.click(sortArrows[3])
    let firstRow = getAllByTestId('cell')
    expect(firstRow[3].textContent).toBe('02/09/2023')
  })

  test('Clicking on a number header arrow should sort the columns number values', async () => {
    const { getAllByTestId } = render(<List data={testList} columns={testColumns} />)
    const sortArrows = await getAllByTestId('sort-arrow')
    fireEvent.click(sortArrows[7])
    let firstRow = getAllByTestId('cell')
    expect(firstRow[7].textContent).toBe('9999')
  })
})
