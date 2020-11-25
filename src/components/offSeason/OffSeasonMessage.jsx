import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core'

function OffSeasonMessage({
  openFreeAgencyMessage,
  handleCloseFreeAgencyMessage
}) {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openFreeAgencyMessage}
        onClose={handleCloseFreeAgencyMessage}
      >
        <DialogTitle>Info</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must have 5 players in your team before go next step.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseFreeAgencyMessage} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default OffSeasonMessage
