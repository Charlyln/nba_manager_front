import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { Grid, List, CardMedia, Checkbox } from '@material-ui/core'

function App() {
  const array = [
    {
      name: 'Westbrook',
      image:
        'https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/russell-westbrook_orig.jpg',
      skills: [
        {
          name: 'DRI',
          score: 90
        },
        {
          name: 'SHO',
          score: 75
        },
        {
          name: 'PAS',
          score: 83
        },
        {
          name: 'REB',
          score: 88
        }
      ]
    },
    {
      name: 'Lebron',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/lebron-james_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 85
        },
        {
          name: 'SHO',
          score: 85
        },
        {
          name: 'PAS',
          score: 95
        },
        {
          name: 'REB',
          score: 85
        }
      ]
    },
    {
      name: 'Curry',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/stephen-curry_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 97
        },
        {
          name: 'SHO',
          score: 99
        },
        {
          name: 'PAS',
          score: 92
        },
        {
          name: 'REB',
          score: 65
        }
      ]
    },
    {
      name: 'Iverson',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/allen-iverson_orig.png`,
      skills: [
        {
          name: 'DRI',
          score: 97
        },
        {
          name: 'SHO',
          score: 89
        },
        {
          name: 'PAS',
          score: 80
        },
        {
          name: 'REB',
          score: 70
        }
      ]
    },
    {
      name: 'Magic',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/magic-johnson_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 95
        },
        {
          name: 'SHO',
          score: 85
        },
        {
          name: 'PAS',
          score: 98
        },
        {
          name: 'REB',
          score: 87
        }
      ]
    },
    {
      name: 'Giannis',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/giannis-antetokounmpo_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 85
        },
        {
          name: 'SHO',
          score: 75
        },
        {
          name: 'PAS',
          score: 85
        },
        {
          name: 'REB',
          score: 93
        }
      ]
    },
    {
      name: 'Shaq',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/shaquille-o-neal_1_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 70
        },
        {
          name: 'SHO',
          score: 72
        },
        {
          name: 'PAS',
          score: 75
        },
        {
          name: 'REB',
          score: 98
        }
      ]
    },
    {
      name: 'Butler',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/jimmy-butler_1_orig.jpg`,
      skills: [
        {
          name: 'DRI',
          score: 87
        },
        {
          name: 'SHO',
          score: 84
        },
        {
          name: 'PAS',
          score: 84
        },
        {
          name: 'REB',
          score: 83
        }
      ]
    },
    {
      name: 'Kawhi',
      image: `https://maddenratings.weebly.com/uploads/1/4/0/9/14097292/kawhi-leonard_orig.png`,
      skills: [
        {
          name: 'DRI',
          score: 89
        },
        {
          name: 'SHO',
          score: 89
        },
        {
          name: 'PAS',
          score: 86
        },
        {
          name: 'REB',
          score: 81
        }
      ]
    }
  ]

  const images = array.map((player) => {
    return (
      <Card
        style={{
          display: 'flex',
          margin: '30px',
          width: '300px',
          borderRadius: '10px'
        }}
      >
        <CardMedia image={player.image} style={{ width: 150, height: '100%' }}>
          {/* <img
            key={player.name}
            src={require(player.image)}
            style={{ width: 150, height: '100%' }}
          /> */}
        </CardMedia>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent style={{ width: '150px', padding: 0 }}>
            <List>
              <ListItem>
                <Typography component="h3" variant="h6">
                  {player.name}
                </Typography>
                <Checkbox />
              </ListItem>

              {player.skills.map((skill) => (
                <>
                  <ListItem>
                    <ListItemText>{skill.score}</ListItemText>{' '}
                    <ListItemText>{skill.name}</ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
              {/* <ListItem>
                <ListItemText>95</ListItemText> <ListItemText>DRI</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>95</ListItemText> <ListItemText>SHO</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>95</ListItemText> <ListItemText>PAS</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>95</ListItemText> <ListItemText>DUN</ListItemText>
              </ListItem> */}
            </List>
          </CardContent>
        </div>
      </Card>
    )
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          {images}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
