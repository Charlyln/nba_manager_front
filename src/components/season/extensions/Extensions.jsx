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

function Extensions() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Sign a extention')
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
      await getMyTeam()
      await getTrophy()
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (error) {
      console.log(error)
    }
  }

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
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
                  <TableCell align="center">Years contract left</TableCell>
                  {/* <TableCell align="center">Salary expectations</TableCell> */}
                  <TableCell align="center">Propose extension</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.salary) - new Date(a.salary)
                })
                  .filter((player) => player.contractLeft < 2)
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
                      <TableCell align="center">
                        {player.contractLeft}
                      </TableCell>
                      {/* <TableCell align="center">
                      {player.value * 125000}
                    </TableCell> */}
                      <TableCell align="center">
                        <SignPlayer
                          player={player}
                          getMyTeam={getMyTeam}
                          contractLeft={player.contractLeft}
                          TrophyData={TrophyData}
                          iOpenTrophySnackbar={iOpenTrophySnackbar}
                          trophyName={trophyName}
                          TeamUuid={TeamUuid}
                          getTrophy={getTrophy}
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

export default Extensions
