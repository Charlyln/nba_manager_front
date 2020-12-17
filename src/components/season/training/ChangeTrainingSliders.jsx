import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { apiUrl } from '../../../apiUrl'
import Axios from 'axios'
import TuneIcon from '@material-ui/icons/Tune'
import {
  Avatar,
  Chip,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Slider
} from '@material-ui/core'
import TrainingMessage from './TrainingMessage'

function ChangeTrainingSliders({ player, getMyTeam }) {
  const [open, setOpen] = useState(false)
  const [unitsAvailable] = useState(150)
  const [scoringValue, setScoringValue] = useState(player.ptsTraining)
  const [ReboundValue, setReboundValue] = useState(player.rebTraining)
  const [assistValue, setassistValue] = useState(player.pasTraining)
  const [openMessage, setOpenMessage] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpenMessage = () => {
    setOpenMessage(true)
  }

  const handleCloseMessage = () => {
    setOpenMessage(false)
  }

  const handleChangeScoring = (value) => {
    if (value + ReboundValue + assistValue <= unitsAvailable) {
      setScoringValue(value)
    }
  }
  const handleChangeRebounds = (value) => {
    if (scoringValue + value + assistValue <= unitsAvailable) {
      setReboundValue(value)
    }
  }
  const handleChangeAssists = (value) => {
    if (scoringValue + ReboundValue + value <= unitsAvailable) {
      setassistValue(value)
    }
  }

  const putPlayerTrainingPriorities = async () => {
    if (unitsAvailable !== scoringValue + ReboundValue + assistValue) {
      handleClickOpenMessage()
    } else {
      const payload = {
        ptsTraining: scoringValue,
        rebTraining: ReboundValue,
        pasTraining: assistValue
      }
      await Axios.put(`${apiUrl}/players/${player.uuid}`, payload)
      handleClose()
      await getMyTeam()
    }
  }

  return (
    <>
      <Button
        className="tutoContracts6"
        onClick={handleClickOpen}
        color="secondary"
        size="small"
        endIcon={<TuneIcon />}
        variant="contained"
      >
        open
      </Button>

      <TrainingMessage
        handleCloseMessage={handleCloseMessage}
        openMessage={openMessage}
        unitsAvailable={unitsAvailable}
        totalUse={ReboundValue + assistValue + scoringValue}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <>
          <DialogTitle id="alert-dialog-title">{`Adjsut ${player.firstName} ${player.lastName} training priorities `}</DialogTitle>

          <DialogContent>
            <Grid container>
              <Grid
                item
                xs={12}
                md={2}
                style={{
                  margin: 'auto'
                }}
              >
                <Avatar
                  style={{
                    margin: 'auto',
                    width: '150px',
                    height: '150px'
                  }}
                  src={player.photo}
                />
              </Grid>

              <Grid item xs={12} md={10}>
                <List>
                  <div style={{ textAlign: 'end' }}>
                    <Chip
                      style={{
                        backgroundColor:
                          scoringValue + ReboundValue + assistValue ===
                          unitsAvailable
                            ? 'rgb(76, 175, 80)'
                            : 'rgb(217, 48, 33)'
                      }}
                      label={` ${
                        scoringValue + ReboundValue + assistValue
                      } / ${unitsAvailable}`}
                    />
                  </div>
                  {/* <DialogTitle style={{ textAlign: 'end' }}>
                   
                  </DialogTitle> */}
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <ListItemText primary="Scoring" secondary="priority" />
                      </Grid>

                      <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
                        <Slider
                          color="secondary"
                          onChange={(e, value) => handleChangeScoring(value)}
                          defaultValue={player.ptsTraining}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={0}
                          max={100}
                          value={scoringValue}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <ListItemText primary="Rebounds" secondary="priority" />
                      </Grid>

                      <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
                        <Slider
                          color="secondary"
                          onChange={(e, value) => handleChangeRebounds(value)}
                          defaultValue={player.rebTraining}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={0}
                          max={100}
                          value={ReboundValue}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <ListItemText primary="Assists" secondary="priority" />
                      </Grid>

                      <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
                        <Slider
                          color="secondary"
                          onChange={(e, value) => handleChangeAssists(value)}
                          defaultValue={player.pasTraining}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={0}
                          max={100}
                          value={assistValue}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color="primary" autoFocus onClick={handleClose}>
              Back
            </Button>
            <Button
              color="primary"
              autoFocus
              onClick={putPlayerTrainingPriorities}
            >
              Confirme
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}

export default ChangeTrainingSliders
