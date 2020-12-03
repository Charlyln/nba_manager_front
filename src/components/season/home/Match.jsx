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

function Match({
  team2,
  team1,
  gameUuid,
  playerStats,
  getAllData,
  game,
  previousItem,
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
          if (!TrophyData.earned) {
            await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
              name: trophyName
            })
            iOpenTrophySnackbar()
          }
          window.localStorage.setItem('trainingLeft', 2)
          getAllData()
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
        fullWidth
        maxWidth="md"
      >
        <Grid container>
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
                        <TableCell align="center">{team1.name}</TableCell>
                        <TableCell align="center">{game.team1}</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell align="center">Name</TableCell>
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
                              <TableCell align="center">
                                <Avatar
                                  alt={player.Player.lastName}
                                  src={player.Player.photo}
                                  style={{ width: '60px', height: '60px' }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                {player.Player.firstName}
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
                        <TableCell align="center">{team2.name}</TableCell>
                        <TableCell align="center">{game.team2}</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell align="center">Name</TableCell>
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
                              <TableCell align="center">
                                <Avatar
                                  alt={player.Player.lastName}
                                  src={player.Player.photo}
                                  style={{ width: '60px', height: '60px' }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                {player.Player.firstName}
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
        </Grid>
      </Dialog>
    </>
  )
}

export default Match
