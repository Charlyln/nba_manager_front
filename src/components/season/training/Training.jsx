import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  Avatar,
  Box,
  CircularProgress,
  Typography,
  Fab,
  Chip
} from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import HeadShake from 'react-reveal/HeadShake'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DoneIcon from '@material-ui/icons/Done'

function Training() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [trainingLeft, setTrainingLeft] = useState(
    parseFloat(window.localStorage.getItem('trainingLeft'))
  )
  const [counter, setCounter] = useState(0)
  const [myProfilData, setMyProfilData] = useState([])
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)

  const iOpenTrophySnackbar = () => {
    setOpenTrophySnackbar(true)
  }

  const closeTrophySnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenTrophySnackbar(false)
  }

  useEffect(() => {
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyProfil = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users/${UserUuid}`)
      setMyProfilData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
      await getMyProfil()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const checkTrophy = async () => {
    try {
      if (
        myProfilData.Trophies.find(
          (trophy) => trophy.name === 'Increase a player stat' && trophy.earned
        )
      ) {
        console.log('already earned')
      } else {
        await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
          name: 'Increase a player stat'
        })
        console.log('no earned')
        iOpenTrophySnackbar()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const riseUpScoring = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        checkTrophy()
        if (min + max < 68) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            ptsMin: min + 1,
            ptsMax: max + 1
          })

          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          getMyTeam()
        } else if (min + max === 68) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            ptsMin: min + 1
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          getMyTeam()
        }
      } else {
        setCounter((counter) => counter + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const riseUpRebound = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        checkTrophy()
        if (min + max < 25) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            rebMin: min + 0.4,
            rebMax: max + 0.3
          })

          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          getMyTeam()
        } else if (min + max < 25.7) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            rebMin: min + 0.2
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          getMyTeam()
        }
      } else {
        setCounter((counter) => counter + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const riseUpPass = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        checkTrophy()
        if (min + max < 21) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            pasMin: min + 0.2,
            pasMax: max + 0.2
          })

          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)

          getMyTeam()
        } else if (min + max < 21.7) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            pasMin: min + 0.2
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)

          getMyTeam()
        }
      } else {
        setCounter((counter) => counter + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AccountVerify />
      {isLoading ? (
        <>
          <ProgressBall />
        </>
      ) : (
        <>
          <TrophySnackbar
            openTrophySnackbar={openTrophySnackbar}
            closeTrophySnackbar={closeTrophySnackbar}
            trophyName={'Increase a player stat'}
          />
          <TableContainer
            component={Paper}
            style={{ width: '90%', margin: '100px auto', padding: '0px 5px' }}
          >
            <div style={{ float: 'right', display: 'flex' }}>
              <Typography
                variant="button"
                component="div"
                color="textSecondary"
                style={{
                  color: '#616060',
                  alignSelf: 'center',
                  margin: '5px 10px 0px 0px'
                }}
              >
                <strong>Trainings left</strong>
              </Typography>
              <HeadShake spy={counter}>
                <Fab
                  size="small"
                  aria-label="add"
                  style={{
                    margin: '5px 0px 0px 2px',
                    width: '35px',
                    height: '35px',
                    backgroundColor:
                      trainingLeft === 2
                        ? 'rgb(76, 175, 80)'
                        : trainingLeft === 1
                        ? '#FB8B3C'
                        : 'rgb(217, 48, 33)'
                  }}
                >
                  {trainingLeft}
                </Fab>
              </HeadShake>
            </div>

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Photo</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Value</TableCell>
                  <TableCell align="center">Scoring</TableCell>
                  <TableCell align="center">Rebound</TableCell>
                  <TableCell align="center">Pass</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.value) - new Date(a.value)
                }).map((player) => (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <Avatar style={{ margin: 'auto' }} src={player.photo} />
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
                    <TableCell align="center">
                      {Math.round(
                        ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                      ) === 99 ? (
                        <Chip
                          label={Math.round(
                            ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                          )}
                          onDelete
                          deleteIcon={<DoneIcon  />}
                          clickable={false}
                         
                        />
                      ) : (
                        <Chip
                          onDelete={() =>
                            riseUpScoring(
                              player.ptsMin,
                              player.ptsMax,
                              player.uuid
                            )
                          }
                          deleteIcon={
                            <AddCircleIcon
                              fontSize="small"
                              style={{ color: 'white',width:'19px' }}
                            />
                          }
                          label={Math.round(
                            ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                          )}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Math.round(
                        ((player.rebMin + player.rebMax) / 2 / 13) * 100
                      ) === 99 ? (
                        <Chip
                          label={Math.round(
                            ((player.rebMin + player.rebMax) / 2 / 13) * 100
                          )}
                          onDelete
                          deleteIcon={<DoneIcon />}
                        />
                      ) : (
                        <Chip
                          onDelete={() =>
                            riseUpRebound(
                              player.rebMin,
                              player.rebMax,
                              player.uuid
                            )
                          }
                          deleteIcon={
                            <AddCircleIcon
                              fontSize="small"
                              style={{ color: 'white',width:'19px' }}
                            />
                          }
                          label={Math.round(
                            ((player.rebMin + player.rebMax) / 2 / 13) * 100
                          )}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Math.round(
                        ((player.pasMin + player.pasMax) / 2 / 11) * 100
                      ) === 99 ? (
                        <Chip
                          label={Math.round(
                            ((player.pasMin + player.pasMax) / 2 / 11) * 100
                          )}
                          onDelete
                          deleteIcon={<DoneIcon />}
                        />
                      ) : (
                        <Chip
                          onDelete={() =>
                            riseUpPass(
                              player.pasMin,
                              player.pasMax,
                              player.uuid
                            )
                          }
                          deleteIcon={
                            <AddCircleIcon
                              fontSize="small"
                              style={{ color: 'white',width:'19px' }}
                            />
                          }
                          label={Math.round(
                            ((player.pasMin + player.pasMax) / 2 / 11) * 100
                          )}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default Training
