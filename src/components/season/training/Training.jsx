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
  IconButton
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Alert from '@material-ui/lab/Alert'

function Training() {
  const [myteamData, setMyTeamData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [trainingLeft, setTrainingLeft] = useState(
    parseFloat(window.localStorage.getItem('trainingLeft'))
  )

  useEffect(() => {
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${userUuid}`)
      setMyTeamData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const riseUpScoring = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        if (min + max < 68) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            ptsMin: min + 1,
            ptsMax: max + 1
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          await getMyTeam()
        } else if (min + max === 68) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            ptsMin: min + 1
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          await getMyTeam()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  const riseUpRebound = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        if (min + max < 25) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            rebMin: min + 0.4,
            rebMax: max + 0.3
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          await getMyTeam()
        } else if (min + max < 25.7) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            rebMin: min + 0.2
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)
          await getMyTeam()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  const riseUpPass = async (min, max, uuid) => {
    try {
      if (trainingLeft > 0) {
        if (min + max < 21) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            pasMin: min + 0.2,
            pasMax: max + 0.2
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)

          await getMyTeam()
        } else if (min + max < 21.7) {
          await Axios.put(`${apiUrl}/players/${uuid}`, {
            pasMin: min + 0.2
          })
          window.localStorage.setItem('trainingLeft', trainingLeft - 1)
          setTrainingLeft(trainingLeft - 1)

          await getMyTeam()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isLoading ? (
        <p style={{ marginTop: '100px' }}>loading...</p>
      ) : (
        <TableContainer
          component={Paper}
          style={{ width: '90%', margin: '100px auto ' }}
        >
          <Alert
            style={{ width: 'max-content' }}
            icon={false}
            variant="filled"
            severity={
              trainingLeft === 2
                ? 'success'
                : trainingLeft === 1
                ? 'warning'
                : 'error'
            }
          >
            {`${trainingLeft} / 2`}
          </Alert>

          {/* <h4 style={{ textAlign: 'center' }}>
            {trainingLeft > 0
              ? 'Select the player and the skill you want to train.'
              : 'You must simulate matchs to have other trainings.'}
          </h4> */}
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
                      <CircularProgress variant="static" value={player.value} />
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
                    )}
                    <IconButton
                      onClick={() =>
                        riseUpScoring(player.ptsMin, player.ptsMax, player.uuid)
                      }
                    >
                      <AddBoxIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {Math.round(
                      ((player.rebMin + player.rebMax) / 2 / 13) * 100
                    )}
                    <IconButton
                      onClick={() =>
                        riseUpRebound(player.rebMin, player.rebMax, player.uuid)
                      }
                    >
                      <AddBoxIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {Math.round(
                      ((player.pasMin + player.pasMax) / 2 / 11) * 100
                    )}
                    <IconButton
                      onClick={() =>
                        riseUpPass(player.pasMin, player.pasMax, player.uuid)
                      }
                    >
                      <AddBoxIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default Training