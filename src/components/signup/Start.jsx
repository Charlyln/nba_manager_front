import {
  AppBar,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Grow
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { useState } from 'react'
import styles from './start.module.css'
import Axios from 'axios'
import { apiUrl } from '../../apiUrl'

function Start() {
  const [show, setShow] = useState(true)

  const onStart = () => {
    setShow(false)
  }

  const wakeUpApi = async () => {
    try {
      await Axios.get(`${apiUrl}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    wakeUpApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppBar className="appBar">
        <Toolbar></Toolbar>
      </AppBar>

      <Grid container justify="center" style={{ marginTop: '120px' }}>
        <Paper elevation={10} style={{ padding: '5px 15px' }}>
          <Typography
            component="h6"
            style={{ fontSize: 'xx-large', color: '#000000' }}
            variant="h6"
          >
            NBA MANAGER
          </Typography>
        </Paper>
      </Grid>

      <Grid container justify="center" style={{ marginTop: '100px' }}>
        <Grow in={show}>
          <div onClick={onStart} style={{ textAlign: 'center' }}>
            <div
              style={{
                display: !show ? 'none' : ''
              }}
            >
              <img
                className={styles.logo}
                style={{ cursor: 'pointer' }}
                src={logo}
                alt="loading..."
              />
            </div>
          </div>
        </Grow>
        <Grow in={!show}>
          <div
            style={{
              display: show ? 'none' : '',
              marginTop: '100px'
            }}
          >
            <Link
              style={{ textDecoration: 'none', margin: '10px' }}
              to="/signup"
            >
              <Button variant="contained" color="primary">
                sign up
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none', margin: '10px' }}
              to="/login"
            >
              <Button variant="contained" color="primary">
                sign in
              </Button>
            </Link>
          </div>
        </Grow>
      </Grid>
    </>
  )
}

export default Start
