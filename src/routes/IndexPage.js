import React, { useRef, useState } from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Letter from '../components/Letter'

function IndexPage() {
  const testWord = 'testtest'
  const [value, setValue] = useState('')
  let errorIndex = -1

  const onChange = (e) => {
    const value = e.target.value

    if (errorIndex === -1) {
      setValue(value)
    }
  }
  const onKeyUp = (e) => {
    if (errorIndex !== -1 && e.key === 'Backspace') {
      errorIndex = -1
      setValue(value.substr(0, value.length - 1))
    }
  }

  const getState = (index) => {
    const length = value.length
    if (index >= length || (errorIndex !== -1 && index > errorIndex)) {
      return 'normal'
    }

    if (testWord[index] !== value[index]) {
      errorIndex = index
      return 'error'
    } else {
      return 'correct'
    }
  }

  return (
    <div className={styles.normal}>
      <div>
        {testWord.split('').map((t, index) => {
          return <Letter letter={t} state={getState(index)} />
        })}
      </div>
      <input value={value} onChange={onChange} onKeyUp={onKeyUp}></input>
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
