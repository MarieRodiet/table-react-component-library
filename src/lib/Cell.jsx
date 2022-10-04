import React from 'react'
import { PropTypes } from 'prop-types'

export default function Cell({ value, isSelected }) {
  return (
    <td data-testid="cell" className={isSelected ? 'selectedStyle' : ''}>
      {value}
    </td>
  )
}

Cell.propTypes = {
  isSelected: PropTypes.bool,
  value: PropTypes.string,
}
