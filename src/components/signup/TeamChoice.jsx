import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import {
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import TeamChoiceCard from './TeamChoiceCard'
import { apiUrl } from '../../apiUrl'
import CheckIcon from '@material-ui/icons/Check'

function TeamChoice() {
  const [isLoading, setIsLoading] = useState(true)
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [teamsData, setTeamsData] = useState([])
  const [teamChoice, setTeamChoice] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [seasonUuid] = useState(window.localStorage.getItem('seasonUuid'))

  const putTeamChoice = (uuid) => {
    setTeamChoice(uuid)
  }

  const SignupPost1 = async (e) => {
    e.preventDefault()
    setPostLoading(true)
    try {
      if (teamChoice) {
        await Axios.put(`${apiUrl}/teams/${teamChoice}`, {
          choice: true
        })

        await Axios.post(`${apiUrl}/dataCreation/games/${uuid}`)

        const timer = setTimeout(() => {
          setPostLoading(false)
          setPostSuccess(true)
        }, 1000)

        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const SignupPost2 = async (e) => {
    e.preventDefault()
    setPostLoading(true)
    try {
      await Axios.post(`${apiUrl}/dataCreation/games2/${uuid}/${teamChoice}`)
      window.localStorage.setItem('canPlay', '1')
      window.localStorage.setItem('trainingLeft', 2)
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myleague/${UserUuid}`)
      setTeamsData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  if (redirect || seasonUuid || window.localStorage.getItem('canPlay')) {
    return <Redirect to="/home" />
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
            2. Choose your team
          </Typography>
          {teamChoice ? (
            <>
              {postLoading ? (
                <Button
                  style={{
                    width: '85px',
                    height: '35px',
                    marginLeft: 'auto',
                    backgroundColor: '#8C8988'
                  }}
                  variant="contained"
                  disabled={postLoading}
                >
                  <CircularProgress size={23} />
                </Button>
              ) : postSuccess ? (
                <>
                  <Button
                    style={{
                      width: '85px',
                      height: '35px',
                      marginLeft: 'auto'
                    }}
                    variant="contained"
                    endIcon={<CheckIcon />}
                    color="secondary"
                  >
                    Done
                  </Button>
                  <Button
                    style={{
                      width: '85px',
                      height: '35px',
                      marginLeft: '10px'
                    }}
                    color="secondary"
                    variant="outlined"
                    onClick={SignupPost2}
                    disabled={!postSuccess}
                  >
                    Start
                  </Button>
                </>
              ) : (
                <Button
                  style={{
                    width: '85px',
                    height: '35px',
                    marginLeft: 'auto'
                  }}
                  color="secondary"
                  variant="contained"
                  onClick={SignupPost1}
                >
                  Next
                </Button>
              )}
            </>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>

      {/* <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> */}

      <Grid container style={{ marginTop: '100px', marginBottom: '100px' }}>
        {isLoading ? (
          <CircularProgress style={{ margin: 'auto' }} />
        ) : (
          <Grid item xs={12}>
            <Grid container justify="center">
              {teamsData.map((team) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  style={{ marginTop: '20px' }}
                >
                  <Grid container alignItems="center" justify="center">
                    <TeamChoiceCard
                      name={team.name}
                      logo={team.logo}
                      uuid={team.uuid}
                      putTeamChoice={putTeamChoice}
                      teamChoice={teamChoice}
                      players={team.Players}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default TeamChoice
