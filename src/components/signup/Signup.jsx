import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import {
  TextField,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  List,
  Grow,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { apiUrl } from '../../apiUrl'
import CancelIcon from '@material-ui/icons/Cancel'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useDispatch } from 'react-redux'
import allActions from '../../actions'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

function SignUp() {
  const [pseudo, setPseudo] = useState('')
  const [pseudoTaken, setPseudoTaken] = useState(false)
  const [password, setPassword] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [userRoleId, setUserRoleId] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const SignupPost = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('offseason')
    window.localStorage.removeItem('TeamUuid')
    window.localStorage.removeItem('uuid')
    window.localStorage.removeItem('SeasonUuid')
    window.localStorage.removeItem('trainingLeft')
    window.localStorage.removeItem('canPlay')
    window.localStorage.removeItem('tutorial')

    try {
      if (pseudo && password) {
        setPostLoading(true)
        const res = await Axios.post(`${apiUrl}/users`, {
          pseudo,
          password,
          RoleUuid: userRoleId
        })
        window.localStorage.setItem('uuid', res.data.uuid)
        const dataUuid = res.data.uuid
        await Axios.post(`${apiUrl}/dataCreation/${dataUuid}`)
        setPostLoading(false)
        setPostSuccess(true)
        dispatch(allActions.tutorialActions.reset())
        const timer = setTimeout(() => {
          setRedirect(true)
        }, 1000)

        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getRoles = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/roles`)
      const Role = res.data.find((role) => role.name === 'USER')
      const RoleId = Role.uuid
      setUserRoleId(RoleId)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const checkPseudo = async (e) => {
    setPseudo(e.target.value)
    const res = await Axios.post(`${apiUrl}/users/checkPseudo`, {
      pseudo: e.target.value
    })
    setPseudoTaken(res.data)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    getRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (redirect) {
    return <Redirect to="/teamchoice" />
  }
  if (isLoading) {
    return ''
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

        <Grow in={true}>
          <Grid container>
          <Grid item xs={1} style={{ marginTop: '100px' }}>
              <Grid container alignItems="center" justify="center">
                <Link to="/">
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>u
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Grid container alignItems="center" justify="center">
                <List>
                  <ListItem>
                    <TextField
                      disabled={postLoading}
                      style={{ margin: '20px' }}
                      id="message"
                      label="Pseudo"
                      variant="outlined"
                      autoFocus="autofocus"
                      value={pseudo}
                      // onChange={(e) => setPseudo(e.target.value)}
                      onChange={(e) => checkPseudo(e)}
                    />

                    {!pseudo ? (
                      <CheckCircleIcon style={{ opacity: 0 }} />
                    ) : !pseudoTaken && pseudo.length > 3 ? (
                      <CheckCircleIcon style={{ color: 'rgb(76, 175, 80)' }} />
                    ) : (
                      <CancelIcon style={{ color: 'rgb(217, 48, 33)' }} />
                    )}
                  </ListItem>
                  {/* <ListItem>
                    <TextField
                      disabled={postLoading}
                      required
                      style={{ margin: '20px' }}
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <CheckCircleIcon />
                    </TextField>

                    {!password ? (
                      <CheckCircleIcon style={{ opacity: 0 }} />
                    ) : password.length > 3 ? (
                      <CheckCircleIcon style={{ color: 'rgb(76, 175, 80)' }} />
                    ) : (
                      <CancelIcon style={{ color: 'rgb(217, 48, 33)' }} />
                    )}
                  </ListItem> */}
                  <ListItem>
                    <FormControl
                      style={{ margin: '20px', width: '226px' }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        labelWidth={70}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {!password ? (
                      <CheckCircleIcon style={{ opacity: 0 }} />
                    ) : password.length > 3 ? (
                      <CheckCircleIcon style={{ color: 'rgb(76, 175, 80)' }} />
                    ) : (
                      <CancelIcon style={{ color: 'rgb(217, 48, 33)' }} />
                    )}
                  </ListItem>
                </List>
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
                      disabled={
                        postLoading ||
                        pseudoTaken ||
                        password.length < 4 ||
                        pseudo.length < 4
                      }
                    >
                      Signup
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grow>
      </form>
    </>
  )
}

export default SignUp
