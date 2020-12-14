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

function BeginningMessage() {
  const tutorial = useSelector((state) => state.tutorial)

  const dispatch = useDispatch()

  const setTutorialOff = () => {
    window.localStorage.setItem(
      'tutorial',
      JSON.stringify({ is: 'off', step: 0 })
    )
    dispatch(allActions.tutorialActions.setOff())
  }

  const setTutorialOn = () => {
    window.localStorage.setItem(
      'tutorial',
      JSON.stringify({ is: 'on', step: 0 })
    )
    dispatch(allActions.tutorialActions.start())
  }

  return (
    <>
      <Dialog
        open={!tutorial}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <>
          <DialogTitle>
            <p className={styles.playerName}>{`Hello there`}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Welcome to nba manager. Do you want to start the tutorial ?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ marginTop: '30px' }}>
            <Button
              startIcon={
                <ExitToAppSharpIcon
                  style={{
                    transform: 'rotate(180deg)'
                  }}
                />
              }
              onClick={setTutorialOff}
              style={{ marginRight: 'auto' }}
            >
              No, I'm good
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={setTutorialOn}
              endIcon={<ForwardSharpIcon />}
            >
              start
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}
export default BeginningMessage
