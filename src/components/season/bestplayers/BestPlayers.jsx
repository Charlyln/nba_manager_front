import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Typography,
  ListItem,
  ListItemText
} from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import { apiUrl } from '../../../apiUrl'
import AccountVerify from '../../mutliple/AccountVerify'

function BestPlayers() {
  const [playersData, setPlayersData] = useState([])
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))

  useEffect(() => {
    getPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlayers = async () => {
    try {
      const res = await Axios.get(
        `${apiUrl}/players/bestPlayers/${UserUuid}/${SeasonUuid}`
      )
      setPlayersData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
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
          <Grid
            container
            style={{
              marginTop: '100px',
              marginBottom: '50px',
              justifyContent: 'center'
            }}
          >
            {playersData.length === 0 ? (
              <Paper style={{ width: '400px', margin: 'auto' }}>
                <ListItem>
                  <ListItemText>
                    You must play at least 1 game to see best players in the
                    season.
                  </ListItemText>
                </ListItem>
              </Paper>
            ) : (
              <TableContainer component={Paper} style={{ width: '70%' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Rank</TableCell>
                      <TableCell align="center">Photo</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="center">Value</TableCell>
                      <TableCell align="center">
                        Scoring average / game
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {playersData.map((player, i) => (
                      <TableRow hover>
                        <TableCell align="center" component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Avatar
                            style={{ margin: 'auto' }}
                            src={player.photo}
                          />
                        </TableCell>
                        <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell align="center">
                          <Box position="relative" display="inline-flex">
                            <CircularProgress
                              variant="static"
                              value={player.value}
                              color={
                                player.TeamUuid === TeamUuid
                                  ? 'secondary'
                                  : 'primary'
                              }
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
                        <TableCell align="center">{`${(
                          player.PlayerStats.reduce(
                            (a, v) => (a = a + v.pts),
                            0
                          ) / player.PlayerStats.length
                        ).toFixed(1)}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </>
      )}
    </>
  )
}
export default BestPlayers
