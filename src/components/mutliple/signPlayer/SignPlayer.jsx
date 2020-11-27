import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Grid,
  IconButton,
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
import Axios from 'axios'
import SignPlayerDialog from './SignPlayerDialog'

function SignPlayer({
  player,
  getPlayers,
  contractLeft,
  getMyTeamData,
  getMyTeamInDialog
}) {
  const [open, setOpen] = useState(false)
  const [myteamData, setMyTeamData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [salary, setSalary] = useState(4000000)
  const [duration, setDuration] = useState(3)
  const [interest, setInterest] = useState(0)
  const [hasSign, setHasSign] = useState(false)

  useEffect(() => {
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(salary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${userUuid}`)
      setMyTeamData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const proposeContract = async () => {
    if (contractLeft) {
      await Axios.put(`${apiUrl}/players/${player.uuid}`, {
        salary,
        contractLeft: duration
      })
      setHasSign(true)
      // handleClose()
      // getMyTeamData()
    } else {
      await Axios.put(`${apiUrl}/players/${player.uuid}`, {
        TeamUuid: myteamData.uuid,
        salary,
        contractLeft: duration
      })
      setHasSign(true)
      // handleClose()
      // if (getPlayers) {
      //   getPlayers()
      // } else if (getMyTeamInDialog) {
      //   getMyTeamInDialog()
      // }
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (value, playerVal) => {
    setSalary(value * 1000000)
    let pourcentage

    if (playerVal < 80) {
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

    if (PlayerValue < 80) {
      pourcentage = 0.05
    } else if (PlayerValue >= 80 && PlayerValue < 85) {
      pourcentage = 0.15
    } else if (PlayerValue >= 85 && PlayerValue < 90) {
      pourcentage = 0.2
    } else if (PlayerValue >= 90) {
      pourcentage = 0.3
    }
    const salaryExpected = 100000000 * pourcentage // 15 millions

    const valueCal = (salary / salaryExpected) * 100

    if (valueCal <= 0) {
      return 0
    } else if (valueCal >= 100) {
      return 100
    } else {
      return valueCal
    }
  }

  // const getDefaultValue = (PlayerValue) => {
  //   if (PlayerValue < 80) {
  //     return 3
  //   } else if (PlayerValue >= 80 && PlayerValue < 85) {
  //     return 10
  //   } else if (PlayerValue >= 85 && PlayerValue < 90) {
  //     return 15
  //   } else if (PlayerValue >= 90) {
  //     return 25
  //   }
  // }

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

  const marks2 = [
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

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        style={{ border: 'solid 1px' }}
        size="medium"
      >
        <CreateIcon color="primary" />
      </IconButton>

      {isLoading ? (
        ''
      ) : (
        <Dialog
          maxWidth="md"
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* myteamData.Players.length > 4 && contractLeft !== 0 */}
          {(player.contractLeft < 2 && player.TeamUuid === myteamData.uuid) ||
          (!player.TeamUuid && myteamData.Players.length < 5) ? (
            <>
              <DialogTitle id="alert-dialog-title">{`Propose a ${
                contractLeft ? 'extension' : 'contract'
              } to ${player.firstName} ${player.lastName}`}</DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    style={{ alignSelf: 'center', padding: '40px 50px' }}
                  >
                    <Avatar
                      style={{
                        margin: 'auto',
                        width: '150px',
                        height: '150px'
                      }}
                      src={player.photo}
                    />
                    <Typography id="discrete-slider" gutterBottom>
                      Player interest
                    </Typography>

                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={getValue(player.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ alignSelf: 'center', padding: '40px 30px' }}
                  >
                    <Typography id="discrete-slider" gutterBottom>
                      Salary
                    </Typography>
                    <Slider
                      marks={marks}
                      defaultValue={4}
                      valueLabelDisplay="on"
                      step={1}
                      min={1}
                      max={30}
                      onChange={(e, value) => handleChange(value, player.value)}
                    />

                    <Typography id="discrete-slider" gutterBottom>
                      Duration
                    </Typography>
                    <Slider
                      defaultValue={3}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="on"
                      step={1}
                      marks={marks2}
                      min={1}
                      max={4}
                      onChange={(e, value) => setDuration(value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <SignPlayerDialog
                  proposeContract={proposeContract}
                  player={player}
                  getPlayers={getPlayers}
                  contractLeft={contractLeft}
                  getMyTeamData={getMyTeamData}
                  getMyTeamInDialog={getMyTeamInDialog}
                  handleCloseAll={handleClose}
                  interest={interest}
                  hasSign={hasSign}
                  getMyTeam={getMyTeam}
                />
              </DialogActions>
            </>
          ) : (
            <>
              <DialogTitle>
                Your team is already full ! Release a player in your team to
                sign a other player.
              </DialogTitle>
            </>
          )}
        </Dialog>
      )}
    </>
  )
}

export default SignPlayer
