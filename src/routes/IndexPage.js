import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Letter from '../components/Letter'

function IndexPage() {
  const testWord = 'testtest'
  console.log(testWord.split(''))

  return (
    <div className={styles.normal}>
      {testWord.split('').map((i) => (
        <Letter key={i} letter={i} />
      ))}
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
