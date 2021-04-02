import styles from './Error.css'
import React from 'react'

const Error = ({ errors }) => (errors && errors.length > 0 ? <div className={styles.error}>{errors.join(', ')}</div> : null)

export default Error
