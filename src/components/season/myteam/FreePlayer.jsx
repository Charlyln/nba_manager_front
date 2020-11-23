import React, {  useState } from 'react'
import {  IconButton,  } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { apiUrl } from '../../../apiUrl'
import Axios from 'axios'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function SignPlayer({ player, getMyTeam }) {
  const [open, setOpen] = useState(false)
  // const [userUuid] = useState(window.localStorage.getItem('uuid'))
  // const [isLoading, setIsLoading] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const removePlayer = async () => {
    await Axios.put(`${apiUrl}/players/${player.uuid}`, {
      TeamUuid: null
    })
    handleClose()
    getMyTeam()
  }

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <ExitToAppIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{`Do you want to remove ${player.firstName} ${player.lastName} from your team ? `}</DialogTitle>
          <DialogActions>
            <Button color="primary" autoFocus onClick={handleClose}>
              Back
            </Button>
            <Button color="primary" autoFocus onClick={removePlayer}>
              Confirme
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}

export default SignPlayer
