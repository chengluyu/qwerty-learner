import React from 'react'
import PropTypes from 'prop-types'
import style from './index.less'

const Letter = ({ letter, state }) => {
  let stateClassName = ''

  switch (state) {
    case '':
      stateClassName = style.normal
      break
    case 'correct':
      stateClassName = style.correct
      break
    case 'error':
      stateClassName = style.error
      break
    default:
      stateClassName = style.normal
  }

  return <span className={`${style.letter} ${stateClassName}`}>{letter}</span>
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
}

export default Letter
