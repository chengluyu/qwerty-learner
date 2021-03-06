import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'
import Letter, { LetterState } from '../Letter'
import { isLegal } from '../../utils/utils'

const Word: React.FC<WordProps> = ({ word = 'defaultWord', onFinish, isStart }) => {
  word = word.replaceAll(' ', '_')
  const [inputWord, setInputWord] = useState('')
  const [statesList, setStatesList] = useState<LetterState[]>([])
  const [isFinish, setIsFinish] = useState(false)

  const onKeydown = useCallback((e) => {
    const char = e.key
    if (char === ' ') {
      // 防止用户惯性按空格导致页面跳动
      e.preventDefault()
    }

    if (isLegal(char)) setInputWord((value) => (value += char))
    else if (char === 'Backspace') setInputWord((value) => value.substr(0, value.length - 1))
  }, [])

  useEffect(() => {
    if (isStart && !isFinish) window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [isStart, isFinish, onKeydown])

  useEffect(() => {
    if (isFinish) {
      onFinish()
    }
  }, [isFinish])

  useLayoutEffect(() => {
    let hasWrong = false,
      wordLength = word.length,
      inputWordLength = inputWord.length
    const statesList: LetterState[] = []

    for (let i = 0; i < wordLength && i < inputWordLength; i++) {
      if (word[i] === inputWord[i]) statesList.push('correct')
      else {
        hasWrong = true
        statesList.push('wrong')
        setInputWord('')
        break
      }
    }

    if (!hasWrong && inputWordLength >= wordLength) {
      setIsFinish(true)
    }
    setStatesList(statesList)
  }, [inputWord, word])

  return (
    <div className="py-4">
      {word.split('').map((t, index) => {
        return <Letter key={`${index}-${t}`} letter={t} state={statesList[index]} />
      })}
    </div>
  )
}

export type WordProps = {
  word: string
  onFinish: Function
  isStart: boolean
}
export default Word
