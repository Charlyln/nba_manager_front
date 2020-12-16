import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import {
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  GridList
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import TeamChoiceCard from './TeamChoiceCard'
import { apiUrl } from '../../apiUrl'
import CheckIcon from '@material-ui/icons/Check'
import postProgressValue from '../api calls/postProgressValue'
import { useDispatch } from 'react-redux'
import allActions from '../../actions'

const useStyles = makeStyles((theme) => ({
  gridList: {
    padding: '20px',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'unset'
    }
  }
}))

function TeamChoice() {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [teamsData, setTeamsData] = useState([])
  const [teamChoice, setTeamChoice] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [canPlay] = useState(window.localStorage.getItem('canPlay'))
  const [TeamUuidToPost, setTeamUuidToPost] = useState('')
  const dispatch = useDispatch()

  const putTeamChoice = (uuid) => {
    setTeamChoice(uuid)
    window.localStorage.setItem('TeamUuid', uuid)
    setTeamUuidToPost(uuid)
  }

  const SignupPost1 = async (e) => {
    e.preventDefault()
    setPostLoading(true)
    try {
      if (teamChoice) {
        await Axios.put(`${apiUrl}/teams/${teamChoice}`, {
          choice: true
        })
        await Axios.post(`${apiUrl}/progress/adjsutPlayerValue/${uuid}`)

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
      const res = await Axios.post(`${apiUrl}/dataCreation/games2/${uuid}`)
      await Axios.post(`${apiUrl}/dataCreation/trophies/${uuid}`)
      await Axios.post(`${apiUrl}/teams/salaryCap/${uuid}/${TeamUuidToPost}`)
      await postProgressValue(uuid, res.data.uuid)
      window.localStorage.setItem('SeasonUuid', res.data.uuid)
      window.localStorage.setItem('canPlay', '1')
      window.localStorage.setItem('trainingLeft', 2)

      dispatch(allActions.tutorialActions.setGeneralTutoOn())

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

  if ((SeasonUuid && TeamUuid && uuid && canPlay) || redirect) {
    return <Redirect to="/home" />
  }

  if (!uuid || (TeamUuid && !SeasonUuid)) {
    return <Redirect to="/" />
  }

  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <Typography
            variant="h6"
            component="h6"
            style={{ marginLeft: '30px', fontSize: 'medium' }}
          >
            CHOOSE YOUR TEAM
          </Typography>

          {teamChoice ? (
            <>
              {postLoading && !postSuccess ? (
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
                    variant="outlined"
                    endIcon={<CheckIcon />}
                    color="secondary"
                  >
                    Done
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

              {postLoading && postSuccess ? (
                <Button
                  style={{
                    width: '85px',
                    height: '35px',
                    marginLeft: '10px',
                    backgroundColor: '#8C8988'
                  }}
                  variant="contained"
                  disabled={postLoading}
                >
                  <CircularProgress size={23} />
                </Button>
              ) : (
                <Button
                  style={{
                    width: '85px',
                    height: '35px',
                    marginLeft: '10px'
                  }}
                  color="secondary"
                  variant={postSuccess ? 'contained' : 'outlined'}
                  onClick={SignupPost2}
                  disabled={!postSuccess}
                >
                  Start
                </Button>
              )}
            </>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>

      {isLoading ? (
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            marginTop: '100px'
          }}
        >
          <GridList className={classes.gridList}>
            {teamsData.map((team) => (
              <TeamChoiceCard
                name={team.name}
                logo={team.logo}
                uuid={team.uuid}
                putTeamChoice={putTeamChoice}
                teamChoice={teamChoice}
                players={team.Players}
                key={team.uuid}
              />
            ))}
          </GridList>
        </div>
      )}
    </>
  )
}

export default TeamChoice
