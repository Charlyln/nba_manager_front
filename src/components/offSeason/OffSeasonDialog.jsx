import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Paper,
  Chip,
  Checkbox
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../apiUrl'
import SignPlayer from '../mutliple/signPlayer/SignPlayer'
import OffSeasonMessage from './OffSeasonMessage'
import PlayerValue from '../mutliple/PlayerValue'
import PlayerStatChip from '../mutliple/PlayerStatChip'

function OffSeasonDialog({
  goNext,
  canGoNext,
  step,
  TeamUuid,
  myteamData,
  playersData,
  getPlayers,
  getMyTeam,
  TrophyData,
  iOpenTrophySnackbar,
  trophyName,
  getTrophy,
  myPick
}) {
  const [open, setOpen] = React.useState(false)
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [openFreeAgencyMessage, setOpenFreeAgencyMessage] = useState(false)
  const [myPickChoice, setMyPickChoice] = useState('')

  useEffect(() => {
    getPlayers()
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
    getTrophy(step)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpenFreeAgencyMessage = () => {
    setOpenFreeAgencyMessage(true)
  }

  const handleCloseFreeAgencyMessage = () => {
    setOpenFreeAgencyMessage(false)
  }

  const goNextStep = async () => {
    if (step === 'Retirements') {
      await Axios.post(`${apiUrl}/players/retirements/${userUuid}`)
    } else if (step === 'Player options') {
      await Axios.post(`${apiUrl}/players/playerOptions/${TeamUuid}`)
    } else if (step === 'Draft' && myPickChoice) {
      await Axios.put(`${apiUrl}/players/${myPickChoice}`, {
        TeamUuid: myteamData.uuid,
        isBench: true,
        isRookie: false,
        contractLeft: 4,
        salary: 5000000,
        contractYear1: 5000000,
        contractYear2: 5000000,
        contractYear3: 5000000,
        contractYear4: 5000000
      })
    }

    if (step === 'Free agency') {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${userUuid}`)
      console.log(res.data.Players.length)

      if (res.data.Players.length > 4) {
        goNext()
        handleClose()
      } else if (res.data.Players.length <= 4) {
        handleClickOpenFreeAgencyMessage()
      }
    } else {
      goNext()
      handleClose()
    }

    getPlayers()
  }

  // const addPlayerDoNotExtand = (playerId) => {
  //   PlayersDoNotExtend.push(playerId)
  // }

  return (
    <>
      <OffSeasonMessage
        handleCloseFreeAgencyMessage={handleCloseFreeAgencyMessage}
        openFreeAgencyMessage={openFreeAgencyMessage}
      />
      <Button
        disabled={canGoNext}
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
      >
        open
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>{step}</DialogTitle>

        <DialogContent>
          <TableContainer component={Paper} style={{ width: '98%' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Photo</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Age</TableCell>

                  {step === 'Player progress' ? (
                    <>
                      <TableCell align="center">Scoring</TableCell>
                      <TableCell align="center">Rebound</TableCell>
                      <TableCell align="center">Pass</TableCell>
                    </>
                  ) : step === 'Player options' ? (
                    <>
                      <TableCell align="center">Years contract left</TableCell>

                      <TableCell align="center">Propose new contract</TableCell>
                    </>
                  ) : step === 'Free agency' ? (
                    <>
                      <TableCell align="center">Scoring</TableCell>
                      <TableCell align="center">Rebound</TableCell>
                      <TableCell align="center">Pass</TableCell>
                      <TableCell align="center">Sign</TableCell>
                    </>
                  ) : step === 'Draft' ? (
                    <>
                      <TableCell align="center">Scoring</TableCell>
                      <TableCell align="center">Rebound</TableCell>
                      <TableCell align="center">Pass</TableCell>
                      <TableCell align="center">Choose</TableCell>
                    </>
                  ) : (
                    ''
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.value) - new Date(a.value)
                })
                  .filter((player) =>
                    step === 'Player progress'
                      ? player
                      : step === 'Player options'
                      ? player.contractLeft === 0
                      : ''
                  )
                  .map((player) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Avatar src={player.photo} />
                      </TableCell>
                      <TableCell align="right">{`${player.firstName} ${player.lastName}`}</TableCell>
                      <TableCell align="right">
                        <PlayerValue playerValue={player.value} />
                      </TableCell>

                      {step === 'Player progress' ? (
                        <>
                          <TableCell align="center">{`${player.age}`}</TableCell>
                          <TableCell align="right">
                            <PlayerStatChip
                              statMin={player.ptsMin}
                              statBeg={player.ptsBeg}
                              statMax={player.ptsMax}
                              divisor={35}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <PlayerStatChip
                              statMin={player.rebMin}
                              statBeg={player.rebBeg}
                              statMax={player.rebMax}
                              divisor={13}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <PlayerStatChip
                              statMin={player.pasMin}
                              statBeg={player.pasBeg}
                              statMax={player.pasMax}
                              divisor={11}
                            />
                          </TableCell>
                        </>
                      ) : step === 'Player options' ? (
                        <>
                          <TableCell align="center">{`${player.age}`}</TableCell>
                          <TableCell align="center">
                            {`${player.contractLeft}`}
                          </TableCell>

                          <TableCell align="center">
                            <SignPlayer
                              player={player}
                              contractLeft={player.contractLeft}
                              getMyTeamInDialog={getMyTeam}
                              TrophyData={TrophyData}
                              iOpenTrophySnackbar={iOpenTrophySnackbar}
                              trophyName={trophyName}
                              TeamUuid={TeamUuid}
                              getTrophy={getTrophy}
                              step={step}
                              myteamData={myteamData}
                              getMyTeam={getMyTeam}
                            />
                          </TableCell>
                        </>
                      ) : (
                        ''
                      )}
                    </TableRow>
                  ))}
              </TableBody>

              <TableBody>
                {playersData
                  .sort(function (a, b) {
                    return new Date(b.value) - new Date(a.value)
                  })
                  .filter((player) =>
                    step === 'Retirements'
                      ? player.age > 38
                      : step === 'Free agency'
                      ? !player.TeamUuid && player.age <= 38 && !player.isRookie
                      : step === 'Draft'
                      ? player.isRookie
                      : ''
                  )
                  .map((player, i) => (
                    <TableRow>
                      <TableCell align="center" component="th" scope="row">
                        <Avatar
                          style={{
                            margin: 'auto',
                            width: '50px',
                            height: '50px'
                          }}
                          src={player.photo}
                        />
                      </TableCell>
                      <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>
                      <TableCell align="center">
                        {step === 'Draft' ? (
                          <Chip
                            label={`${Math.round(player.value) - 5} - ${
                              Math.round(player.value) + 5
                            }`}
                          />
                        ) : (
                          <PlayerValue playerValue={player.value} />
                        )}
                      </TableCell>
                      <TableCell align="center">{player.age}</TableCell>

                      {step === 'Free agency' ? (
                        <>
                          <TableCell align="center">
                            {Math.round(
                              ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {Math.round(
                              ((player.rebMin + player.rebMax) / 2 / 13) * 100
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {Math.round(
                              ((player.pasMin + player.pasMax) / 2 / 11) * 100
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <SignPlayer
                              player={player}
                              getPlayers={getPlayers}
                              TrophyData={TrophyData}
                              iOpenTrophySnackbar={iOpenTrophySnackbar}
                              trophyName={trophyName}
                              TeamUuid={TeamUuid}
                              getTrophy={getTrophy}
                              step={step}
                              myteamData={myteamData}
                              getMyTeam={getMyTeam}
                            />
                          </TableCell>
                        </>
                      ) : (
                        ''
                      )}

                      {step === 'Draft' ? (
                        <>
                          <TableCell align="center">
                            <Chip
                              label={`${
                                Math.round(
                                  ((player.ptsMin + player.ptsMax) / 2 / 35) *
                                    100
                                ) - 5
                              } - ${
                                Math.round(
                                  ((player.ptsMin + player.ptsMax) / 2 / 35) *
                                    100
                                ) + 5
                              }`}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={`${
                                Math.round(
                                  ((player.rebMin + player.rebMax) / 2 / 13) *
                                    100
                                ) - 5
                              } - ${
                                Math.round(
                                  ((player.rebMin + player.rebMax) / 2 / 13) *
                                    100
                                ) + 5
                              }`}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={`${
                                Math.round(
                                  ((player.pasMin + player.pasMax) / 2 / 11) *
                                    100
                                ) - 5
                              } - ${
                                Math.round(
                                  ((player.pasMin + player.pasMax) / 2 / 11) *
                                    100
                                ) + 5
                              }`}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              disabled={i + 1 < myPick}
                              checked={
                                i + 1 < myPick || myPickChoice === player.uuid
                              }
                              onChange={() => setMyPickChoice(player.uuid)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        ''
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            back
          </Button>
          <Button onClick={goNextStep} variant="contained" color="primary">
            done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OffSeasonDialog
