import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Box,
  CircularProgress,
  Typography,
  Paper
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../apiUrl'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import SignPlayer from '../season/freeagents/SignPlayer'

function OffSeasonDialog({ goNext, canGoNext, step, TeamUuid }) {
  const [open, setOpen] = React.useState(false)
  const [playersData, setPlayersData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [myteamData, setMyTeamData] = useState({})

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const goNextStep = async () => {
    if (step === 'Retirements') {
      await Axios.post(`${apiUrl}/players/retirements/${userUuid}`)
    } else if (step === 'Player options') {
      await Axios.post(`${apiUrl}/players/playerOptions/${TeamUuid}`)
    }
    goNext()
    handleClose()
  }

  // const addPlayerDoNotExtand = (playerId) => {
  //   PlayersDoNotExtend.push(playerId)
  // }

  useEffect(() => {
    getPlayers()
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${userUuid}`)
      setMyTeamData(res.data)
      setIsLoading2(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getPlayers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/players/${userUuid}`)
      setPlayersData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button
        disabled={canGoNext}
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
      >
        open
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>{step}</DialogTitle>

        {isLoading || isLoading2 ? (
          'Loading...'
        ) : (
          <DialogContent>
            <TableContainer component={Paper} style={{ width: '98%' }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="center">Value</TableCell>
                    <TableCell align="center">Age</TableCell>

                    {step === 'Player progress' ? (
                      <>
                        <TableCell align="center">Scoring</TableCell>
                        <TableCell align="center">Rebound</TableCell>
                        <TableCell align="center">Pass</TableCell>
                      </>
                    ) : step === 'Player options' ? (
                      <>
                        <TableCell align="center">
                          Years contract left
                        </TableCell>

                        <TableCell align="center">
                          Propose new contract
                        </TableCell>
                      </>
                    ) : (
                      ''
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {myteamData.Players.sort(function (a, b) {
                    return new Date(b.value) - new Date(a.value)
                  })
                    .filter((player) =>
                      step === 'Player progress'
                        ? player
                        : step === 'Player options'
                        ? player.contractLeft === 0
                        : ''
                    )
                    .map((player) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Avatar src={player.photo} />
                        </TableCell>
                        <TableCell align="right">{`${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell align="right">
                          <Box position="relative" display="inline-flex">
                            <CircularProgress
                              variant="static"
                              value={player.value}
                            />
                            <Box
                              top={0}
                              left={0}
                              bottom={0}
                              right={0}
                              position="absolute"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography
                                variant="button"
                                component="div"
                                color="textSecondary"
                              >
                                <strong>{player.value}</strong>
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {step === 'Player progress' ? (
                          <>
                            {' '}
                            <TableCell align="right">
                              {player.ptsMin > player.ptsBeg &&
                              player.ptsBeg ? (
                                <>
                                  <ArrowUpwardIcon
                                    style={{
                                      backgroundColor: 'green',
                                      fontSize: '1rem',
                                      borderRadius: '100%'
                                    }}
                                  />
                                </>
                              ) : (
                                ''
                              )}{' '}
                              {Math.round(
                                ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {player.rebMin > player.rebBeg &&
                              player.rebBeg ? (
                                <>
                                  <ArrowUpwardIcon
                                    style={{
                                      backgroundColor: 'green',
                                      fontSize: '1rem',
                                      borderRadius: '100%'
                                    }}
                                  />
                                </>
                              ) : (
                                ''
                              )}{' '}
                              {Math.round(
                                ((player.rebMin + player.rebMax) / 2 / 13) * 100
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {player.pasMin > player.pasBeg &&
                              player.pasBeg ? (
                                <>
                                  <ArrowUpwardIcon
                                    style={{
                                      backgroundColor: 'green',
                                      fontSize: '1rem',
                                      borderRadius: '100%'
                                    }}
                                  />
                                </>
                              ) : (
                                ''
                              )}{' '}
                              {Math.round(
                                ((player.pasMin + player.pasMax) / 2 / 11) * 100
                              )}
                            </TableCell>
                          </>
                        ) : step === 'Player options' ? (
                          <>
                            <TableCell align="center">{`${player.age}`}</TableCell>
                            <TableCell align="center">
                              {`${player.contractLeft}`}
                            </TableCell>

                            <TableCell align="center">
                              <SignPlayer
                                player={player}
                                contractLeft={player.contractLeft}
                                getMyTeamInDialog={getMyTeam}
                              />
                            </TableCell>
                          </>
                        ) : (
                          ''
                        )}
                      </TableRow>
                    ))}
                </TableBody>

                <TableBody>
                  {playersData
                    .sort(function (a, b) {
                      return new Date(b.value) - new Date(a.value)
                    })
                    .filter((player) =>
                      step === 'Retirements'
                        ? player.age > 38
                        : step === 'Free agency'
                        ? !player.TeamUuid &&
                          player.age <= 38 &&
                          player.age >= 21
                        : step === 'Draft'
                        ? player.age < 21
                        : ''
                    )
                    .map((player) => (
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          <Avatar
                            style={{
                              margin: 'auto',
                              width: '50px',
                              height: '50px'
                            }}
                            src={player.photo}
                          />
                        </TableCell>
                        <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell align="left">
                          <Box position="relative" display="inline-flex">
                            <CircularProgress
                              variant="static"
                              value={player.value}
                            />
                            <Box
                              top={0}
                              left={0}
                              bottom={0}
                              right={0}
                              position="absolute"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography
                                variant="button"
                                component="div"
                                color="textSecondary"
                              >
                                <strong>{player.value}</strong>
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{player.age}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            back
          </Button>
          <Button onClick={goNextStep} variant="contained" color="primary">
            done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OffSeasonDialog
