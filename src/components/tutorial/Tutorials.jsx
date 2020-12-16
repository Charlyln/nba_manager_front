import { Button, Grid, Paper } from '@material-ui/core'
import React from 'react'
import Joyride from 'react-joyride'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions'
import { myRoster, contracts, extensions } from './steps'
import { useLocation } from 'react-router-dom'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import StopIcon from '@material-ui/icons/Stop'

function Tutorials() {
  const tutorial = useSelector((state) => state.tutorial)
  const loading = useSelector((state) => state.loading)
  const generalStep = useSelector((state) => state.tutorial.generalStep)
  const location = useLocation()
  const dispatch = useDispatch()

  const getSteps = () => {
    switch (location.pathname) {
      case '/myteam':
        return myRoster

      case '/contracts':
        return contracts

      case '/extension':
        return extensions

      default:
        break
    }
  }

  const incrementGeneral = () => {
    dispatch(allActions.tutorialActions.incrementGeneral())
  }

  const decrementGeneral = () => {
    dispatch(allActions.tutorialActions.decrementGeneral())
  }

  const stopTutorial = () => {
    dispatch(allActions.tutorialActions.setGeneralStepZero())
    dispatch(allActions.tutorialActions.setGeneralTutoOff())
  }

  const Tooltip = ({
    continuous,
    index,
    isLastStep,
    step,
    backProps,
    primaryProps,
    skipProps,
    tooltipProps
  }) => {
    const mustHideNextButton =
      (location.pathname === '/extension' && tutorial.generalStep === 1) ||
      (location.pathname === '/extension' && tutorial.generalStep === 5) ||
      (location.pathname === '/myteam' && tutorial.generalStep === 2)

    return (
      <Paper
        style={{
          backgroundColor: '#fff',
          color: '#2F2E2C',
          padding: '10px'
        }}
        elevation={20}
        {...tooltipProps}
      >
        <div style={{ width: '300px' }}>{step.content}</div>

        <Grid container style={{ marginTop: '20px' }}>
          {index > 0 ? (
            <Grid item xs={6}>
              <Button
                size="small"
                {...backProps}
                variant="contained"
                color="secondary"
                endIcon={<SkipPreviousIcon />}
                onClick={decrementGeneral}
              >
                prev
              </Button>
            </Grid>
          ) : (
            ''
          )}

          {mustHideNextButton ? (
            ''
          ) : !isLastStep ? (
            <Grid item xs={index > 0 ? 6 : 12} style={{ textAlign: 'end' }}>
              <Button
                size="small"
                {...primaryProps}
                variant="contained"
                color="secondary"
                endIcon={<SkipNextIcon />}
                onClick={incrementGeneral}
              >
                next
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6} style={{ textAlign: 'end' }}>
              <Button
                size="small"
                {...isLastStep}
                variant="contained"
                color="secondary"
                endIcon={<StopIcon />}
                onClick={stopTutorial}
              >
                end
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    )
  }

  return (
    <>
      {tutorial && tutorial.generalTutoIs === 'on' && loading === false ? (
        <Joyride
          steps={getSteps()}
          run={tutorial && tutorial.generalTutoIs === 'on' && loading === false}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          disableCloseOnEsc={true}
          disableOverlayClose={true}
          spotlightClicks={true}
          tooltipComponent={Tooltip}
          stepIndex={generalStep}
          // styles={{
          //   options: {
          //     arrowColor: '#fff'
          //   }
          // }}
        />
      ) : (
        ''
      )}
    </>
  )
}
export default Tutorials
