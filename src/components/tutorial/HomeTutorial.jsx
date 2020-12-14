import { Button, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Joyride from 'react-joyride'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions'
import ForwardSharpIcon from '@material-ui/icons/ForwardSharp'

function HomeTutorial() {
  const tutorial = useSelector((state) => state.tutorial)
  // const [stepIndex, setStepIndex] = useState(0)
  const [steps] = useState([
    {
      target: '.simulateOneGame',
      content: (
        <Typography>
          You can simulate one game in the season here, try it !
        </Typography>
      ),
      disableBeacon: true
    },
    {
      target: '.seeStats',
      content: <Typography>You can open game stats after the game</Typography>,
      disableBeacon: true
    },
    {
      target: '.tutoGameStats',
      content: (
        <>
          <Typography>
            You can see all game stats (points, rebounds, assists etc..)
          </Typography>
          <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
            Close it when you ready to continue
          </Typography>
        </>
      ),
      disableBeacon: true
    },
    {
      target: '.secondStep',
      content: (
        <>
          <Typography>You can simulate all game in the season here.</Typography>
          <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
            You will be able to do it after the tutorial. Go next for now
          </Typography>
        </>
      ),
      disableBeacon: true
    },
    {
      target: '.tutoAppBar',
      content: 'Click to open the sidebar',
      disableBeacon: true
    },
    {
      target: '.tutoSideBar',
      content: (
        <>
          <Typography>
            This is our sidebar, you can find everything you need here.
          </Typography>
          <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
            We are on the calendar for now. Click on to close the sidebar
          </Typography>
        </>
      ),
      disableBeacon: true,
      placement: 'right-end',
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 10000
        }
      }
    }
  ])
  const dispatch = useDispatch()

  // const handleJoyrideCallback = (CallBackProps) => {
  //   const { action, status, type, index } = CallBackProps

  //   if (action === 'next' && type === 'step:after') {
  //     console.log('after', action, status, type, CallBackProps)
  //     // dispatch(allActions.tutorialActions.increment())
  //   } else {
  //     console.log(action, status, type, CallBackProps)
  //   }
  // }

  const incrementTuto = () => {
    dispatch(allActions.tutorialActions.increment())
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
        {step.content}

        {index === 3 && (
          <div style={{ marginTop: '15px', textAlign: 'right' }}>
            <Button
              {...backProps}
              onClick={incrementTuto}
              variant="contained"
              color="secondary"
              endIcon={<ForwardSharpIcon />}
            >
              Next
            </Button>
          </div>
        )}
      </Paper>
    )
  }

  return (
    <>
      {tutorial ? (
        <Joyride
          steps={steps}
          run={tutorial.is === 'on'}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          disableCloseOnEsc={true}
          disableOverlayClose={true}
          spotlightClicks={true}
          tooltipComponent={Tooltip}
          // callback={handleJoyrideCallback}
          stepIndex={tutorial.step}
          styles={{
            options: {
              arrowColor: '#fff'
            }
          }}
        />
      ) : (
        ''
      )}
    </>
  )
}
export default HomeTutorial
