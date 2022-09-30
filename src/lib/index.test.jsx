import React from 'react'
import { describe, expect, test, afterEach } from 'vitest'
import List from './index.jsx'
import renderer from 'react-test-renderer'
import { render, screen, cleanup } from '@testing-library/react'
import { testList, testColumns } from './data/testData'

describe('List', () => {
  afterEach(cleanup)

  test('List title default prop works', () => {
    render(<List />)
    expect(screen.getByText('TITLE'))
  })

  test('List custom title works', () => {
    render(<List title="TEST TITLE" />)
    expect(screen.getByText('TEST TITLE'))
  })

  test('List columns and data props should work', () => {
    render(<List data={testList} columns={testColumns} />)
    //COLUMNS
    expect(screen.getByText('Firstname'))
    expect(screen.getByText('Lastname'))
    expect(screen.getByText('Birthdate'))
    expect(screen.getByText('Start Date'))
    expect(screen.getByText('Street'))
    expect(screen.getByText('City'))
    expect(screen.getByText('State'))
    expect(screen.getByText('Zipcode'))
    expect(screen.getByText('Department'))

    //FIRST DATA OBJECT
    expect(screen.getByText('ATEST'))
    expect(screen.getByText('ZTEST'))
    expect(screen.getByText('12/29/0022'))
    expect(screen.getByText('01/09/1992'))
    expect(screen.getByText('AB'))
    expect(screen.getByText('IJ'))
    expect(screen.getByText('OP'))
    expect(screen.getByText('0000'))
    expect(screen.getByText('AAAA'))
  })

  test('All custom data should be rendered ', async () => {
    const { container } = render(<List data={testList} columns={testColumns} />)
    const tableRows = container.querySelectorAll('.table-row-light')
    expect(tableRows.length).toBe(testList.length)
  })

  test('It would match snapshot', () => {
    const component = renderer.create(<List data={testList} columns={testColumns} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Default theme should be light', () => {
    render(<List data={testList} columns={testColumns} />)
    expect(document.querySelectorAll('.light').length).toBe(4)
  })
})
