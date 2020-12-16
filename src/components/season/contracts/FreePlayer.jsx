import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { apiUrl } from '../../../apiUrl'
import Axios from 'axios'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import updateSalaryCapLeft from '../../api calls/updateSalaryCapLeft'

function SignPlayer({
  player,
  getMyTeam,
  iOpenTrophySnackbar,
  TrophyData,
  trophyName,
  UserUuid,
  myteamData
}) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const removePlayer = async () => {
    try {
      await Axios.put(`${apiUrl}/players/${player.uuid}`, {
        TeamUuid: null,
        contractLeft: 0,
        salary: 0,
        contractYear1: 0,
        contractYear2: 0,
        contractYear3: 0,
        contractYear4: 0
      })
      if (!TrophyData.earned) {
        await Axios.post(`${apiUrl}/trophies/earned/${UserUuid}`, {
          name: trophyName
        })
        iOpenTrophySnackbar()
      }

      handleClose()
      updateSalaryCapLeft(UserUuid, myteamData.uuid)
      getMyTeam()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
       className="tutoContracts6"
        onClick={handleClickOpen}
        color="secondary"
        size="small"
        endIcon={<ExitToAppIcon />}
        variant="contained"
      >
        Fire
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{`Do you want to fire ${player.firstName} ${player.lastName} ? `}</DialogTitle>
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
