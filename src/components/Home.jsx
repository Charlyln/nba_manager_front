import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Grid, CircularProgress, Button, CardActions } from '@material-ui/core'
import Match from './Match'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'
import Skeleton from '@material-ui/lab/Skeleton'
import ForwardIcon from '@material-ui/icons/Forward'
import { Link, Redirect } from 'react-router-dom'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [myteamsData, setMyTeamsData] = useState({})
  const [allGames, setAllGames] = useState(-1)
  // const [nextSeason, setNextSeason] = useState(false)
  const [allGameLoading, setAllGameLoading] = useState(false)
  const [logoLoading, setLogoLoading] = useState(true)
  // const [page1, setPage] = useState(useLocation().pathname)
  const [offseasonPage, setPage] = useState(
    parseFloat(window.localStorage.getItem('offseason'))
  )

  // const createNextSeason = async () => {
  //   const res = await Axios.post(`${apiUrl}/seasons`, {
  //     UserUuid: uuid,
  //     startYear: 2021,
  //     endYear: 2022
  //   })
  //   window.localStorage.setItem('seasonUuid', res.data.uuid)
  // }

  useEffect(() => {
    getTeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/games/${UserUuid}`)
      setTeamsData(res.data)
      console.log(res.data)
      const teamsDataFilter = res.data.filter((game) => !game.team1)
      console.log(teamsDataFilter)
      if (teamsDataFilter.length === 1) {
        // setNextSeason(true)
      }
      getMyTeams()

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

  const matchAllGames = async (team1, team2, gameUuid) => {
    await matchIt(team1, team2, gameUuid)
    await getTeams()
  }

  const matchIt = (team1, team2, gameUuid) => {
    setAllGameLoading(true)
    let team1Score = 0

    Promise.all(
      team1.Players.map(async (player) => {
        const playerScore = Math.floor(
          Math.random() * (player.ptsMax - player.ptsMin) + player.ptsMin
        )
        try {
          await Axios.post(`${apiUrl}/playerStats`, {
            PlayerUuid: player.uuid,
            GameUuid: gameUuid,
            pts: playerScore,
            UserUuid: uuid
          })
          team1Score = team1Score + playerScore
          await Axios.put(`${apiUrl}/games/${gameUuid}`, {
            team1: team1Score
          })
        } catch (err) {
          console.log(err)
        } finally {
        }
      })
    )

    let team2Score = 0

    Promise.all(
      team2.Players.map(async (player) => {
        const playerScore = Math.floor(
          Math.random() * (player.ptsMax - player.ptsMin) + player.ptsMin
        )
        try {
          await Axios.post(`${apiUrl}/playerStats`, {
            PlayerUuid: player.uuid,
            GameUuid: gameUuid,
            pts: playerScore,
            UserUuid: uuid
          })
          team2Score = team2Score + playerScore

          await Axios.put(`${apiUrl}/games/${gameUuid}`, {
            team2: team2Score
          })

          const timer = setTimeout(async () => {
            await setAllGameLoading(false)
          }, 3000)
          return () => clearTimeout(timer)
        } catch (err) {
          console.log(err)
        } finally {
        }
      })
    )
  }

  const simulateAllGames = () => {
    setAllGames(allGames + 1)
    console.log(allGames)
  }

  if (offseasonPage) {
    return <Redirect to="/offseason" />
  }

  return (
    <>
      <Grid container style={{ marginTop: '100px' }}>
        {isLoading ? (
          <CircularProgress style={{ margin: 'auto' }} />
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container>
                {teamsData
                  .filter(
                    (team) => team.Visitor.Team.choice || team.Team.choice
                  )
                  // .filter((team) => team.Team.choice)
                  .map((team, i, arr) => {
                    let previousItem = arr[i - 1]

                    return (
                      <Grid item xs={12} sm={4} md={2} lg={2}>
                        <Grid container justify="center">
                          <Card
                            style={{
                              borderRadius: '0px',
                              margin: '3px',
                              width: '200px',
                              background: 'unset',
                              border: 'solid 1px',
                              borderColor: '#E59923',
                              color: 'white'
                            }}
                          >
                            <CardActionArea>
                              <CardContent
                                style={{
                                  whiteSpace: 'nowrap',
                                  padding: '5px',
                                  textAlign: 'center'
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="button"
                                  component="h5"
                                >
                                  {`${team.Team.name} @ ${team.Visitor.name}`}
                                </Typography>

                                <Typography
                                  gutterBottom
                                  variant="button"
                                  component="h2"
                                >
                                  {`Match ${i + 1}`}
                                </Typography>
                              </CardContent>
                              {logoLoading ? (
                                <Skeleton
                                  variant="circle"
                                  width={100}
                                  height={100}
                                  style={{ margin: '0px 49px 0px' }}
                                />
                              ) : (
                                ''
                              )}
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                title="Contemplative Reptile"
                                style={{
                                  width: logoLoading ? 0 : 100,
                                  height: '100%',
                                  margin: '0px 49px 15px'
                                }}
                                image={
                                  myteamsData.uuid === team.Team.uuid
                                    ? team.Visitor.Team.logo
                                    : team.Team.logo
                                }
                              />
                            </CardActionArea>
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
                            />
                          </Card>
                        </Grid>
                      </Grid>
                    )
                  })}

                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <Grid container justify="center">
                    <Card
                      style={{
                        borderRadius: '0px',
                        margin: '3px',
                        width: '200px',
                        background: 'unset',
                        borderColor: '#E59923',
                        color: 'white'
                      }}
                    >
                      <CardActions>
                        {teamsData.find(
                          (game) =>
                            (game.TeamUuid === myteamsData.uuid &&
                              game.team1 === null) ||
                            (game.VisitorUuid === myteamsData.uuid &&
                              game.team1 === null)
                        ) ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              teamsData
                                .filter(
                                  (game) =>
                                    game.Visitor.Team.choice || game.Team.choice
                                )
                                .filter((game) => !game.team1)
                                .map((game) =>
                                  matchAllGames(
                                    game.Team,
                                    game.Visitor.Team,
                                    game.uuid
                                  )
                                )
                            }
                          >
                            Simulate all games
                          </Button>
                        ) : (
                          <Link
                            to="/offseason"
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              endIcon={<ForwardIcon />}
                              onClick={() =>
                                window.localStorage.setItem('offseason', 1)
                              }
                            >
                              Go off season
                            </Button>
                          </Link>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}

export default Home
