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
  Typography
} from '@material-ui/core'
import SignPlayer from '../freeagents/SignPlayer'

function Extensions() {
  const [myteamData, setMyTeamData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <>
      {isLoading ? (
        <p style={{ marginTop: '100px' }}>loading...</p>
      ) : (
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
                <TableCell align="center">Salary expectations</TableCell>
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
                    <TableCell align="center">{player.contractLeft}</TableCell>
                    <TableCell align="center">
                      {player.value * 125000}
                    </TableCell>
                    <TableCell align="center">
                      <SignPlayer
                        player={player}
                        getMyTeamData={getMyTeam}
                        contractLeft={player.contractLeft}
                      />
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

export default Extensions
