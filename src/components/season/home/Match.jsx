import React, { useState } from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
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
  allGameLoading,
  TeamUuid,
  myteamsData,
  handleClickOpenMessage
}) {
  // const [done, setDone] = useState(false)
  // const [result, setResult] = useState('')
  // const [win, setWin] = useState('')
  const [open, setOpen] = useState(false)
  
  // const [score1, setScore1] = useState(0)
  // const [score2, setScore2] = useState(0)
  const [matchLoading, setMatchLoading] = useState(false)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))

  // useEffect(() => {
  //   getTeams()
  // }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }



  const displayButton = (game) => {
    const team1Result = game.PlayerStats.filter(
      (stat) => stat.Player.TeamUuid === TeamUuid
    ).reduce((a, v) => (a = a + v.pts), 0)
    // setScore1(team1Result)

    const team2Result = game.PlayerStats.filter(
      (stat) => stat.Player.TeamUuid !== TeamUuid
    ).reduce((a, v) => (a = a + v.pts), 0)
    // setScore2(team2Result)

    return (
      <>
        {/* <Button
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
        </Button> */}

        <Button
          variant="contained"
          size="small"
          onClick={handleClickOpen}
          style={{
            whiteSpace: 'nowrap',
            backgroundColor:
              team1Result > team2Result
                ? 'rgb(76, 175, 80)'
                : 'rgb(217, 48, 33)'
          }}
        >{`${game.TeamUuid === TeamUuid ? team1Result : team2Result} - ${
          game.TeamUuid === TeamUuid ? team2Result : team1Result
        }`}</Button>
      </>
    )
  }

  const matchit = async (uuid) => {
    if (myteamsData.Players.length === 5) {
      setMatchLoading(true)
      try {
        const res = await Axios.post(
          `${apiUrl}/gamePlayed/${uuid}/${SeasonUuid}/${TeamUuid}`
        )
        console.log(res.data)
        window.localStorage.setItem('trainingLeft', 2)
        getTeams()
        const timer = setTimeout(() => {
          setMatchLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
      } catch (err) {
        console.log(err)
      }
    } else {
      handleClickOpenMessage()
    }
  }

  return (
    <>
    
      <CardActions>
        {matchLoading || (allGameLoading && game.PlayerStats.length < 1) ? (
          <Button variant="contained" size="small" disabled>
            <CircularProgress size={22} />
          </Button>
        ) : game.PlayerStats.length > 0 ? (
          <>
            <>{displayButton(game)}</>

            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              Stats
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => matchit(game.uuid)}
            // disabled={
            //   previousItem.team1
            //     ? false
            //     : previousItem === 'first'
            //     ? false
            //     : true
            // }
          >
            Simulate
          </Button>
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
                    {/* <ListItemSecondaryAction>
                      {game.team1}
                    </ListItemSecondaryAction> */}
                  </ListItem>

                  <Divider />

                  {playerStats
                    .filter((stat) => stat.teamIdAtTheGame === team1.uuid)
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
                    {/* <ListItemSecondaryAction>
                      {game.team2}
                    </ListItemSecondaryAction> */}
                  </ListItem>

                  <Divider />

                  {playerStats
                    .filter((stat) => stat.teamIdAtTheGame !== team1.uuid)
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
