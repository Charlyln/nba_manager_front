import React, { useEffect, useState } from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
import {
  Avatar,
  CircularProgress,
  DialogActions,
  Divider,
  Grid,
  ListItemText,
  Paper
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import CountUp from 'react-countup'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../actions'

function Match({
  team2,
  team1,
  gameUuid,
  playerStats,
  getAllData,
  game,
  previousItem,
  nextItem,
  i,
  allGameLoading,
  TeamUuid,
  myteamsData,
  handleClickOpenMessage,
  teamsData,
  matchAllGames,
  iOpenTrophySnackbar,
  UserUuid,
  TrophyData,
  trophyName
}) {
  const [open, setOpen] = useState(false)
  const [matchLoading, setMatchLoading] = useState(false)
  const [isPlayed, setIsPlayed] = useState(game.team1)
  const [dataLoading, setDataLoading] = useState(false)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [countUp, setCountUp] = useState(false)
  const [canDisplayColor, setCanDisplayColor] = useState(false)
  const dispatch = useDispatch()
  const tutorial = useSelector((state) => state.tutorial)

  useEffect(() => {
    if (teamsData.find((game) => game.team1 && game.uuid === gameUuid)) {
      setIsPlayed(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsData])

  const handleClickOpen = () => {
    setOpen(true)

    if (tutorial && tutorial.generalTutoIs === 'on') {
      const timer = setTimeout(() => {
        dispatch(allActions.tutorialActions.incrementGeneral())
      }, 100)
      return () => clearTimeout(timer)
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (tutorial && tutorial.generalTutoIs === 'on') {
      dispatch(allActions.tutorialActions.incrementGeneral())
    }
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

    let difference = 0

    if (game.team1 > game.team2) {
      difference = game.team1 - game.team2
    } else if (game.team1 < game.team2) {
      difference = game.team2 - game.team1
    }

    return (
      <>
        <Button
          variant="contained"
          size="small"
          onClick={handleClickOpen}
          style={{
            whiteSpace: 'nowrap',
            backgroundColor:
              countUp && !canDisplayColor && difference < 10
                ? '#e0e0e0'
                : game.team1 > game.team2 && game.Team.choice
                ? 'rgb(76, 175, 80)'
                : game.team2 > game.team1 && game.Visitor.Team.choice
                ? 'rgb(76, 175, 80)'
                : 'rgb(217, 48, 33)'
          }}
        >
          {countUp && !teamsData[i + 1].team1 && difference < 10 ? (
            <>
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
    const nbrLineUp = myteamsData.Players.filter((player) => !player.isBench)

    if (nbrLineUp.length === 5) {
      setMatchLoading(true)
      setDataLoading(true)

      try {
        if (i + 1 === teamsData.length) {
          await matchAllGames()
          setMatchLoading(false)
        } else {
          await Axios.post(
            `${apiUrl}/gamePlayed/${uuid}/${SeasonUuid}/${TeamUuid}/${UserUuid}`
          )
          if (!TrophyData.earned) {
            await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
              name: trophyName
            })

            iOpenTrophySnackbar()
          }
          window.localStorage.setItem('trainingLeft', 2)
          await getAllData()
          setCountUp(true)
          setMatchLoading(false)
          dispatch(allActions.tutorialActions.incrementGeneral())
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
      <CardActions
        className={
          (game.team1 && nextItem && !nextItem.team1) ||
          (game.team1 && !nextItem)
            ? // ||
              // (game.team1 && nextItem && !nextItem.team1)
              // (!game.team1 &&
              //   nextItem &&
              //   !nextItem.team1 &&
              //   previousItem &&
              //   !previousItem.team1)
              'tutoHome2'
            : ''
        }
      >
        {matchLoading ||
        (allGameLoading && game.PlayerStats.length < 1) ||
        (dataLoading && !isPlayed) ? (
          <Button variant="contained" size="small" disabled>
            <CircularProgress size={22} />
          </Button>
        ) : game.PlayerStats.length === 0 || game.team1 === 0 ? (
          <>
            <Button
              variant={
                previousItem.team1
                  ? 'contained'
                  : previousItem === 'first'
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              className="tutoHome1"
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
          </>
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
        onClose={tutorial && tutorial.generalTutoIs === 'on' ? '' : handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
        style={{ zIndex: tutorial && tutorial.is === 'on' ? 50 : 'unset' }}
      >
        <Grid container className="tutoHome3">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item style={{ margin: 'auto' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Avatar
                            src={team1.logo}
                            style={{ width: '60px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell align="left">{team1.name}</TableCell>
                        <TableCell align="center">{game.team1}</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell style={{ paddingLeft: 0 }} align="left">
                          Name
                        </TableCell>
                        <TableCell align="center">Pts</TableCell>
                        <TableCell align="center">Reb</TableCell>
                        <TableCell align="center">Ass</TableCell>
                        <TableCell align="center">Blk</TableCell>
                        <TableCell align="center">Stl</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {playerStats
                        .filter((stat) => stat.teamIdAtTheGame === team1.uuid)
                        .sort(function (a, b) {
                          return new Date(b.pts) - new Date(a.pts)
                        })
                        .map((player) => {
                          return (
                            <TableRow>
                              <TableCell
                                align="center"
                                style={{ padding: '5px 16px' }}
                              >
                                <Avatar
                                  alt={player.Player.lastName}
                                  src={player.Player.photo}
                                  style={{ width: '60px', height: '60px' }}
                                />
                              </TableCell>
                              <TableCell align="left" style={{ padding: 0 }}>
                                <ListItemText
                                  style={{ padding: 0 }}
                                  primary={player.Player.firstName}
                                  secondary={player.Player.lastName}
                                />
                              </TableCell>
                              <TableCell align="center">{player.pts}</TableCell>
                              <TableCell align="center">{player.reb}</TableCell>
                              <TableCell align="center">{player.pas}</TableCell>
                              <TableCell align="center">{player.blk}</TableCell>
                              <TableCell align="center">{player.stl}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item style={{ margin: 'auto' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Avatar
                            src={team2.logo}
                            style={{ width: '60px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell align="left">{team2.name}</TableCell>
                        <TableCell align="center">{game.team2}</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell style={{ paddingLeft: 0 }} align="left">
                          Name
                        </TableCell>
                        <TableCell align="center">Pts</TableCell>
                        <TableCell align="center">Reb</TableCell>
                        <TableCell align="center">Ass</TableCell>
                        <TableCell align="center">Blk</TableCell>
                        <TableCell align="center">Stl</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {playerStats
                        .filter((stat) => stat.teamIdAtTheGame !== team1.uuid)

                        .sort(function (a, b) {
                          return new Date(b.pts) - new Date(a.pts)
                        })
                        .map((player) => {
                          return (
                            <TableRow>
                              <TableCell
                                align="center"
                                style={{ padding: '5px 16px' }}
                              >
                                <Avatar
                                  alt={player.Player.lastName}
                                  src={player.Player.photo}
                                  style={{ width: '60px', height: '60px' }}
                                />
                              </TableCell>
                              <TableCell align="left" style={{ padding: 0 }}>
                                <ListItemText
                                  style={{ padding: 0 }}
                                  primary={player.Player.firstName}
                                  secondary={player.Player.lastName}
                                />
                                {/* {player.Player.firstName} */}
                              </TableCell>
                              <TableCell align="center">{player.pts}</TableCell>
                              <TableCell align="center">{player.reb}</TableCell>
                              <TableCell align="center">{player.pas}</TableCell>
                              <TableCell align="center">{player.blk}</TableCell>
                              <TableCell align="center">{player.stl}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              close
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  )
}

export default Match
