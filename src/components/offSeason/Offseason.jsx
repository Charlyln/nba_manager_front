import React, { useEffect, useState } from 'react'
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
import AccountVerify from '../../components/mutliple/AccountVerify'
import ProgressBall from '../mutliple/ProgressBall'

function Offseason() {
  const [activeStep, setActiveStep] = useState(
    parseFloat(window.localStorage.getItem('offseason')) - 1
  )
  const [redirect, setRedirect] = useState(false)
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))

  const [canGoNext, setCanGoNext] = useState(false)
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [mySeason, setMySeason] = useState({})
  const [isOffSeason] = useState(window.localStorage.getItem('offseason'))
  const [playersData, setPlayersData] = useState({})
  const [myteamData, setMyTeamData] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [isLoading3, setIsLoading3] = useState(true)
  // const [offSeasonStep, setOffSeasonStep] = useState(
  //   parseFloat(window.localStorage.getItem('offseason'))
  // )
  const steps = [
    'Retirements',
    'Player options',
    'Free agency',
    'Player progress'
  ]

  useEffect(() => {
    getMySeason()
    getPlayers()
    getMyTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
      setIsLoading2(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getPlayers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/players/${UserUuid}`)
      setPlayersData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getMySeason = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/seasons/myseason/${SeasonUuid}`)
      setMySeason(res.data)
      setIsLoading3(false)
    } catch (error) {
      console.log(error)
    }
  }

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
      const mySeasonStartYear = mySeason.startYear
      const res = await Axios.post(
        `${apiUrl}/dataCreation/newSeason/${UserUuid}`,
        {
          date: mySeasonStartYear
        }
      )
      window.localStorage.setItem('SeasonUuid', res.data.uuid)
      window.localStorage.removeItem('offseason')
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }

  const goNext = () => {
    setCanGoNext(true)
  }

  if (redirect || !isOffSeason) {
    return <Redirect to="/home" />
  }

  return (
    <>
      {isLoading || isLoading2 || isLoading3 ? (
        <>
          <AccountVerify />
          <ProgressBall />
        </>
      ) : (
        <Grid style={{ marginTop: '100px' }}>
          <Typography
            style={{ width: '50%', margin: ' 30px auto' }}
            variant="h6"
          >
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
                        myteamData={myteamData}
                        playersData={playersData}
                        getPlayers={getPlayers}
                        getMyTeam={getMyTeam}
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
                          activeStep === steps.length - 1
                            ? NextSeason
                            : handleNext
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
            <Paper
              style={{ width: '50%', margin: 'auto' }}
              square
              elevation={0}
            >
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
      )}
    </>
  )
}

export default Offseason
