import React, { useEffect, useState } from 'react'
import styles from './progressBall.module.css'
import logo from '../../images/logo.png'
import Jump from 'react-reveal/Jump'
import { Grid } from '@material-ui/core'

function ProgressBall() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCounter((counter) => counter + 1)
  }, [])

  return (
    <Grid container style={{ marginTop: '200px', justifyContent: 'center' }}>
      <Jump spy={counter}>
        <div>
          <img className={styles.logo} src={logo} alt="loading..." />
        </div>
      </Jump>
    </Grid>
  )
}
export default ProgressBall
