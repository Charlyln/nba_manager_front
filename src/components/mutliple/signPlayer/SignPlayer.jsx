import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Slider,
  Typography
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { apiUrl } from '../../../apiUrl'
import { initialSalary } from '../../../components/mutliple/variables/variables'
import Axios from 'axios'
import SignPlayerDialog from './SignPlayerDialog'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import getPlayerInterest from './getPlayerInterest'
import allActions from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'

function SignPlayer({
  player,
  getPlayers,
  contractLeft,
  getMyTeam,
  TrophyData,
  iOpenTrophySnackbar,
  trophyName,
  TeamUuid,
  getTrophy,
  step,
  myteamData
}) {
  const [open, setOpen] = useState(false)
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [salary, setSalary] = useState(initialSalary)
  const [duration, setDuration] = useState(3)
  const [interest, setInterest] = useState(
    getPlayerInterest(player.value, initialSalary)
  )
  const [hasSign, setHasSign] = useState(false)
  const tutorial = useSelector((state) => state.tutorial)
  const dispatch = useDispatch()

  const signContract = async () => {
    if (contractLeft) {
      const payload = {
        contractYear2: duration >= 1 ? salary : 0,
        contractYear3: duration >= 2 ? salary : 0,
        contractYear4: duration >= 3 ? salary : 0,
        salary,
        contractLeft: player.contractLeft + duration
      }

      await Axios.put(`${apiUrl}/players/${player.uuid}`, payload)
      setHasSign(true)
      if (
        contractLeft === 1 &&
        player.TeamUuid === TeamUuid &&
        !TrophyData.earned
      ) {
        await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
          name: trophyName
        })
        iOpenTrophySnackbar()
        getTrophy()
      }
    } else {
      const nbrLineUp = myteamData.Players.filter((player) => !player.isBench)
      const payload = {
        TeamUuid: myteamData.uuid,
        contractYear1: duration >= 1 ? salary : 0,
        contractYear2: duration >= 2 ? salary : 0,
        contractYear3: duration >= 3 ? salary : 0,
        contractYear4: duration >= 4 ? salary : 0,
        salary,
        contractLeft: duration,
        isBench:
          nbrLineUp.length > 4 && player.TeamUuid !== myteamData.uuid
            ? true
            : false
      }

      await Axios.put(`${apiUrl}/players/${player.uuid}`, payload)
      setHasSign(true)

      if (trophyName && player.TeamUuid === null && !TrophyData.earned) {
        await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
          name: trophyName
        })
        iOpenTrophySnackbar()
        if (step) {
          getTrophy(step)
        } else {
          getTrophy()
        }
      } else if (
        contractLeft === 0 &&
        player.TeamUuid === TeamUuid &&
        !TrophyData.earned
      ) {
        await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
          name: trophyName
        })
        iOpenTrophySnackbar()
        getTrophy(step)
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true)

    if (tutorial.generalTutoIs === 'on') {
      const timer = setTimeout(() => {
        dispatch(allActions.tutorialActions.incrementGeneral())
      }, 100)
      return () => clearTimeout(timer)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (value, playerVal) => {
    setSalary(value * 1000000)
    let pourcentage

    if (playerVal < 75) {
      pourcentage = 0.01
    } else if (playerVal < 80) {
      pourcentage = 0.05
    } else if (playerVal >= 80 && playerVal < 85) {
      pourcentage = 0.15
    } else if (playerVal >= 85 && playerVal < 90) {
      pourcentage = 0.2
    } else if (playerVal >= 90) {
      pourcentage = 0.3
    }
    const salaryExpected = 100000000 * pourcentage

    const valueCal = ((value * 1000000) / salaryExpected) * 100
    setInterest(valueCal)
  }
  const getValue = (PlayerValue) => {
    let pourcentage

    if (PlayerValue < 75) {
      pourcentage = 0.01
    } else if (PlayerValue < 80) {
      pourcentage = 0.05
    } else if (PlayerValue >= 80 && PlayerValue < 85) {
      pourcentage = 0.15
    } else if (PlayerValue >= 85 && PlayerValue < 90) {
      pourcentage = 0.2
    } else if (PlayerValue >= 90) {
      pourcentage = 0.3
    }
    const salaryExpected = 100000000 * pourcentage

    const valueCal = (salary / salaryExpected) * 100

    if (valueCal <= 0) {
      return 0
    } else if (valueCal >= 100) {
      return 100
    } else {
      return valueCal
    }
  }

  const marks = [
    {
      value: 1,
      label: '1 M'
    },
    {
      value: 10,
      label: '10 M'
    },
    {
      value: 20,
      label: '20 M'
    },
    {
      value: 30,
      label: '30 M'
    }
  ]

  const yearsMarks4 = [
    {
      value: 1,
      label: '1 year'
    },
    {
      value: 2,
      label: '2 years'
    },
    {
      value: 3,
      label: '3 years'
    },
    {
      value: 4,
      label: '4 years'
    }
  ]

  const yearsMarks3 = [
    {
      value: 1,
      label: '1 year'
    },
    {
      value: 2,
      label: '2 years'
    },
    {
      value: 3,
      label: '3 years'
    }
  ]

  const displaySalaryLeftAfter = () => {
    let salaryLeftAfter = myteamData.salaryCapLeft - salary

    let backgroundColorDisplay

    if (salaryLeftAfter < 0) {
      backgroundColorDisplay = 'rgb(217, 48, 33)'
    } else {
      backgroundColorDisplay = 'rgb(76, 175, 80)'
    }
    if (player.TeamUuid === myteamData.uuid) {
      return
    } else {
      return (
        <>
          <Typography color="textSecondary">
            <strong>After</strong>
          </Typography>
          <Chip
            style={{
              backgroundColor: backgroundColorDisplay
            }}
            avatar={<MonetizationOnIcon />}
            label={`${salaryLeftAfter / 1000000} MM`}
          />
        </>
      )
    }
  }

  return (
    <>
      <Button
        className="tutoExtensions2"
        onClick={handleClickOpen}
        color="primary"
        size="small"
        endIcon={<CreateIcon />}
        variant="outlined"
      >
        Sign
      </Button>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {(player.contractLeft < 2 && player.TeamUuid === myteamData.uuid) ||
        (!player.TeamUuid && myteamData.Players.length < 10) ? (
          <>
            <DialogTitle id="alert-dialog-title">{`Propose a ${
              contractLeft ? 'extension' : 'contract'
            } to ${player.firstName} ${player.lastName}`}</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Avatar
                    style={{
                      margin: 'auto',
                      width: '150px',
                      height: '150px'
                    }}
                    src={player.photo}
                  />
                  <div
                    style={{ padding: '20px 30px' }}
                    className="tutoExtensions4"
                  >
                    <Typography
                      id="discrete-slider"
                      gutterBottom
                      style={{ marginBottom: '15px' }}
                    >
                      Player interest
                    </Typography>

                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={getValue(player.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ marginLeft: '20px', display: 'flex' }}>
                    <div>
                      {player.TeamUuid === myteamData.uuid ? (
                        <Chip
                          color="secondary"
                          avatar={
                            <InfoOutlinedIcon
                              style={{
                                backgroundColor: 'unset'
                              }}
                            />
                          }
                          label={`You can exceed the salary cap for a player already in your team.`}
                        />
                      ) : (
                        <>
                          <Typography color="textSecondary">
                            <strong>Before</strong>
                          </Typography>
                          <Chip
                            style={{
                              backgroundColor:
                                myteamData.salaryCapLeft < 0
                                  ? 'rgb(217, 48, 33)'
                                  : 'rgb(76, 175, 80)'
                            }}
                            avatar={<MonetizationOnIcon />}
                            label={`${myteamData.salaryCapLeft / 1000000} MM`}
                          />
                        </>
                      )}
                    </div>

                    <div style={{ marginLeft: '10px' }}>
                      {displaySalaryLeftAfter()}
                    </div>
                  </div>

                  <div style={{ padding: '20px 30px' }}>
                    <Typography id="discrete-slider" gutterBottom>
                      Salary
                    </Typography>
                    <Slider
                      className="tutoExtensions3"
                      aria-labelledby="discrete-slider"
                      marks={marks}
                      defaultValue={7}
                      valueLabelDisplay="on"
                      step={1}
                      min={1}
                      max={30}
                      onChange={(e, value) => handleChange(value, player.value)}
                    />
                    <Typography
                      style={{ marginTop: '10px' }}
                      id="discrete-slider"
                      gutterBottom
                    >
                      Duration
                    </Typography>
                    <Slider
                      defaultValue={3}
                      className="tutoExtensions5"
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="on"
                      step={1}
                      marks={player.contractLeft ? yearsMarks3 : yearsMarks4}
                      min={1}
                      max={player.contractLeft ? 3 : 4}
                      onChange={(e, value) => setDuration(value)}
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <SignPlayerDialog
                signContract={signContract}
                player={player}
                getPlayers={getPlayers}
                contractLeft={contractLeft}
                getMyTeam={getMyTeam}
                handleCloseAll={handleClose}
                interest={interest}
                hasSign={hasSign}
                myteamData={myteamData}
                salary={salary}
                UserUuid={UserUuid}
                TeamUuid={TeamUuid}
              />
            </DialogActions>
          </>
        ) : myteamData.Players.length >= 10 ? (
          <>
            <DialogTitle>
              Your team is already full ! Release a player in your team to sign
              a other player.
            </DialogTitle>
          </>
        ) : (
          ''
        )}
      </Dialog>
    </>
  )
}

export default SignPlayer
