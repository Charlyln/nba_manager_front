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

import AccountVerify from '../../components/mutliple/AccountVerify'
import ProgressBall from '../mutliple/ProgressBall'
import TrophySnackbar from '../mutliple/TrophySnackbar'
import postProgressValue from '../api calls/postProgressValue'
import getMyPick from '../api calls/getMyPick'

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
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName, setTrophyName] = useState('')
  const [myPick, setMyPick] = useState(null)

  const iOpenTrophySnackbar = () => {
    setOpenTrophySnackbar(true)
  }

  const closeTrophySnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenTrophySnackbar(false)
  }

  const getTrophy = async (step) => {
    try {
      let trophyNameReq
      if (step === 'Player options') {
        setTrophyName('Sign a player option')
        trophyNameReq = 'Sign a player option'
      } else if (step === 'Free agency') {
        trophyNameReq = 'Sign a free agent'
        setTrophyName('Sign a free agent')
      } else if (step === 'Training Camps') {
        trophyNameReq = 'Use a training camp'
        setTrophyName('Use a training camp')
      }
      if (
        step === 'Player options' ||
        step === 'Free agency' ||
        step === 'Training Camps'
      ) {
        const res = await Axios.get(
          `${apiUrl}/trophies/${trophyNameReq}/${UserUuid}`
        )
        setTrophyData(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const steps = [
    'Retirements',
    'Draft',
    'Player options',
    'Free agency',
    'Training Camps',
    'Player progress'
  ]

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      await getMySeason()
      await getPlayers()
      await getMyTeam()
      const res = await getMyPick(SeasonUuid, TeamUuid, UserUuid)
      setMyPick(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPlayers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/players/${UserUuid}`)
      setPlayersData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getMySeason = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/seasons/myseason/${SeasonUuid}`)
      setMySeason(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = (step, nextItem) => {
    console.log(step, nextItem)
    const offseasonStepIn = parseFloat(window.localStorage.getItem('offseason'))
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setCanGoNext(false)
    window.localStorage.setItem('offseason', offseasonStepIn + 1)
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
      await postProgressValue(UserUuid, res.data.uuid)
      await Axios.post(`${apiUrl}/players/updateStatsBeg/${UserUuid}`)
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
      <AccountVerify />
      {isLoading ? (
        <>
          <ProgressBall />
        </>
      ) : (
        <>
          <TrophySnackbar
            openTrophySnackbar={openTrophySnackbar}
            closeTrophySnackbar={closeTrophySnackbar}
            trophyName={trophyName}
          />
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
              {steps.map((step, index, arr) => {
                let nextItem = arr[index + 1]
                return (
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
                            TrophyData={TrophyData}
                            iOpenTrophySnackbar={iOpenTrophySnackbar}
                            trophyName={trophyName}
                            getTrophy={getTrophy}
                            myPick={myPick}
                          />
                          <Button
                            disabled={!canGoNext}
                            variant="contained"
                            color="primary"
                            onClick={
                              activeStep === steps.length - 1
                                ? NextSeason
                                : () => handleNext(step, nextItem)
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
                              ? 'Next season'
                              : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
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
                  You find a secret !{' '}
                  <span role="img" aria-label="sheep">
                    😄
                  </span>
                </Button>
              </Paper>
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default Offseason
