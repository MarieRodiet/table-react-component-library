import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test, afterEach } from 'vitest'
import List from './index.jsx'
import { render, screen, cleanup } from '@testing-library/react'
import { testList, testColumns } from './data/testData'

describe('List', () => {
  afterEach(cleanup)
  test('List component renders correctly', () => {
    const component = renderer.create(<List />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

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
    expect(screen.getByText('Prenom'))
    expect(screen.getByText('Nom'))
    expect(screen.getByText('DatedeNaissance'))
    expect(screen.getByText('DatedeDebut'))
    expect(screen.getByText('Rue'))
    expect(screen.getByText('Ville'))
    expect(screen.getByText('Etat'))
    expect(screen.getByText('CodePostal'))
    expect(screen.getByText('Departement'))

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
})
