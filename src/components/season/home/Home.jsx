import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import {
  Grid,
  CircularProgress,
  Button,
  Paper,
  Avatar,
  GridList
} from '@material-ui/core'
import Match from './Match'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
import Skeleton from '@material-ui/lab/Skeleton'
import ForwardIcon from '@material-ui/icons/Forward'
import { Link, Redirect } from 'react-router-dom'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [myteamsData, setMyTeamsData] = useState({})
  const [allGames, setAllGames] = useState(-1)
  const [allGameLoading, setAllGameLoading] = useState(false)
  const [logoLoading, setLogoLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    getTeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTeams = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/games/${SeasonUuid}/${TeamUuid}`)
      setTeamsData(res.data)

      const teamsDataFilter = res.data.filter((game) => !game.team1)

      if (teamsDataFilter.length === 1) {
        // setNextSeason(true)
      }
      await getMyTeams()

      setIsLoading(false)
      const timer = setTimeout(() => {
        setLogoLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const getMyTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamsData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const matchAllGames = async () => {
    setAllGameLoading(true)
    const SeasonUuid = teamsData[0].SeasonUuid
     await Axios.post(`${apiUrl}/gamePlayed/all/${SeasonUuid}`)
    window.localStorage.setItem('trainingLeft', 2)
    const timer1 = setTimeout(() => {
      getTeams()
    }, 2500)

    const timer2 = setTimeout(() => {
      setAllGameLoading(false)
    }, 5000)
    return () => clearTimeout(timer1, timer2)
  }

  const simulateAllGames = () => {
    setAllGames(allGames + 1)
  }

  const goOffSeason = async () => {
    window.localStorage.setItem('offseason', 1)
    await Axios.post(`${apiUrl}/players/changeContract/${uuid}`)
    await Axios.post(`${apiUrl}/players/changeAge/${uuid}`)
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/offseason" />
  }

  return (
    <>
      {isLoading ? (
        <Grid
          container
          style={{ marginTop: '200px', justifyContent: 'center' }}
        >
          <CircularProgress style={{ marginTop: 'auto' }} />
        </Grid>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              marginTop: '100px'
            }}
          >
            <GridList
              style={{
                padding: '20px'
              }}
            >
              {teamsData.map((team, i, arr) => {
                let previousItem = arr[i - 1]
                return (
                  <Paper
                    elevation={10}
                    style={{
                      margin: '4px',
                      padding: '15px 15px',
                      width: '210px',
                      height: '230px'
                    }}
                  >
                    <Typography gutterBottom variant="button" component="h5">
                      {`${team.Team.name} @ ${team.Visitor.name}`}
                    </Typography>

                    <Typography gutterBottom variant="button" component="h2">
                      {`Match ${i + 1}`}
                    </Typography>
                    {logoLoading ? (
                      <Skeleton
                        variant="circle"
                        style={{
                          width: '100px',
                          height: '100px',
                          margin: 'auto'
                        }}
                      />
                    ) : (
                      ''
                    )}

                    <Avatar
                      style={{
                        width: logoLoading ? 0 : '100px',
                        height: logoLoading ? 0 : '100px',
                        margin: 'auto'
                      }}
                      src={
                        myteamsData.uuid === team.Team.uuid
                          ? team.Visitor.Team.logo
                          : team.Team.logo
                      }
                    />

                    <Match
                      team1={team.Team}
                      team2={team.Visitor.Team}
                      gameUuid={team.uuid}
                      playerStats={team.PlayerStats}
                      getTeams={getTeams}
                      game={team}
                      previousItem={previousItem || 'first'}
                      allGames={allGames}
                      i={i}
                      simulateAllGames={simulateAllGames}
                      allGameLoading={allGameLoading}
                      TeamUuid={myteamsData.uuid}
                    />
                  </Paper>
                )
              })}
              <Paper
                elevation={10}
                style={{
                  margin: '4px',
                  padding: '20px',
                  width: '210px',
                  textAlign: 'center',
                  height: '80px'
                }}
              >
                {teamsData.find(
                  (game) => game.team1 === null
                  // (game.TeamUuid === myteamsData.uuid &&
                  //   game.team1 === null) ||
                  // (game.Visitor.TeamUuid === myteamsData.uuid &&
                  //   game.team1 === null)
                ) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={matchAllGames}
                  >
                    Simulate all
                  </Button>
                ) : (
                  <>
                    <Link to="/offseason" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ForwardIcon />}
                        onClick={goOffSeason}
                      >
                        off season
                      </Button>
                    </Link>
                  </>
                )}
              </Paper>
            </GridList>
          </div>
        </>
      )}
    </>
  )
}

export default Home
