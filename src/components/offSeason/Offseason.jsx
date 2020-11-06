import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ForwardIcon from '@material-ui/icons/Forward'
import OffSeasonDialog from './OffSeasonDialog'
import { Redirect } from 'react-router-dom'

function Offseason() {
  const [activeStep, setActiveStep] = useState(
    parseFloat(window.localStorage.getItem('offseason')) - 1
  )
  const [canGoNext, setCanGoNext] = useState(false)
  // const [offSeasonStep, setOffSeasonStep] = useState(
  //   parseFloat(window.localStorage.getItem('offseason'))
  // )
  const steps = [
    'Retirements',
    'Draft',
    'Free agency',
    'Player progress',
    'Training camp',
    'Next season'
  ]

  const handleNext = () => {
    const offseasonStepIn = parseFloat(window.localStorage.getItem('offseason'))

    if (offseasonStepIn === 6) {
      window.localStorage.removeItem('offseason')
      setCanGoNext(false)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setCanGoNext(false)
      window.localStorage.setItem('offseason', offseasonStepIn + 1)
    }
  }

  const goNext = () => {
    setCanGoNext(true)
  }

  if (!parseFloat(window.localStorage.getItem('offseason'))) {
    return <Redirect to="/home" />
  }

  return (
    <Grid style={{ marginTop: '100px' }}>
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
                  />
                  <Button
                    disabled={!canGoNext}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    style={{ marginLeft: '10px' }}
                    endIcon={
                      activeStep === steps.length - 1 ? (
                        <ForwardIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    }
                  >
                    {activeStep === steps.length - 1 ? 'Go' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Grid>
  )
}

export default Offseason
