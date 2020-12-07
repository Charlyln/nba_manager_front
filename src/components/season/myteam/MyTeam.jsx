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
import { Avatar, Typography } from '@material-ui/core'
import FreePlayer from './FreePlayer'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import PlayerValue from '../../mutliple/PlayerValue'
import PlayerStatChip from '../../mutliple/PlayerStatChip'
import getMyRookies from '../../api calls/getMyRookies'
import SignPlayer from '../../mutliple/signPlayer/SignPlayer'

function MyTeam() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Fire a player')
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [myRookies, setMyRookies] = useState([])

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
      await getMyTeam()
      const rookies = await getMyRookies(UserUuid, TeamUuid)
      setMyRookies(rookies.data)
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
            <Typography
              variant="button"
              component="div"
              color="textSecondary"
              style={{
                color: 'rgb(128 127 127)',
                margin: '5px 0px 0px 10px'
              }}
            >
              <strong>My players</strong>
            </Typography>
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
          <TableContainer
            elevation={10}
            component={Paper}
            style={{ width: '90%', margin: '100px auto ' }}
          >
            <Typography
              variant="button"
              component="div"
              color="textSecondary"
              style={{
                color: 'rgb(128 127 127)',
                margin: '5px 0px 0px 10px'
              }}
            >
              <strong>My rookies</strong>
            </Typography>
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
                  <TableCell align="center">Sign contract</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myRookies
                  .sort(function (a, b) {
                    return new Date(b.value) - new Date(a.value)
                  })
                  .map((player) => (
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
                        <SignPlayer
                          player={player}
                          getMyTeam={getMyTeam}
                          contractLeft={player.contractLeft}
                          TrophyData={TrophyData}
                          TeamUuid={TeamUuid}
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
