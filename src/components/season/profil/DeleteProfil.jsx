import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
import { Redirect } from 'react-router-dom'

function DeleteProfil({ myProfilData }) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteMyProfil = async () => {
    try {
      console.log(myProfilData.uuid)
      await Axios.delete(`${apiUrl}/users/${myProfilData.uuid}`)
      window.localStorage.removeItem('offseason')
      window.localStorage.removeItem('TeamUuid')
      window.localStorage.removeItem('uuid')
      window.localStorage.removeItem('SeasonUuid')
      window.localStorage.removeItem('trainingLeft')
      window.localStorage.removeItem('canPlay')
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Button
        // size="small"
        variant="outlined"
        endIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        style={{
          margin: '10px'
        }}
      >
        Delete profil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{`Warning`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete your profil and all your data ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" autoFocus onClick={handleClose}>
              Back
            </Button>
            <Button
              style={{
                backgroundColor: 'rgb(217, 48, 33)'
              }}
              onClick={deleteMyProfil}
            >
              confirme
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}
export default DeleteProfil
