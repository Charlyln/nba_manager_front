import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Grid, CircularProgress, AppBar, Toolbar } from '@material-ui/core'
import Match from './Match'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [myteamsData, setMyTeamsData] = useState({})

  const getTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/games/${UserUuid}`)
      setTeamsData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const getMyTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamsData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getTeams()
    getMyTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <Typography
            variant="h6"
            display="block"
            gutterBottom
            style={{ marginLeft: '30px' }}
          >
            Agenda
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container style={{ marginTop: '100px' }}>
        {isLoading ? (
          <CircularProgress style={{ margin: 'auto' }} />
        ) : (
          <>
            {teamsData
              .filter((team) => !team.Visitor.Team.choice)
              .map((team, i) => (
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <Card
                      style={{
                        borderRadius: '0px',
                        margin: '3px',
                        width: '200px',
                        background: 'unset',
                        border: 'solid 1px',
                        borderColor: '#E59923',
                        color: 'white'
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {team.Visitor.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="button"
                            component="h2"
                          >
                            {`Match ${i + 1}`}
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          title="Contemplative Reptile"
                          style={{ width: 100, height: '100%', margin: 'auto' }}
                          image={team.Visitor.logo}
                        />
                      </CardActionArea>
                      <Match
                        myTeam={myteamsData}
                        team2={team.Visitor.Team}
                        gameUuid={team.uuid}
                        playerStats={team.PlayerStats}
                        getTeams={getTeams}
                      />
                    </Card>
                  </Grid>
                </Grid>
              ))}
          </>
        )}
      </Grid>
    </>
  )
}

export default Home
