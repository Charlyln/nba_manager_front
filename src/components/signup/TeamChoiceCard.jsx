import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography, CardMedia, Paper } from '@material-ui/core'
import PlayerCardCollapse from './PlayerCardCollapse'

function App({ name, logo, uuid, putTeamChoice, teamChoice, players }) {
  return (
    <>
      <Paper elevation={10} style={{ margin: '5px', width: '300px' }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt="logo"
            title="team logo"
            image={logo}
            style={{ width: '250px', height: '250px', margin: 'auto' }}
          />
          <PlayerCardCollapse
            putTeamChoice={putTeamChoice}
            uuid={uuid}
            teamChoice={teamChoice}
            players={players}
          />
        </Card>
      </Paper>
    </>
  )
}

export default App
