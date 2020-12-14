import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import React from 'react'
import styles from './championsDialog.module.css'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import ForwardSharpIcon from '@material-ui/icons/ForwardSharp'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../actions'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

function FinishTutorial() {
  const tutorial = useSelector((state) => state.tutorial)

  const dispatch = useDispatch()

  const incrementTuto = () => {
    dispatch(allActions.tutorialActions.increment())
  }

  const stopTutot = () => {
    dispatch(allActions.tutorialActions.setOff())
  }

  if (tutorial && tutorial.step === 6) {
    window.localStorage.setItem(
      'tutorial',
      JSON.stringify({ ...tutorial, step: 6 })
    )
  }

  return (
    <>
      <Dialog
        open={tutorial && tutorial.is === 'on' && tutorial.step === 6}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <>
          <DialogTitle>
            <p className={styles.playerName}>{`Congrats `}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have finished the first step of the tutorial, do you want to
              continue ?
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Your tutorial progress is save, if you want to continue later, go
              to{' '}
              <Button
                size="small"
                // variant="outlined"
                endIcon={<AccountCircleIcon />}
              >
                profil page
              </Button>{' '}
              to resume tutorial.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ marginTop: '30px' }}>
            <Button
              onClick={stopTutot}
              startIcon={
                <ExitToAppSharpIcon
                  style={{
                    transform: 'rotate(180deg)'
                  }}
                />
              }
              style={{ marginRight: 'auto' }}
            >
              stop tutorial
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ForwardSharpIcon />}
              onClick={incrementTuto}
              disabled
            >
              continue (soon)
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}
export default FinishTutorial
