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
import { Avatar, Button, Grow } from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import PlayerValue from '../../mutliple/PlayerValue'
import PlayerStatChip from '../../mutliple/PlayerStatChip'
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball'
import ForwardIcon from '@material-ui/icons/Forward'
import EventSeatIcon from '@material-ui/icons/EventSeat'

function MyTeam() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)

  const getAllData = async () => {
    try {
      await getMyTeam()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)

      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const putInLineUp = async (playerUuid) => {
    await Axios.put(`${apiUrl}/players/${playerUuid}`, {
      isBench: false
    })
    await getMyTeam()
  }
  const putOutLineUp = async (playerUuid) => {
    await Axios.put(`${apiUrl}/players/${playerUuid}`, {
      isBench: true
    })
    await getMyTeam()
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
            style={{ width: '90%', margin: '100px auto 0px' }}
          >
            <Button
              style={{ margin: '10px 0px 0px 10px ' }}
              endIcon={<SportsBasketballIcon />}
              variant="contained"
              color="secondary"
            >
              line-up
            </Button>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell width="25%" align="center">
                    Name
                  </TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Scoring</TableCell>
                  <TableCell align="center">Rebound</TableCell>
                  <TableCell align="center">Pass</TableCell>
                  <TableCell align="center">Put on bench</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.filter((player) => !player.isBench)
                  .sort(function (a, b) {
                    return new Date(a.updatedAt) - new Date(b.updatedAt)
                  })
                  .map((player) => (
                    <Grow in>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Avatar src={player.photo} />
                        </TableCell>
                        <TableCell align="center">{`${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell align="center">
                          <PlayerValue playerValue={player.value} />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.ptsMin}
                            statBeg={player.ptsBeg}
                            statMax={player.ptsMax}
                            divisor={35}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.rebMin}
                            statBeg={player.rebBeg}
                            statMax={player.rebMax}
                            divisor={13}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.pasMin}
                            statBeg={player.pasBeg}
                            statMax={player.pasMax}
                            divisor={11}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: 'rgb(217, 48, 33)'
                            }}
                            size="small"
                            onClick={() => putOutLineUp(player.uuid)}
                            endIcon={
                              <ForwardIcon
                                style={{
                                  transform: 'rotate(90deg)'
                                }}
                              />
                            }
                          >
                            out
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Grow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            elevation={10}
            component={Paper}
            style={{ width: '90%', margin: '30px auto ' }}
          >
            <Button
              style={{ margin: '10px 0px 0px 10px ' }}
              endIcon={<EventSeatIcon />}
              variant="contained"
              color="secondary"
            >
              bench
            </Button>

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell width="25%" align="center">
                    Name
                  </TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Scoring</TableCell>
                  <TableCell align="center">Rebound</TableCell>
                  <TableCell align="center">Pass</TableCell>
                  <TableCell align="center">Put in line-up</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.filter((player) => player.isBench)
                  .sort(function (a, b) {
                    return new Date(a.updatedAt) - new Date(b.updatedAt)
                  })
                  .map((player) => (
                    <Grow in>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Avatar src={player.photo} />
                        </TableCell>
                        <TableCell align="center">{`${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell align="center">
                          <PlayerValue playerValue={player.value} />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.ptsMin}
                            statBeg={player.ptsBeg}
                            statMax={player.ptsMax}
                            divisor={35}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.rebMin}
                            statBeg={player.rebBeg}
                            statMax={player.rebMax}
                            divisor={13}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <PlayerStatChip
                            statMin={player.pasMin}
                            statBeg={player.pasBeg}
                            statMax={player.pasMax}
                            divisor={11}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: 'rgb(76, 175, 80)'
                            }}
                            size="small"
                            onClick={() => putInLineUp(player.uuid)}
                            endIcon={
                              <ForwardIcon
                                style={{
                                  transform: 'rotate(270deg)'
                                }}
                              />
                            }
                          >
                            in
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Grow>
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
