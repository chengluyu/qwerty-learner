import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import Word from '../components/Word'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Word word="This is a Test" />
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
