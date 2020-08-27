import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import Match from './Match'

function Home() {
  const [matchs] = useState([
    {
      done: false,
      team: 'Lakers',
      text: 'LAL VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/LAL_logo.svg'
    },
    {
      done: false,
      team: 'Warriors',
      text: 'GSW VS MYT',
      logo:
        'https://fr.global.nba.com/media/img/teams/00/logos/GSW_logo.svg    '
    },
    {
      done: false,
      team: 'Denver',
      text: 'DEN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/DEN_logo.svg'
    },
    {
      done: false,
      team: 'Houston',
      text: 'HOU VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/HOU_logo.svg'
    },
    {
      done: false,
      team: 'Minnesota',
      text: 'MIN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIN_logo.svg'
    },
    {
      done: false,
      team: 'Boston',
      text: 'BOS VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/BOS_logo.svg'
    },
    {
      done: false,
      team: 'Chicago',
      text: 'CHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/CHI_logo.svg'
    },
    {
      done: false,
      team: 'Miami',
      text: 'MIA VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIA_logo.svg'
    },
    {
      done: false,
      team: 'Philadelphia',
      text: 'PHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/PHI_logo.svg'
    },
    {
      done: false,
      team: 'New York',
      text: 'NYK VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/NYK_logo.svg'
    },
    {
      done: false,
      team: 'Chicago',
      text: 'CHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/CHI_logo.svg'
    },
    {
      done: false,
      team: 'Philadelphia',
      text: 'PHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/PHI_logo.svg'
    },
    {
      done: false,
      team: 'Houston',
      text: 'HOU VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/HOU_logo.svg'
    },
    {
      done: false,
      team: 'Warriors',
      text: 'GSW VS MYT',
      logo:
        'https://fr.global.nba.com/media/img/teams/00/logos/GSW_logo.svg    '
    },
    {
      done: false,
      team: 'Denver',
      text: 'DEN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/DEN_logo.svg'
    },
    {
      done: false,
      team: 'Lakers',
      text: 'LAL VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/LAL_logo.svg'
    },
    {
      done: false,
      team: 'Minnesota',
      text: 'MIN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIN_logo.svg'
    },
    {
      done: false,
      team: 'Boston',
      text: 'BOS VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/BOS_logo.svg'
    },
    {
      done: false,
      team: 'Lakers',
      text: 'LAL VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/LAL_logo.svg'
    },
    {
      done: false,
      team: 'Warriors',
      text: 'GSW VS MYT',
      logo:
        'https://fr.global.nba.com/media/img/teams/00/logos/GSW_logo.svg    '
    },
    {
      done: false,
      team: 'Denver',
      text: 'DEN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/DEN_logo.svg'
    },
    {
      done: false,
      team: 'Houston',
      text: 'HOU VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/HOU_logo.svg'
    },
    {
      done: false,
      team: 'Minnesota',
      text: 'MIN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIN_logo.svg'
    },
    {
      done: false,
      team: 'Boston',
      text: 'BOS VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/BOS_logo.svg'
    },
    {
      done: false,
      team: 'Chicago',
      text: 'CHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/CHI_logo.svg'
    },
    {
      done: false,
      team: 'Miami',
      text: 'MIA VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIA_logo.svg'
    },
    {
      done: false,
      team: 'Philadelphia',
      text: 'PHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/PHI_logo.svg'
    },
    {
      done: false,
      team: 'New York',
      text: 'NYK VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/NYK_logo.svg'
    },
    {
      done: false,
      team: 'Chicago',
      text: 'CHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/CHI_logo.svg'
    },
    {
      done: false,
      team: 'Philadelphia',
      text: 'PHI VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/PHI_logo.svg'
    },
    {
      done: false,
      team: 'Houston',
      text: 'HOU VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/HOU_logo.svg'
    },
    {
      done: false,
      team: 'Warriors',
      text: 'GSW VS MYT',
      logo:
        'https://fr.global.nba.com/media/img/teams/00/logos/GSW_logo.svg    '
    },
    {
      done: false,
      team: 'Denver',
      text: 'DEN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/DEN_logo.svg'
    },
    {
      done: false,
      team: 'Lakers',
      text: 'LAL VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/LAL_logo.svg'
    },
    {
      done: false,
      team: 'Minnesota',
      text: 'MIN VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/MIN_logo.svg'
    },
    {
      done: false,
      team: 'Boston',
      text: 'BOS VS MYT',
      logo: 'https://fr.global.nba.com/media/img/teams/00/logos/BOS_logo.svg'
    }
  ])
  const team1 = [
    {
      name: 'Westbrook',
      image:
        'https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/russell-westbrook_orig.jpg',
      min: 10,
      max: 15,
      passeMin: 5,
      passeMax: 15,
      rebondsMin: 6,
      rebondsMax: 14
    },
    {
      name: 'Lebron',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/lebron-james_orig.jpg`,
      min: 20,
      max: 30,
      passeMin: 7,
      passeMax: 15,
      rebondsMin: 5,
      rebondsMax: 11
    },
    {
      name: 'Curry',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/stephen-curry_orig.jpg`,
      min: 22,
      max: 42,
      passeMin: 4,
      passeMax: 10,
      rebondsMin: 3,
      rebondsMax: 10
    }
  ]

  const team2 = [
    {
      name: 'Lillard',
      image:
        'https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/russell-westbrook_orig.jpg',
      min: 10,
      max: 40,
      passeMin: 4,
      passeMax: 12,
      rebondsMin: 3,
      rebondsMax: 10
    },
    {
      name: 'Kawhi',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/lebron-james_orig.jpg`,
      min: 20,
      max: 30,
      passeMin: 4,
      passeMax: 10,
      rebondsMin: 4,
      rebondsMax: 10
    },
    {
      name: 'George',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/stephen-curry_orig.jpg`,
      min: 18,
      max: 29,
      passeMin: 4,
      passeMax: 10,
      rebondsMin: 3,
      rebondsMax: 10
    }
  ]

  // const match = (team1, team2) => {
  //   let team1Score = 0
  //   team1.map((player) => {
  //     const playerScore = Math.floor(
  //       Math.random() * (player.max - player.min) + player.min
  //     )
  //     console.log(
  //       player.name,
  //       'Points',
  //       playerScore,
  //       'Passes',
  //       Math.floor(
  //         Math.random() * (player.passeMax - player.passeMin) + player.passeMin
  //       ),
  //       'Rebonds',
  //       Math.floor(
  //         Math.random() * (player.rebondsMax - player.rebondsMin) +
  //           player.rebondsMin
  //       )
  //     )

  //     team1Score = team1Score + playerScore
  //     return team1Score
  //   })
  //   console.log(team1Score)

  //   let team2Score = 0
  //   team2.map((player) => {
  //     const playerScore = Math.floor(
  //       Math.random() * (player.max - player.min) + player.min
  //     )
  //     console.log(
  //       player.name,
  //       'Points',
  //       playerScore,
  //       'Passes',
  //       Math.floor(
  //         Math.random() * (player.passeMax - player.passeMin) + player.passeMin
  //       ),
  //       'Rebonds',
  //       Math.floor(
  //         Math.random() * (player.rebondsMax - player.rebondsMin) +
  //           player.rebondsMin
  //       )
  //     )
  //     team2Score = team2Score + playerScore
  //     return team2Score
  //   })
  //   console.log(team2Score)

  //   if (team1Score > team2Score) {
  //     console.log('Team 1 win !')
  //   } else if (team1Score < team2Score) {
  //     console.log('Team 2 win !')
  //   } else {
  //     console.log('Egality')
  //   }
  // }

  return (
    <Grid container>
      {matchs.map((match) => (
        <Grid item xs={2}>
          <Grid container justify="center">
            <Card
              style={{ borderRadius: '0px', margin: '3px', width: '200px' }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {match.team}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  title="Contemplative Reptile"
                  style={{ width: 100, height: '100%', margin: 'auto' }}
                  image={match.logo}
                />
              </CardActionArea>
              <Match team1={team1} team2={team2} text={match.text} />
            </Card>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
