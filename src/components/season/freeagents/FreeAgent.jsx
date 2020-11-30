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
import { Avatar, Box, CircularProgress, Typography } from '@material-ui/core'
import SignPlayer from '../../mutliple/signPlayer/SignPlayer'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'

function FreeAgent() {
  // const [playersData, setPlayersData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [namesFiltered, SetnamesFiltered] = useState([])
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Sign a free agent')
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))

  const iOpenTrophySnackbar = () => {
    setOpenTrophySnackbar(true)
  }

  const closeTrophySnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenTrophySnackbar(false)
  }

  const getTrophy = async () => {
    try {
      const res = await Axios.get(
        `${apiUrl}/trophies/${trophyName}/${UserUuid}`
      )
      setTrophyData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      await getPlayers()
      await getTrophy()
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (error) {
      console.log(error)
    }
  }

  const getPlayers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/players/${UserUuid}`)
      // setPlayersData(res.data)
      SetnamesFiltered(res.data)
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
            trophyName={trophyName}
          />
          <TableContainer
            component={Paper}
            style={{ width: '90%', margin: '100px auto ' }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Photo</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Value</TableCell>
                  <TableCell align="center">Scoring</TableCell>
                  <TableCell align="center">Rebound</TableCell>
                  <TableCell align="center">Pass</TableCell>
                  <TableCell align="center">Sign</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {namesFiltered
                  .sort(function (a, b) {
                    return new Date(b.value) - new Date(a.value)
                  })
                  .filter((player) => !player.TeamUuid && !player.isRookie)

                  .map((player) => (
                    <TableRow hover>
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
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {Math.round(
                          ((player.rebMin + player.rebMax) / 2 / 13) * 100
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {Math.round(
                          ((player.pasMin + player.pasMax) / 2 / 11) * 100
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <SignPlayer
                          player={player}
                          getPlayers={getPlayers}
                          TrophyData={TrophyData}
                          iOpenTrophySnackbar={iOpenTrophySnackbar}
                          trophyName={trophyName}
                          TeamUuid={TeamUuid}
                          getTrophy={getTrophy}
                        />
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

export default FreeAgent
