import React, { useState } from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Word from '../components/Word'

const words = ['test', 'happy', 'sad', 'a']

function IndexPage() {
  const [order, setOrder] = useState(0)

  const onFinish = () => {
    setOrder((order) => (order + 1 < words.length ? order + 1 : order))
  }

  return (
    <div className={styles.normal}>
      {console.log(order, words[order])}
      <Word key={`${words[order]}`} word={words[order]} onFinish={onFinish} />
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
