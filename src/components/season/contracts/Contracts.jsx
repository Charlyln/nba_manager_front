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
import { Avatar, Chip } from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import PlayerValue from '../../mutliple/PlayerValue'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import FreePlayer from './FreePlayer'
import { useDispatch } from 'react-redux'
import allActions from '../../../actions'

function Contracts() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [mySeason, setMySeason] = useState({})
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Fire a player')
  const dispatch = useDispatch()

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

  const getAllData = async () => {
    try {
      dispatch(allActions.loadingActions.setLoadingTrue())
      dispatch(allActions.tutorialActions.setGeneralStepZero())
      await getMyTeam()
      await getTrophy()
      await getMySeason()
      setIsLoading(false)
      dispatch(allActions.loadingActions.setLoadingFalse())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData()
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
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderTableCellsSalary = (player) => {
    const years = [
      player.contractYear1,
      player.contractYear2,
      player.contractYear3,
      player.contractYear4
    ]

    return years.map((year) => (
      <>
        {year ? (
          <TableCell align="center">
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
          <TrophySnackbar
            openTrophySnackbar={openTrophySnackbar}
            closeTrophySnackbar={closeTrophySnackbar}
            trophyName={trophyName}
          />
          <TableContainer
            elevation={10}
            component={Paper}
            style={{ width: '90%', margin: '100px auto ' }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Fire player</TableCell>
                  <TableCell
                    align="center"
                    className="tutoContracts2"
                  >{`${mySeason.startYear} - ${mySeason.endYear}`}</TableCell>
                  <TableCell align="center">{`${mySeason.startYear + 1} - ${
                    mySeason.endYear + 1
                  }`}</TableCell>
                  <TableCell align="center">{`${mySeason.startYear + 2} - ${
                    mySeason.endYear + 2
                  }`}</TableCell>
                  <TableCell align="center">{`${mySeason.startYear + 3} - ${
                    mySeason.endYear + 3
                  }`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.contractYear1) - new Date(a.contractYear1)
                }).map((player) => (
                  <TableRow hover>
                    <TableCell component="th" scope="row">
                      <Avatar src={player.photo} />
                    </TableCell>
                    <TableCell align="center">{`${player.firstName} ${player.lastName}`}</TableCell>
                    <TableCell align="center">
                      <PlayerValue playerValue={player.value} />
                    </TableCell>
                    <TableCell align="center">{player.age}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
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
                    {renderTableCellsSalary(player)}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">
                    <Chip
                      className="tutoContracts1"
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear1),
                          0
                        ) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      className="tutoContracts3"
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear2),
                          0
                        ) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear3),
                          0
                        ) / 1000000
                      } MM`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color="primary"
                      icon={<MonetizationOnIcon />}
                      label={` ${
                        myteamData.Players.reduce(
                          (a, v) => (a = a + v.contractYear4),
                          0
                        ) / 1000000
                      } MM`}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">
                    <Chip
                      className="tutoContracts4"
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
                  <TableCell align="center">
                    <Chip
                      className="tutoContracts5"
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
                  <TableCell align="center">
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
                  <TableCell align="center">
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
