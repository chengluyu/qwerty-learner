import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Letter from '../components/Letter'

const isLetter = (val) => /^[a-zA-Z]$/.test(val)

function IndexPage() {
  const testWord = 'testtest'
  const [value, setValue] = useState('')
  let errorIndex = useRef(-1)
  let finishInput = useRef(false)

  // 每次渲染 重置 errorIndex、判断是否输入完毕
  errorIndex.current = -1
  finishInput.current = !(value.length < testWord.length)

  useEffect(() => {
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  const onKeyup = (e) => {
    e.preventDefault()
    const char = e.key

    if (isLetter(char) && errorIndex.current === -1 && !finishInput.current) {
      setValue((value) => (value += char))
    } else if (errorIndex.current !== -1) {
      // 删除错误字母，添加新字母
      setValue((value) => {
        let t = value.slice(0, errorIndex.current)
        t += char
        return t
      })
    }
  }

  const getState = (index) => {
    const length = value.length
    if (index >= length || (errorIndex.current !== -1 && index > errorIndex.current)) {
      return 'normal'
    }

    if (testWord[index] !== value[index]) {
      errorIndex.current = index
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
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
