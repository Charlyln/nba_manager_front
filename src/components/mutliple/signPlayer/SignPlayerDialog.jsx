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

  const proposeContract = () => {
    if (
      (player.TeamUuid == TeamUuid && player.contractLeft && interest > 85) ||
      (salary < 2000000 && interest > 85)
    ) {
      // case where no salary cap limit
      signContract()
    } else if (myteamData.salaryCapLeft >= salary && interest > 85) {
      signContract()
    }
    setOpen(true)
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
      <Button color="primary" autoFocus onClick={proposeContract}>
        Propose
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {!player.contractLeft &&
          myteamData.salaryCapLeft < salary &&
          !hasSign ? (
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
