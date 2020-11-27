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
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'

function Contracts() {
  const [myteamData, setMyTeamData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [mySeason, setMySeason] = useState({})

  useEffect(() => {
    getMyTeam()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMySeason = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/seasons/myseason/${SeasonUuid}`)
      setMySeason(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${userUuid}`)
      setMyTeamData(res.data)
      await getMySeason()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const renderTableCellsSalary = (yearsLeft, salary) => {
    if (yearsLeft === 1) {
      return (
        <>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
        </>
      )
    } else if (yearsLeft === 2) {
      return (
        <>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
        </>
      )
    } else if (yearsLeft === 3) {
      return (
        <>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
        </>
      )
    } else if (yearsLeft === 4) {
      return (
        <>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
          <TableCell align="right">{`${
            salary / 1000000
          } millions $`}</TableCell>
        </>
      )
    } else return ''
  }

  return (
    <>
      {isLoading ? (
        <ProgressBall />
      ) : (
        <>
          <AccountVerify />
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
                  <TableCell align="right">{`${mySeason.startYear} - ${mySeason.endYear}`}</TableCell>
                  <TableCell align="right">{`${mySeason.startYear + 1} - ${
                    mySeason.endYear + 1
                  }`}</TableCell>
                  <TableCell align="right">{`${mySeason.startYear + 2} - ${
                    mySeason.endYear + 2
                  }`}</TableCell>
                  <TableCell align="right">{`${mySeason.startYear + 3} - ${
                    mySeason.endYear + 3
                  }`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.salary) - new Date(a.salary)
                }).map((player) => (
                  <TableRow hover>
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
                    {renderTableCellsSalary(player.contractLeft, player.salary)}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {` ${
                      myteamData.Players.filter(
                        (player) => player.contractLeft > 0
                      ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                    } millions $`}
                  </TableCell>
                  <TableCell align="right">
                    {` ${
                      myteamData.Players.filter(
                        (player) => player.contractLeft > 1
                      ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                    } millions $`}
                  </TableCell>{' '}
                  <TableCell align="right">
                    {` ${
                      myteamData.Players.filter(
                        (player) => player.contractLeft > 2
                      ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                    } millions $`}
                  </TableCell>
                  <TableCell align="right">
                    {` ${
                      myteamData.Players.filter(
                        (player) => player.contractLeft > 3
                      ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                    } millions $`}
                  </TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell></TableCell>
                  <TableCell>Salary cap balance</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {` ${
                      (-myteamData.Players.filter(
                        (player) => player.contractLeft > 0
                      ).reduce((a, v) => (a = a + v.salary), 0) +
                        100000000) /
                      1000000
                    } millions $`}
                  </TableCell>
                  <TableCell align="right">
                    {` ${
                      (-myteamData.Players.filter(
                        (player) => player.contractLeft > 1
                      ).reduce((a, v) => (a = a + v.salary), 0) +
                        100000000) /
                      1000000
                    } millions $`}
                  </TableCell>
                  <TableCell align="right">
                    {` ${
                      (-myteamData.Players.filter(
                        (player) => player.contractLeft > 2
                      ).reduce((a, v) => (a = a + v.salary), 0) +
                        100000000) /
                      1000000
                    } millions $`}
                  </TableCell>
                  <TableCell align="right">
                    {` ${
                      (-myteamData.Players.filter(
                        (player) => player.contractLeft > 3
                      ).reduce((a, v) => (a = a + v.salary), 0) +
                        100000000) /
                      1000000
                    } millions $`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default Contracts
