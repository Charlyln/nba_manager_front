import React, { useState } from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

function Home({ text, team1, team2 }) {
  const [done, setDone] = useState(false)
  const [result, setResult] = useState('')
  const [win, setWin] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const match = (team1, team2) => {
    let team1Score = 0
    team1.map((player) => {
      const playerScore = Math.floor(
        Math.random() * (player.max - player.min) + player.min
      )
      //   console.log(
      //     player.name,
      //     'Points',
      //     playerScore,
      //     'Passes',
      //     Math.floor(
      //       Math.random() * (player.passeMax - player.passeMin) + player.passeMin
      //     ),
      //     'Rebonds',
      //     Math.floor(
      //       Math.random() * (player.rebondsMax - player.rebondsMin) +
      //         player.rebondsMin
      //     )
      //   )

      team1Score = team1Score + playerScore
      return team1Score
    })
    console.log(team1Score)

    let team2Score = 0
    team2.map((player) => {
      const playerScore = Math.floor(
        Math.random() * (player.max - player.min) + player.min
      )
      //   console.log(
      //     player.name,
      //     'Points',
      //     playerScore,
      //     'Passes',
      //     Math.floor(
      //       Math.random() * (player.passeMax - player.passeMin) + player.passeMin
      //     ),
      //     'Rebonds',
      //     Math.floor(
      //       Math.random() * (player.rebondsMax - player.rebondsMin) +
      //         player.rebondsMin
      //     )
      //   )
      team2Score = team2Score + playerScore
      return team2Score
    })
    // console.log(team2Score)

    if (team1Score > team2Score) {
      setWin(true)
    } else if (team1Score < team2Score) {
      setWin(false)
    }

    setResult(`${team1Score} - ${team2Score}`)
    setDone(true)
  }

  return (
    <>
      <CardActions>
        <Button size="small" style={{ whiteSpace: 'nowrap' }} color="primary">
          {text}
        </Button>
        {!done ? (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => match(team1, team2)}
            >
              Start
            </Button>
          </>
        ) : (
          <>
            {win ? (
              <Button
                size="small"
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor: 'rgb(76, 175, 80)'
                }}
                variant="contained"
                onClick={handleClickOpen}
              >
                {result || 'Done'}
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  style={{ whiteSpace: 'nowrap' }}
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  {result || 'Done'}
                </Button>
              </>
            )}
          </>
        )}
      </CardActions>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <h1>coucou</h1>
      </Dialog>
    </>
  )
}

export default Home
