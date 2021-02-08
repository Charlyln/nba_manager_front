import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { Grid, Avatar, ListItem, ListItemText } from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import { apiUrl } from '../../../apiUrl'
import AccountVerify from '../../mutliple/AccountVerify'
import PlayerValue from '../../mutliple/PlayerValue'

function BestPlayers() {
  const [playersData, setPlayersData] = useState([])
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [token] = useState(sessionStorage.getItem('token'))

  useEffect(() => {
    getPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlayers = async () => {
    try {
      const res = await Axios.get(
        `${apiUrl}/players/bestPlayers/${UserUuid}/${SeasonUuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setPlayersData(res.data.bestPlayersSorted)
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
              <TableContainer
                elevation={10}
                component={Paper}
                style={{ width: '70%' }}
              >
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
                          <PlayerValue playerValue={player.value} />
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
