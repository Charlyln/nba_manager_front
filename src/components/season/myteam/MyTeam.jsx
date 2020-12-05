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
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import FreePlayer from './FreePlayer'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import PlayerValue from '../../mutliple/PlayerValue'

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
                      <PlayerValue playerValue={player.value} />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        avatar={
                          player.ptsMin > player.ptsBeg && player.ptsBeg ? (
                            <>
                              <ArrowDropDownCircleIcon
                                style={{
                                  margin: '0px -8px 0px 5px',
                                  transform: 'rotate(180deg)',
                                  color: 'rgb(76, 175, 80)'
                                }}
                              />
                            </>
                          ) : (
                            ''
                          )
                        }
                        label={Math.round(
                          ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        avatar={
                          player.rebMin > player.rebBeg && player.rebBeg ? (
                            <>
                              <ArrowDropDownCircleIcon
                                style={{
                                  margin: '0px -8px 0px 5px',
                                  transform: 'rotate(180deg)',
                                  color: 'rgb(76, 175, 80)'
                                }}
                              />
                            </>
                          ) : (
                            ''
                          )
                        }
                        label={Math.round(
                          ((player.rebMin + player.rebMax) / 2 / 13) * 100
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        avatar={
                          player.pasMin > player.pasBeg && player.pasBeg ? (
                            <>
                              <ArrowDropDownCircleIcon
                                style={{
                                  margin: '0px -8px 0px 5px',
                                  transform: 'rotate(180deg)',
                                  color: 'rgb(76, 175, 80)'
                                }}
                              />
                            </>
                          ) : (
                            ''
                          )
                        }
                        label={Math.round(
                          ((player.pasMin + player.pasMax) / 2 / 11) * 100
                        )}
                      />
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
