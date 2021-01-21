import React from 'react'
import PropTypes from 'prop-types'
import style from './index.less'

const Letter = ({ letter, state }) => {
  let stateClassName = ''

  switch (state) {
    case '':
      break
    case 'sucess':
      stateClassName = 'sucess'
  }

  return <span>{letter}</span>
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
}

export default Letter
