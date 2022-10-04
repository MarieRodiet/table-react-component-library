import React from 'react'
import { PropTypes } from 'prop-types'
import Cell from './Cell'

export default function Row({ el, isSelected, theme, select }) {
  return (
    <tr key={el.FirstName} className={`table-row-${theme}`} onClick={() => select(el)}>
      {Object.entries(el).map(([prop, value]) => {
        return <Cell key={prop + ' ' + value} prop={prop} value={value} isSelected={isSelected} />
      })}
    </tr>
  )
}

Row.propTypes = {
  select: PropTypes.func,
  theme: PropTypes.string,
  isSelected: PropTypes.bool,
  el: PropTypes.object,
}
