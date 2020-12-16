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

import { apiUrl } from '../../apiUrl'

function SignUp() {
  const [pseudo, setPseudo] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [uuid, setUuid] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [canPlay] = useState(window.localStorage.getItem('canPlay'))
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))

  const SignupPost = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('offseason')
    window.localStorage.removeItem('TeamUuid')
    window.localStorage.removeItem('uuid')
    window.localStorage.removeItem('SeasonUuid')
    window.localStorage.removeItem('trainingLeft')
    window.localStorage.removeItem('canPlay')

    try {
      if (pseudo) {
        setPostLoading(true)
        const res = await Axios.post(`${apiUrl}/users`, {
          pseudo
        })
        setPseudo('')
        window.localStorage.setItem('uuid', res.data.uuid)
        console.log(uuid)
        setUuid(window.localStorage.getItem('uuid'))
        const dataUuid = window.localStorage.getItem('uuid')
        await Axios.post(`${apiUrl}/dataCreation/${dataUuid}`)
        setPostLoading(false)
        setPostSuccess(true)
        const timer = setTimeout(() => {
          setRedirect(true)
        }, 1000)

        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (UserUuid && TeamUuid && SeasonUuid && canPlay) {
    return <Redirect to="/home" />
  } else if (redirect) {
    return <Redirect to="/teamchoice" />
  }

  return (
    <>
      <form onSubmit={SignupPost}>
        <AppBar className="appBar">
          <Toolbar>
            <Typography
              variant="h6"
              component="h6"
              style={{ marginLeft: '30px', fontSize: 'medium' }}
            >
              CHOOSE YOUR PSEUDO
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: '250px' }}>
            <Grid container alignItems="center" justify="center">
              <TextField
                disabled={postLoading}
                required
                style={{ margin: '20px' }}
                id="message"
                label="Pseudo"
                variant="outlined"
                autoFocus="autofocus"
                value={pseudo}
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
                    style={{
                      width: '85px',
                      height: '35px'
                    }}
                    type="submit"
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
      </form>
    </>
  )
}

export default SignUp
