import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import React, { useState } from 'react'
import updateSalaryCapLeft from '../../api calls/updateSalaryCapLeft'

function SignPlayerDialog({
  proposeContract,
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

  const handleClickOpen = () => {
    setOpen(true)
    if (myteamData.salaryCapLeft > salary && interest > 85) {
      proposeContract()
    }
  }

  const handleClose = async () => {
    await updateSalaryCapLeft(UserUuid, TeamUuid)
    setOpen(false)
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
