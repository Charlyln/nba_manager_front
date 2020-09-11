import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import {
  TextField,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'

import { apiUrl } from '../apiUrl'

function SignUp() {
  const [pseudo, setPseudo] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [uuid, setUuid] = useState('')
  const [redirect, setRedirect] = useState(window.localStorage.getItem('uuid'))

  const SignupPost = async (e) => {
    e.preventDefault()
    setPostLoading(true)
    try {
      if (pseudo) {
        const res = await Axios.post(`${apiUrl}/users`, {
          pseudo
        })
        window.localStorage.setItem('uuid', res.data.uuid)
        console.log(uuid)
        setUuid(window.localStorage.getItem('uuid'))
        const dataUuid = window.localStorage.getItem('uuid')
        await Axios.post(`${apiUrl}/dataCreation/${dataUuid}`)
        const timer = setTimeout(() => {
          setPostLoading(false)
        }, 1000)
        setPostSuccess(true)

        const timer3 = setTimeout(() => {
          setPostSuccess(false)
          setRedirect(true)
        }, 3000)

        return () => clearTimeout(timer3, timer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (redirect) {
    return <Redirect to="/teamchoice" />
  }

  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <Typography
            variant="h6"
            display="block"
            gutterBottom
            style={{ marginLeft: '30px' }}
          >
            1. Choose your pseudo
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: '250px' }}>
          <Grid container alignItems="center" justify="center">
            <TextField
              style={{ margin: '20px' }}
              id="message"
              label="Pseudo"
              variant="outlined"
              autoFocus="autofocus"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '50px' }}>
            <Grid container alignItems="center" justify="center">
              {postLoading ? (
                <Button
                  style={{
                    width: '85px',
                    height: '35px'
                  }}
                  variant="contained"
                  color="primary"
                  disabled={postLoading}
                >
                  <CircularProgress size={23} />
                </Button>
              ) : postSuccess ? (
                <Button
                  style={{
                    width: '85px',
                    height: '35px'
                  }}
                  variant="contained"
                  endIcon={<CheckIcon />}
                  color="secondary"
                >
                  Done
                </Button>
              ) : (
                <Button
                  type="submit"
                  style={{
                    width: '85px',
                    height: '35px'
                  }}
                  onClick={SignupPost}
                  variant="contained"
                  color="primary"
                  disabled={postLoading}
                >
                  Signup
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp
