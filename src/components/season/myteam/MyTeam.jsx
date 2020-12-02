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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import FreePlayer from './FreePlayer'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'

function MyTeam() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Fire a player')

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
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)

      getTrophy()
      setIsLoading(false)
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
                  <TableCell>Photo</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Scoring</TableCell>
                  <TableCell align="right">Rebound</TableCell>
                  <TableCell align="right">Pass</TableCell>
                  <TableCell align="center">Fire player</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.value) - new Date(a.value)
                }).map((player) => (
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
                    <TableCell align="right">
                      {player.ptsMin > player.ptsBeg && player.ptsBeg ? (
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
                      {player.rebMin > player.rebBeg && player.rebBeg ? (
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
                      {player.pasMin > player.pasBeg && player.pasBeg ? (
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
                    <TableCell align="center">
                      <FreePlayer
                        player={player}
                        getMyTeam={getMyTeam}
                        iOpenTrophySnackbar={iOpenTrophySnackbar}
                        TrophyData={TrophyData}
                        trophyName={trophyName}
                        UserUuid={UserUuid}
                        myteamData={myteamData}
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

export default MyTeam
