import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'

function EditProfil({ myProfilData, getMyProfil }) {
  const [open, setOpen] = useState(false)
  const [pseudo, setPseudo] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const editMyProfil = async (e) => {
    e.preventDefault()
    try {
      if (pseudo) {
        console.log(pseudo)
        await Axios.put(`${apiUrl}/users/${myProfilData.uuid}`, {
          pseudo
        })
        getMyProfil()
        handleClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button
        // size="small"
        variant="outlined"
        endIcon={<EditIcon />}
        style={{
          margin: '10px'
        }}
        onClick={handleClickOpen}
      >
        Edit profil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={editMyProfil}>
          <DialogTitle id="alert-dialog-title">{`Edit Profil`}</DialogTitle>
          <DialogContent>
            <TextField
              style={{ margin: '20px' }}
              id="message"
              label="New pseudo"
              variant="outlined"
              autoFocus="autofocus"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              confirme
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
export default EditProfil
