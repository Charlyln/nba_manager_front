import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Paper, Avatar, GridList } from '@material-ui/core'
import Match from './Match'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
import Skeleton from '@material-ui/lab/Skeleton'
import ForwardIcon from '@material-ui/icons/Forward'
import { Redirect } from 'react-router-dom'
import ProgressBall from '../../mutliple/ProgressBall'
import HomeMessage from './HomeMessage'
import FastForwardIcon from '@material-ui/icons/FastForward'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import ChampionsDialog from './ChampionsDialog'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [myteamsData, setMyTeamsData] = useState({})
  const [allGames, setAllGames] = useState(-1)
  const [allGameLoading, setAllGameLoading] = useState(false)
  const [logoLoading, setLogoLoading] = useState(true)
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [redirect, setRedirect] = useState(false)
  const [isOffSeason] = useState(window.localStorage.getItem('offseason'))
  const [openMessage, setOpenMessage] = useState(false)
  const [mySeason, setMySeason] = useState({})
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Play a game')

  const iOpenTrophySnackbar = () => {
    setOpenTrophySnackbar(true)
  }

  const closeTrophySnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenTrophySnackbar(false)
  }

  const getTrophy = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/trophies/${trophyName}/${uuid}`)
      setTrophyData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      await getGames()
      await getTrophy()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickOpenMessage = () => {
    setOpenMessage(true)
  }

  const handleCloseMessage = () => {
    setOpenMessage(false)
  }

  const getGames = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/games/${SeasonUuid}/${TeamUuid}`)
      setTeamsData(res.data)

      await getMyTeams()
      await getMySeason()
      setLogoLoading(false)
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

  const getMyTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const matchAllGames = async () => {
    const nbrLineUp = myteamsData.Players.filter((player) => !player.isBench)
    if (nbrLineUp.length === 5) {
      setAllGameLoading(true)
      const SeasonUuid = teamsData[0].SeasonUuid
      const res = await Axios.post(
        `${apiUrl}/progress/season/${uuid}/${SeasonUuid}`
      )
      console.log(res.data)
      await Axios.post(`${apiUrl}/gamePlayed/all/${SeasonUuid}`)
      window.localStorage.setItem('trainingLeft', 2)
      if (!TrophyData.earned) {
        await Axios.post(`${apiUrl}/trophies/earned/${uuid}`, {
          name: trophyName
        })
        iOpenTrophySnackbar()
      }
      await getAllData()

      setAllGameLoading(false)
    } else {
      handleClickOpenMessage()
    }
  }

  const simulateAllGames = () => {
    setAllGames(allGames + 1)
  }

  const goOffSeason = async () => {
    window.localStorage.setItem('offseason', 1)
    await Axios.post(`${apiUrl}/players/changeContract/${uuid}`)
    await Axios.post(`${apiUrl}/players/changeAge/${uuid}`)
    setRedirect(true)
  }

  if (redirect || isOffSeason) {
    return <Redirect to="/offseason" />
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
          <HomeMessage
            handleCloseMessage={handleCloseMessage}
            openMessage={openMessage}
          />
          <TrophySnackbar
            openTrophySnackbar={openTrophySnackbar}
            closeTrophySnackbar={closeTrophySnackbar}
            trophyName={trophyName}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              marginTop: '100px'
            }}
          >
            <GridList
              style={{
                padding: '20px'
              }}
            >
              {teamsData
                .sort(function (a, b) {
                  return new Date(Number(a.date)) - new Date(Number(b.date))
                })
                .map((team, i, arr) => {
                  let previousItem = arr[i - 1]
                  return (
                    <Paper
                      elevation={10}
                      style={{
                        margin: '4px',
                        padding: '15px 15px',
                        width: '210px',
                        height: '230px'
                      }}
                    >
                      <Typography gutterBottom variant="button" component="h5">
                        {`${team.Team.name} @ ${team.Visitor.name}`}
                      </Typography>

                      <Typography gutterBottom variant="button" component="h2">
                        {`Match ${i + 1}`}
                      </Typography>
                      {logoLoading ? (
                        <Skeleton
                          variant="circle"
                          style={{
                            width: '100px',
                            height: '100px',
                            margin: 'auto'
                          }}
                        />
                      ) : (
                        ''
                      )}

                      <Avatar
                        style={{
                          width: logoLoading ? 0 : '100px',
                          height: logoLoading ? 0 : '100px',
                          margin: 'auto'
                        }}
                        src={
                          myteamsData.uuid === team.Team.uuid
                            ? team.Visitor.Team.logo
                            : team.Team.logo
                        }
                      />

                      <Match
                        team1={team.Team}
                        team2={team.Visitor.Team}
                        gameUuid={team.uuid}
                        playerStats={team.PlayerStats}
                        getGames={getGames}
                        game={team}
                        previousItem={previousItem || 'first'}
                        allGames={allGames}
                        i={i}
                        simulateAllGames={simulateAllGames}
                        allGameLoading={allGameLoading}
                        TeamUuid={myteamsData.uuid}
                        myteamsData={myteamsData}
                        handleClickOpenMessage={handleClickOpenMessage}
                        teamsData={teamsData}
                        matchAllGames={matchAllGames}
                        mySeason={mySeason}
                        iOpenTrophySnackbar={iOpenTrophySnackbar}
                        UserUuid={uuid}
                        TrophyData={TrophyData}
                        trophyName={trophyName}
                        getAllData={getAllData}
                      />
                    </Paper>
                  )
                })}
              <Paper
                elevation={10}
                style={{
                  margin: '4px',
                  padding: '20px',
                  width: '210px',
                  textAlign: 'center',
                  height: '230px'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={matchAllGames}
                  disabled={
                    !teamsData.find((game) => game.team1 === null) ||
                    allGameLoading
                  }
                  endIcon={<FastForwardIcon />}
                  style={{ width: '165px', marginTop: '30px' }}
                >
                  Simulate all
                </Button>

                <>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ForwardIcon />}
                    onClick={goOffSeason}
                    disabled={teamsData.find((game) => game.team1 === null)}
                    style={{ width: '165px', marginTop: '40px' }}
                  >
                    off season
                  </Button>
                  <ChampionsDialog
                    TeamUuid={TeamUuid}
                    teamsData={teamsData}
                    UserUuid={uuid}
                    SeasonUuid={SeasonUuid}
                  />
                </>
              </Paper>
            </GridList>
          </div>
        </>
      )}
    </>
  )
}

export default Home
