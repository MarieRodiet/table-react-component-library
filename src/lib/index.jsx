import PropTypes from 'prop-types'
import React from 'react'
import Table from './Table'

export default function HelloWorld(props) {
  const { greetee = 'World' } = props

  return (
    <div>
      Hello, {greetee}!
      <Table />
    </div>
  )
}

HelloWorld.propTypes = {
  greetee: PropTypes.string,
}
