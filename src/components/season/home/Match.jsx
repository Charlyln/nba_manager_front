import React, { useEffect, useState } from 'react'
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
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import CountUp from 'react-countup'

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
  handleClickOpenMessage,
  teamsData,
  matchAllGames,
  nextItem
}) {
  // const [done, setDone] = useState(false)
  // const [result, setResult] = useState('')
  // const [win, setWin] = useState('')
  const [open, setOpen] = useState(false)

  // const [score1, setScore1] = useState(0)
  // const [score2, setScore2] = useState(0)
  const [matchLoading, setMatchLoading] = useState(false)
  const [isPlayed, setIsPlayed] = useState(game.team1)
  const [dataLoading, setDataLoading] = useState(false)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [countUp, setCountUp] = useState(false)
  const [canDisplayColor, setCanDisplayColor] = useState(false)

  useEffect(() => {
    if (teamsData.find((game) => game.team1 && game.uuid === gameUuid)) {
      setIsPlayed(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsData])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const displayButton = (game) => {
    // const myTeamResult = game.PlayerStats.filter(
    //   (stat) => stat.Player.TeamUuid === TeamUuid
    // ).reduce((a, v) => (a = a + v.pts), 0)
    // // setScore1(myTeamResult)

    // const team2Result = game.PlayerStats.filter(
    //   (stat) => stat.Player.TeamUuid !== TeamUuid
    // ).reduce((a, v) => (a = a + v.pts), 0)
    // // setScore2(team2Result)

    return (
      <>
        <Button
          variant="contained"
          size="small"
          onClick={handleClickOpen}
          style={{
            whiteSpace: 'nowrap',
            backgroundColor:
              countUp && !canDisplayColor
                ? '#e0e0e0'
                : game.team1 > game.team2 && game.Team.choice
                ? 'rgb(76, 175, 80)'
                : game.team2 > game.team1 && game.Visitor.Team.choice
                ? 'rgb(76, 175, 80)'
                : 'rgb(217, 48, 33)'
          }}
        >
          {countUp && !teamsData[i + 1].team1 ? (
            <>
              {' '}
              <CountUp
                onEnd={() => setCanDisplayColor(true)}
                end={game.team1}
                duration={5}
              />
              {`-`}
              <CountUp end={game.team2} duration={5} />
            </>
          ) : (
            <>{`${game.team1}-${game.team2}`}</>
          )}

          {/* {`${()} - ${game.team2}`} */}
        </Button>
      </>
    )
  }

  const matchit = async (uuid) => {
    if (myteamsData.Players.length === 5) {
      setMatchLoading(true)
      setDataLoading(true)

      try {
        if (i + 1 === teamsData.length) {
          await matchAllGames()
          setMatchLoading(false)
        } else {
          await Axios.post(
            `${apiUrl}/gamePlayed/${uuid}/${SeasonUuid}/${TeamUuid}`
          )
          window.localStorage.setItem('trainingLeft', 2)
          getTeams()
          setCountUp(true)
          setMatchLoading(false)
        }
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
        {matchLoading ||
        (allGameLoading && game.PlayerStats.length < 1) ||
        (dataLoading && !isPlayed) ? (
          <Button variant="contained" size="small" disabled>
            <CircularProgress size={22} />
          </Button>
        ) : game.PlayerStats.length === 0 || game.team1 === 0 ? (
          <Button
            variant={
              previousItem.team1
                ? 'contained'
                : previousItem === 'first'
                ? 'contained'
                : 'outlined'
            }
            size="small"
            color="primary"
            onClick={() => matchit(game.uuid)}
            endIcon={
              previousItem.team1 ? (
                <PlayArrowIcon />
              ) : previousItem === 'first' ? (
                <PlayArrowIcon />
              ) : (
                ''
              )
            }
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
        ) : (
          <>
            <>{displayButton(game)}</>

            <Button variant="outlined" size="small" onClick={handleClickOpen}>
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
                    <ListItemSecondaryAction>
                      {game.team2}
                    </ListItemSecondaryAction>
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
