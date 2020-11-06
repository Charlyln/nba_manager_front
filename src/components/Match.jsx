import React, { useState } from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'
import {
  Avatar,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'

function Match({
  team2,
  team1,
  gameUuid,
  playerStats,
  getTeams,
  game,
  previousItem,
  allGames,
  i,
  simulateAllGames,
  allGameLoading
}) {
  // const [done, setDone] = useState(false)
  // const [result, setResult] = useState('')
  // const [win, setWin] = useState('')
  const [open, setOpen] = useState(false)
  // const [score1, setScore1] = useState(0)
  // const [score2, setScore2] = useState(0)
  const [matchLoading, setMatchLoading] = useState(false)
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))

  // useEffect(() => {
  //   getTeams()
  // }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const match = (team1, team2) => {
    setMatchLoading(true)
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
            UserUuid
          })
          team1Score = team1Score + playerScore
          // setScore1(team1Score)
          const timer = setTimeout(() => {
            Axios.put(`${apiUrl}/games/${gameUuid}`, {
              team1: team1Score
            })
          }, 1000)
          return () => clearTimeout(timer)
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
            UserUuid
          })
          team2Score = team2Score + playerScore

          const timer = setTimeout(async () => {
            Axios.put(`${apiUrl}/games/${gameUuid}`, {
              team2: team2Score
            })

            await getTeams()
            await setMatchLoading(false)
          }, 1000)
          return () => clearTimeout(timer)
        } catch (err) {
          console.log(err)
        } finally {
          window.localStorage.setItem('trainingLeft', 2)
        }
      })
    )
  }

  return (
    <>
      <CardActions>
        {!game.team1 && !game.team2 ? (
          <>
            {matchLoading || allGameLoading ? (
              <Button variant="contained" size="small" disabled>
                <CircularProgress size={23} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => match(team1, team2)}
                disabled={
                  previousItem.team1
                    ? false
                    : previousItem === 'first'
                    ? false
                    : true
                }
              >
                Simulate
              </Button>
            )}
          </>
        ) : (
          <>
            <>
              <Button
                size="small"
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor:
                    game.team1 > game.team2 && game.Team.choice
                      ? 'rgb(76, 175, 80)'
                      : game.team2 > game.team1 && game.Visitor.Team.choice
                      ? 'rgb(76, 175, 80)'
                      : 'rgb(217, 48, 33)'
                }}
                variant="contained"
              >
                {`${game.team1} - ${game.team2}`}
              </Button>
            </>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleClickOpen}
            >
              Stats
            </Button>
          </>
        )}
      </CardActions>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemAvatar style={{ margin: '0px 5px' }}>
                      <Avatar
                        src={team1.logo}
                        style={{ width: '60px', height: '60px' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ margin: '5px 20px' }}
                      primary={` ${team1.name}`}
                    />
                    <ListItemSecondaryAction>
                      {game.team1}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  {playerStats
                    .filter((player) => player.Player.TeamUuid === team1.uuid)
                    .sort(function (a, b) {
                      return new Date(b.pts) - new Date(a.pts)
                    })
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar style={{ margin: '0px 5px' }}>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '60px', height: '60px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            style={{ margin: '5px 20px' }}
                            primary={player.Player.firstName}
                            secondary={player.Player.lastName}
                          />
                          <ListItemSecondaryAction>
                            {player.pts}
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                </List>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemAvatar style={{ margin: '0px 5px' }}>
                      <Avatar
                        src={team2.logo}
                        style={{ width: '60px', height: '60px' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ margin: '5px 20px' }}
                      primary={` ${team2.name}`}
                    />
                    <ListItemSecondaryAction>
                      {game.team2}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  {playerStats
                    .filter((player) => player.Player.TeamUuid !== team1.uuid)
                    .sort(function (a, b) {
                      return new Date(b.pts) - new Date(a.pts)
                    })
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar style={{ margin: '0px 5px' }}>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '60px', height: '60px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            style={{ margin: '5px 20px' }}
                            primary={player.Player.firstName}
                            secondary={player.Player.lastName}
                          />
                          <ListItemSecondaryAction>
                            {player.pts}
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default Match
