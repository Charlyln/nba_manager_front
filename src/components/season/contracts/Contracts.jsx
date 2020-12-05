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
  Chip,
  CircularProgress,
  Typography
} from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import PlayerValue from '../../mutliple/PlayerValue'

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

  const renderTableCellsSalary = (yearsLeft, salary, player) => {
    const years = [
      player.contractYear1,
      player.contractYear2,
      player.contractYear3,
      player.contractYear4
    ]

    return years.map((year) => (
      <>
        {year ? (
          <TableCell align="right">
            <Chip
              avatar={<MonetizationOnIcon />}
              label={`${year / 1000000} MM`}
            />
          </TableCell>
        ) : (
          ''
        )}
      </>
    ))
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
          <TableContainer
            elevation={10}
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
                      <PlayerValue playerValue={player.value} />
                    </TableCell>
                    {renderTableCellsSalary(
                      player.contractLeft,
                      player.salary,
                      player
                    )}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.filter(
                          (player) => player.contractLeft > 0
                        ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.filter(
                          (player) => player.contractLeft > 1
                        ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.filter(
                          (player) => player.contractLeft > 2
                        ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.filter(
                          (player) => player.contractLeft > 3
                        ).reduce((a, v) => (a = a + v.salary), 0) / 1000000
                      } MM`}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Chip
                      style={{
                        backgroundColor:
                          myteamData.Players.reduce(
                            (a, v) => (a = a + v.contractYear1),
                            0
                          ) < 100000000
                            ? 'rgb(76, 175, 80)'
                            : 'rgb(217, 48, 33)'
                      }}
                      color="blue"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        (-myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear1),
                          0
                        ) +
                          100000000) /
                        1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      style={{
                        backgroundColor:
                          myteamData.Players.reduce(
                            (a, v) => (a = a + v.contractYear2),
                            0
                          ) < 100000000
                            ? 'rgb(76, 175, 80)'
                            : 'rgb(217, 48, 33)'
                      }}
                      color="secondary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        (-myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear2),
                          0
                        ) +
                          100000000) /
                        1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      style={{
                        backgroundColor:
                          myteamData.Players.reduce(
                            (a, v) => (a = a + v.contractYear3),
                            0
                          ) < 100000000
                            ? 'rgb(76, 175, 80)'
                            : 'rgb(217, 48, 33)'
                      }}
                      color="secondary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        (-myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear3),
                          0
                        ) +
                          100000000) /
                        1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      style={{
                        backgroundColor:
                          myteamData.Players.reduce(
                            (a, v) => (a = a + v.contractYear4),
                            0
                          ) < 100000000
                            ? 'rgb(76, 175, 80)'
                            : 'rgb(217, 48, 33)'
                      }}
                      color="secondary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        (-myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear4),
                          0
                        ) +
                          100000000) /
                        1000000
                      } MM`}
                    />
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
