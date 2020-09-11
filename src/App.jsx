import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Grid, Typography, CircularProgress } from '@material-ui/core'
import PlayerCard from './PlayerCard'
import { apiUrl } from './apiUrl'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataTeams, setDataTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await Axios.get(`${apiUrl}/teams`)
        setDataTeams(res.data)

        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      } catch (err) {
        console.log(err)
        console.log(dataTeams)
      }
    }
    getTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const array = [
    {
      name: 'WESTBROOK',
      lastName: 'RUSSELL',
      image:
        'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3468.png&w=350&h=254',
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
      name: 'LEBRON',
      lastName: 'JAMES',
      image: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254`,
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
      name: 'CURRY',
      lastName: 'STEPHEN',
      image: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254`,
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
      name: 'KLAY',
      lastName: 'THOMPSON',
      image: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6475.png&w=350&h=254`,
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

  const checkoxChange = (name) => {
    console.log(name)
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="button" display="block" gutterBottom>
                1. Choose your players
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                {array.map((player) => (
                  <PlayerCard
                    name={player.name}
                    lastName={player.lastName}
                    image={player.image}
                    skills={player.skills}
                    checkoxChange={checkoxChange}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default App
