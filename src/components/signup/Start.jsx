import { AppBar, Grid, Toolbar } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Jump from 'react-reveal/Jump'
import Zoom from 'react-reveal/Zoom'
import logo from '../../logo.png'
import { useState } from 'react'
import styles from './start.module.css'

function Start() {
  const [isInBall, setIsInball] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [counter, setCounter] = useState(0)
  const [redirect, setRedirect] = useState(false)
  const [show, setShow] = useState(true)

  const inMouse = () => {
    setIsInball(true)
  }

  const outMouse = () => {
    setIsInball(false)
  }

  const onStart = () => {
    setIsStart(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, 2000)
    const timer2 = setTimeout(() => {
      setRedirect(true)
    }, 4000)
    return () => clearTimeout(timer, timer2)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (redirect) {
    return <Redirect to="/signup" />
  }
  return (
    <>
      <AppBar className="appBar">
        <Toolbar></Toolbar>
      </AppBar>
      <Grid container justify="center" style={{ marginTop: '200px' }}>
        <Zoom when={show && counter > 0}>
          <div
            onMouseEnter={inMouse}
            onMouseLeave={outMouse}
            onClick={onStart}
            style={{ textAlign: 'center' }}
          >
            <Jump spy={counter}>
              <div>
                <img
                  className={
                    isStart
                      ? styles.logoStart
                      : isInBall && !isStart
                      ? styles.logoIn
                      : styles.logo
                  }
                  style={{ cursor: 'pointer' }}
                  src={logo}
                  alt="loading..."
                />
              </div>
            </Jump>
          </div>
        </Zoom>
      </Grid>
    </>
  )
}

export default Start
