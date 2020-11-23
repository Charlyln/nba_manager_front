import React, { useState } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ForwardIcon from '@material-ui/icons/Forward'
import OffSeasonDialog from './OffSeasonDialog'
import Axios from 'axios'
import { apiUrl } from '../../apiUrl'
import { Redirect } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'

function Offseason() {
  const [activeStep, setActiveStep] = useState(
    parseFloat(window.localStorage.getItem('offseason')) - 1
  )
  const [redirect, setRedirect] = useState(false)
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))

  const [canGoNext, setCanGoNext] = useState(false)
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  // const [offSeasonStep, setOffSeasonStep] = useState(
  //   parseFloat(window.localStorage.getItem('offseason'))
  // )
  const steps = [
    'Retirements',
    'Draft',
    'Player options',
    'Free agency',
    'Player progress'
  ]

  const handleNext = () => {
    const offseasonStepIn = parseFloat(window.localStorage.getItem('offseason'))

    if (offseasonStepIn === 6) {
      // window.localStorage.removeItem('offseason')
      // setCanGoNext(false)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setCanGoNext(false)
      window.localStorage.setItem('offseason', offseasonStepIn + 1)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setCanGoNext(false)
      window.localStorage.setItem('offseason', offseasonStepIn + 1)
    }
  }

  const NextSeason = async (e) => {
    e.preventDefault()

    try {
      const res = await Axios.post(`${apiUrl}/dataCreation/games2/${uuid}`)
      console.log(res.data)
      window.localStorage.setItem('SeasonUuid', res.data.uuid)
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }

  const goNext = () => {
    setCanGoNext(true)
  }

  if (redirect) {
    return <Redirect to="/home" />
  }

  return (
    <Grid style={{ marginTop: '100px' }}>
      <Typography style={{ width: '50%', margin: ' 30px auto' }} variant="h6">
        Off season
      </Typography>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{ width: '50%', margin: 'auto' }}
      >
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              <div>
                <div>
                  <OffSeasonDialog
                    goNext={goNext}
                    canGoNext={canGoNext}
                    step={step}
                    TeamUuid={TeamUuid}
                  />
                  <Button
                    disabled={!canGoNext}
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1 ? NextSeason : handleNext
                    }
                    style={{ marginLeft: '10px' }}
                    endIcon={
                      activeStep === steps.length - 1 ? (
                        <ForwardIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    }
                  >
                    {activeStep === steps.length - 1
                      ? 'Go next season'
                      : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper style={{ width: '50%', margin: 'auto' }} square elevation={0}>
          <Button
            style={{ margin: '10px 25px' }}
            variant="contained"
            color="primary"
          >
            Finichaide !{' '}
            <span role="img" aria-label="sheep">
              😄
            </span>
          </Button>
        </Paper>
      )}
    </Grid>
  )
}

export default Offseason
