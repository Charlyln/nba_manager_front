import React, { useState } from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'

function Match({ team2, myTeam, gameUuid, playerStats, getTeams }) {
  const [done, setDone] = useState(false)
  const [result, setResult] = useState('')
  const [win, setWin] = useState('')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const match = async (myTeam, team2) => {
    let myteamScore = 0
    console.log(myTeam, team2)
    // await Axios.post(`${apiUrl}/games`, {
    //   team1: myTeam.uuid,
    //   team2: team2.uuid
    // })

    myTeam.Players.map(async (player) => {
      const playerScore = Math.floor(
        Math.random() * (player.ptsMax - player.ptsMin) + player.ptsMin
      )

      await Axios.post(`${apiUrl}/playerStats`, {
        PlayerUuid: player.uuid,
        GameUuid: gameUuid,
        pts: playerScore
      })

      //   console.log(
      //     player.name,
      //     'Points',
      //     playerScore,
      //     'Passes',
      //     Math.floor(
      //       Math.random() * (player.passeMax - player.passeMin) + player.passeMin
      //     ),
      //     'Rebonds',
      //     Math.floor(
      //       Math.random() * (player.rebondsMax - player.rebondsMin) +
      //         player.rebondsMin
      //     )
      //   )

      myteamScore = myteamScore + playerScore
      return myteamScore
    })
    console.log(myteamScore)

    let team2Score = 0
    team2.Players.map(async (player) => {
      const playerScore = Math.floor(
        Math.random() * (player.ptsMax - player.ptsMin) + player.ptsMin
      )
      await Axios.post(`${apiUrl}/playerStats`, {
        PlayerUuid: player.uuid,
        GameUuid: gameUuid,
        pts: playerScore
      })

      //   console.log(
      //     player.name,
      //     'Points',
      //     playerScore,
      //     'Passes',
      //     Math.floor(
      //       Math.random() * (player.passeMax - player.passeMin) + player.passeMin
      //     ),
      //     'Rebonds',
      //     Math.floor(
      //       Math.random() * (player.rebondsMax - player.rebondsMin) +
      //         player.rebondsMin
      //     )
      //   )
      team2Score = team2Score + playerScore
      return team2Score
    })
    // console.log(team2Score)

    if (myteamScore > team2Score) {
      setWin(true)
    } else if (myteamScore < team2Score) {
      setWin(false)
    }

    setResult(`${myteamScore} - ${team2Score}`)
    setDone(true)
    getTeams()
  }

  return (
    <>
      <CardActions>
        {!done ? (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => match(myTeam, team2)}
            >
              Simulate
            </Button>
          </>
        ) : (
          <>
            {win ? (
              <Button
                size="small"
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor: 'rgb(76, 175, 80)'
                }}
                variant="contained"
              >
                {result || 'Done'}
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  style={{ whiteSpace: 'nowrap' }}
                  variant="contained"
                  color="secondary"
                >
                  {result || 'Done'}
                </Button>
              </>
            )}
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
                    <h1>{` ${myTeam.name}`}</h1>
                  </ListItem>

                  {playerStats
                    .filter((player) => player.Player.TeamUuid === myTeam.uuid)
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '50px', height: '50px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
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
                    <h1>{`${team2.name}`}</h1>
                  </ListItem>
                  {playerStats
                    .filter((player) => player.Player.TeamUuid !== myTeam.uuid)
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '50px', height: '50px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
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
