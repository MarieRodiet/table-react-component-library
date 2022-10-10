import React from 'react'
import { PropTypes } from 'prop-types'
import Cell from './Cell'

export default function Row({ el, isSelected, theme, select, showIndex }) {
  return (
    <tr key={el.FirstName} className={`table-row-${theme}`} onClick={() => select(el)}>
      {showIndex !== '' ? (
        <Cell key={showIndex} prop={showIndex} value={showIndex} isSelected={isSelected} />
      ) : null}
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
  showIndex: PropTypes.string,
}
