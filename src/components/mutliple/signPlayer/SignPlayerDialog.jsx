import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListSubheader
} from '@material-ui/core'
import React, { useState } from 'react'
import updateSalaryCapLeft from '../../api calls/updateSalaryCapLeft'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import allActions from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'

function SignPlayerDialog({
  signContract,
  player,
  getPlayers,
  handleCloseAll,
  interest,
  hasSign,
  getMyTeam,
  myteamData,
  salary,
  UserUuid,
  TeamUuid
}) {
  const [open, setOpen] = useState(false)
  const [playerMood, setPlayerMood] = useState('')
  const [tooLowMoney, setTooLowMoney] = useState(false)
  const tutorial = useSelector((state) => state.tutorial)
  const dispatch = useDispatch()

  const proposeContract = () => {
    if (interest <= 85) {
      if (interest >= 40) {
        setPlayerMood('declined')
      } else {
        setPlayerMood('offended')
      }
      if (
        player.TeamUuid !== TeamUuid &&
        salary >= 2000000 &&
        myteamData.salaryCapLeft < salary
      ) {
        setTooLowMoney(true)
      }
    } else {
      if (interest >= 95) {
        setPlayerMood('joy')
      } else {
        setPlayerMood('ok')
      }
      if (player.TeamUuid === TeamUuid) {
        signContract()
      } else {
        if (salary < 2000000) {
          signContract()
        } else {
          if (myteamData.salaryCapLeft >= salary) {
            signContract()
          } else {
            setTooLowMoney(true)
          }
        }
      }
    }
    if (tutorial.generalTutoIs === 'on') {
      setOpen(true)
      const timer = setTimeout(() => {
        dispatch(allActions.tutorialActions.incrementGeneral())
      }, 100)
      return () => clearTimeout(timer)
    }

    setOpen(true)
  }

  const handleClose = async () => {
    await updateSalaryCapLeft(UserUuid, TeamUuid)
    setOpen(false)
    setPlayerMood('')
    setTooLowMoney(false)
    handleCloseAll()
    if (getMyTeam) {
      await getMyTeam()
    }
    if (getPlayers) {
      await getPlayers()
    }
  }

  return (
    <>
      <Button
        color="primary"
        autoFocus
        onClick={proposeContract}
        className="tutoExtensions6"
      >
        Propose
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle>Info</DialogTitle>
          {!hasSign ? (
            <>
              <List className="tutoExtensions7">
                <ListSubheader component="div">
                  {`The contract could not be completed. Here's why: `}
                </ListSubheader>
                {playerMood === 'declined' ? (
                  <ListItem>
                    <Chip
                      style={{
                        backgroundColor: 'rgb(217, 48, 33)'
                      }}
                      icon={<CancelIcon />}
                      label={`${player.firstName} ${player.lastName} has declined your offer.`}
                    />
                  </ListItem>
                ) : (
                  ''
                )}
                {playerMood === 'offended' ? (
                  <ListItem>
                    <Chip
                      style={{
                        backgroundColor: 'rgb(217, 48, 33)'
                      }}
                      icon={<CancelIcon />}
                      label={`${player.firstName} ${player.lastName} is offended by your offer.`}
                    />
                  </ListItem>
                ) : (
                  ''
                )}
                {tooLowMoney ? (
                  <ListItem>
                    <Chip
                      style={{
                        backgroundColor: 'rgb(217, 48, 33)'
                      }}
                      icon={<CancelIcon />}
                      label={`You don't have enough money.`}
                    />
                  </ListItem>
                ) : (
                  ''
                )}
              </List>
            </>
          ) : (
            <>
              <ListSubheader component="div">
                {`The contract has succeed !`}
              </ListSubheader>
              {playerMood === 'joy' ? (
                <ListItem>
                  <Chip
                    style={{
                      backgroundColor: 'rgb(76, 175, 80)'
                    }}
                    icon={<CheckCircleIcon />}
                    label={`${player.firstName} ${player.lastName} has accepted your offer with joy !`}
                  />
                </ListItem>
              ) : playerMood === 'ok' ? (
                <ListItem>
                  <Chip
                    style={{
                      backgroundColor: 'rgb(76, 175, 80)'
                    }}
                    icon={<CheckCircleIcon />}
                    label={`${player.firstName} ${player.lastName} has accepted your offer.`}
                  />
                </ListItem>
              ) : (
                ''
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default SignPlayerDialog
