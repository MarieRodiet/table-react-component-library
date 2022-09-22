import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, test, afterEach } from 'vitest'
import Datatable from './index'
import { mockedList, columns } from './data/mockedEmployeeList.js'

describe('Integration test', () => {
  afterEach(cleanup)

  test('Minimal render display expected text', () => {
    render(<Datatable data={mockedList} columns={columns} title="Employees" />)
    expect(screen.getByText('Rows per page :'))
  })

  test('Expected greetee is displayed', () => {
    render(<Datatable data={mockedList} columns={columns} title="Employees" />)
    expect(screen.getByText("'Employees'"))
  })
})
