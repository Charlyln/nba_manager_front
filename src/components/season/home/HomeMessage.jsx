import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import React from 'react'

function HomeMessage({ handleCloseMessage, openMessage }) {
  return (
    <>
      <Dialog
        open={openMessage}
        onClose={handleCloseMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{`Info`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must have 5 players in your line-up to play.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseMessage}>
              close
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}
export default HomeMessage
