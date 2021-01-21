import React, { useEffect, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import Letter from '../Letter'

// const isLetter = (val) => /^[a-zA-z]$/.test(val)
// const isLegal = (val) => /^\w$/.test(val)
const isLegal = (val) => /^[a-z_A-Z']$/.test(val)

const Word = ({ word = 'defaultWord', onFinish }) => {
  word = word.replaceAll(' ', '_')
  const [value, setValue] = useState('')
  let errorIndex = useRef(-1)
  let finishInput = useRef(false)

  // 每次渲染 重置 errorIndex、判断是否输入完毕
  errorIndex.current = -1
  finishInput.current = !(value.length < word.length)

  const onKeydown = useCallback((e) => {
    const char = e.key

    if (char === ' ') {
      // 防止用户惯性按空格导致页面跳动
      e.preventDefault()
    }

    if (isLegal(char)) {
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
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])

  useEffect(() => {
    // 在 UI 渲染后，如果完成了输入，则通知父组件
    if (errorIndex.current === -1 && finishInput.current && onFinish) {
      onFinish()
    }
  })

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
        return <Letter key={`${index}-${t}`} letter={t} state={getState(index)} />
      })}
    </div>
  )
}

Word.propTypes = {
  word: PropTypes.string,
  onFinish: PropTypes.func,
}

export default Word
