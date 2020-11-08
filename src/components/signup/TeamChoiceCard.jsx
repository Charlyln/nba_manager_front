import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography, CardMedia } from '@material-ui/core'
import PlayerCardCollapse from './PlayerCardCollapse'

function App({ name, logo, uuid, putTeamChoice, teamChoice, players }) {
  return (
    <>
      <Card
        style={{
          width: '300px',
          background: 'linear-gradient(45deg, black, transparent)',
          color: 'white'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="logo"
          height="140"
          title="team logo"
          image={logo}
          style={{ width: '100%', height: '100%' }}
        />
        <PlayerCardCollapse
          putTeamChoice={putTeamChoice}
          uuid={uuid}
          teamChoice={teamChoice}
          players={players}
        />
      </Card>
    </>
  )
}

export default App
