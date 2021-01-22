import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Word from '../components/Word'
import Translation from '../components/Translation'

import cet4Dict from '../assets/CET4_N.json'
import cet6Dict from '../assets/CET6_N.json'

function IndexPage() {
  const [order, setOrder] = useState(0)
  const [dict, setDict] = useState(cet4Dict)

  const onFinish = () => {
    setOrder((order) => (order + 1 < dict.length ? order + 1 : order))
  }

  const onChangeDict = (e) => {
    const value = e.target.value
    switch (value) {
      case 'cet4':
        setDict(cet4Dict)
        break
      case 'cet6':
        setDict(cet6Dict)
        break
      default:
        setDict(cet4Dict)
    }
  }

  return (
    <div className={styles.normal}>
      <select value={dict} onChange={onChangeDict}>
        <option value="cet4">CET-4</option>
        <option value="cet6">CET-6</option>
      </select>
      <Word key={`word-${dict[order].name}`} word={dict[order].name} onFinish={onFinish} />
      <Translation key={`trans-${dict[order].name}`} trans={dict[order].trans[0]} />
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)

// const fetchFile = (filename) => {
//   return fetch(filename)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('data:', data)
//     })
// }
