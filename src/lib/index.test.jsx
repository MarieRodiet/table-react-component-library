import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test } from 'vitest'
import Datatable from './index'
import { mockedList, columns } from './data/mockedEmployeeList.js'

describe('Datatable', () => {
  test('Datatable component renders correctly', () => {
    const component = renderer.create(<Datatable />)

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('The greetee prop works', () => {
    const component = renderer.create(
      <Datatable data={mockedList} columns={columns} title="Employees" />
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
