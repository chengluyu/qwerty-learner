import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Letter from '../Letter'

// const isLetter = (val) => /^[a-zA-z]$/.test(val)
const isLetter = (val) => /^[a-zA-z]$/.test(val)

const Word = ({ word = 'defaultWord' }) => {
  const [value, setValue] = useState('')
  let errorIndex = useRef(-1)
  let finishInput = useRef(false)

  // 每次渲染 重置 errorIndex、判断是否输入完毕
  errorIndex.current = -1
  finishInput.current = !(value.length < word.length)

  useEffect(() => {
    window.addEventListener('keydown', onKeyup)

    return () => {
      window.removeEventListener('keydown', onKeyup)
    }
  }, [])

  const onKeyup = (e) => {
    e.preventDefault()
    const char = e.key

    if (isLetter(char)) {
      if (errorIndex.current === -1 && !finishInput.current) {
        setValue((value) => (value += char))
      } else if (errorIndex.current !== -1) {
        // 删除错误字母，添加新字母
        setValue((value) => {
          let t = value.slice(0, errorIndex.current)
          t += char
          return t
        })
      }
    } else if (char === 'Backspace') {
      setValue((value) => value.substr(0, value.length - 1))
    }
  }

  const getState = (index) => {
    const length = value.length
    if (index >= length || (errorIndex.current !== -1 && index > errorIndex.current)) {
      return 'normal'
    }

    if (word[index] !== value[index]) {
      errorIndex.current = index
      return 'error'
    } else {
      return 'correct'
    }
  }

  return (
    <div>
      {word.split('').map((t, index) => {
        return <Letter letter={t} state={getState(index)} />
      })}
    </div>
  )
}

Word.propTypes = {}

export default Word
