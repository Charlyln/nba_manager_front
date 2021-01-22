import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import {
  TextField,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Grow
} from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'

import { apiUrl } from '../../apiUrl'
import allActions from '../../actions'
import { useDispatch } from 'react-redux'

function Login() {
  let history = useHistory()
  const dispatch = useDispatch()
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [uuid, setUuid] = useState('')
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('')

  const SignupLogin = async (e) => {
    e.preventDefault()

    try {
      if (pseudo && password) {
        setLoginLoading(true)
        const res = await Axios.post(`${apiUrl}/users/login`, {
          pseudo,
          password
        })
        console.log(res.data)
        setLoginLoading(false)
        setPostSuccess(true)
        setToken(res.data.token)
        sessionStorage.setItem('token', res.data.token)
        setRole(res.data.user.Role.name)
        setUuid(res.data.user.uuid)

        if (res.data.user.Role.name === 'USER') {
          window.localStorage.setItem('uuid', res.data.user.uuid)
          window.localStorage.setItem('SeasonUuid', res.data.SeasonUuid)
          window.localStorage.setItem('TeamUuid', res.data.TeamUuid)
          window.localStorage.setItem('canPlay', '1')
          window.localStorage.setItem('trainingLeft', 2)
          window.localStorage.setItem(
            'tutorial',
            JSON.stringify({
              generalTutoIs: 'off',
              generalStep: 0,
              hasViewed: true
            })
          )
          dispatch(allActions.tutorialActions.setGeneralTutoOff())
          dispatch(allActions.tutorialActions.setHasViewed())
          history.push('/home')
        }

        const timer = setTimeout(() => {
          setRedirect(true)
        }, 500)
        return () => clearTimeout(timer)
      }
    } catch (err) {
      setLoginLoading(false)
      setError(err)
      console.log(err)
      const timer = setTimeout(() => {
        setError('')
        setPseudo('')
        setPassword('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }

  if (uuid && token && redirect && role === 'ADMIN') {
    console.log('2')
    return <Redirect to="/admin" />
  }

  return (
    <>
      <form onSubmit={SignupLogin}>
        <AppBar className="appBar">
          <Toolbar>
            <Typography
              variant="h6"
              component="h6"
              style={{ marginLeft: '30px', fontSize: 'medium' }}
            >
              SIGN IN
            </Typography>
          </Toolbar>
        </AppBar>
        <Grow in={true}>
          <Grid container>
            <Grid item xs={12} style={{ marginTop: '200px' }}>
              <Grid container alignItems="center" justify="center">
                <List>
                  <ListItem>
                    <TextField
                      disabled={loginLoading}
                      style={{ margin: '20px' }}
                      id="message"
                      label="Pseudo"
                      variant="outlined"
                      autoFocus="autofocus"
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      disabled={loginLoading}
                      style={{ margin: '20px' }}
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '50px' }}>
                <Grid container alignItems="center" justify="center">
                  {loginLoading ? (
                    <Button
                      style={{
                        width: '85px',
                        height: '35px'
                      }}
                      variant="contained"
                      color="primary"
                      disabled={loginLoading}
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
                      style={{
                        width: '85px',
                        height: '35px'
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!pseudo}
                      color="primary"
                    >
                      Login
                    </Button>
                  )}
                </Grid>
              </Grid>

              {error ? (
                <Grid item xs={12} style={{ marginTop: '50px' }}>
                  <Grid container alignItems="center" justify="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'rgb(217, 48, 33)' }}
                    >
                      Wrong password or pseudo
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grow>
      </form>
    </>
  )
}

export default Login
