import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
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
  hasSign
}) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    if (interest > 89) {
      proposeContract()
    }
  }

  const handleClose = () => {
    setOpen(false)
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
        <DialogTitle id="alert-dialog-title">Response</DialogTitle>
        <DialogContent>
           
          {hasSign ? (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} has accepted your offer.`}
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {`${player.firstName} ${player.lastName} has declined your offer.`}
            </DialogContentText>
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
