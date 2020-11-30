import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import React, { useState } from 'react'

function SignPlayerDialog({
  proposeContract,
  player,
  getPlayers,
  contractLeft,
  getMyTeamData,
  getMyTeamInDialog,
  handleCloseAll,
  interest,
  hasSign,
  getMyTeam,
  myteamData,
  salary
}) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    if (myteamData.salaryCapLeft > salary && interest > 85) {
      proposeContract()
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (getMyTeam) {
      getMyTeam()
    }
    if (contractLeft) {
      handleCloseAll()
      getMyTeamData()
    } else {
      handleCloseAll()
      if (getPlayers) {
        getPlayers()
      } else if (getMyTeamInDialog) {
        getMyTeamInDialog()
      }
    }
  }

  return (
    <>
      <Button color="primary" autoFocus onClick={handleClickOpen}>
        Propose
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {myteamData.salaryCapLeft < salary ? (
            <DialogContentText id="alert-dialog-description">
              {`You don't have enough money.`}
            </DialogContentText>
          ) : hasSign && interest >= 95 ? (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} has accepted your offer with joy !`}
            </DialogContentText>
          ) : hasSign && interest < 95 ? (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} has accepted your offer.`}
            </DialogContentText>
          ) : !hasSign && interest >= 40 ? (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} has declined your offer.`}
            </DialogContentText>
          ) : !hasSign && interest < 40 ? (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} is offended by your offer !`}
            </DialogContentText>
          ) : (
            ''
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
