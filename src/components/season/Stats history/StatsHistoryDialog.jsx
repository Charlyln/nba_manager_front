import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import {
  Avatar,
  Divider,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'

function StatsHistoryDialog({ game }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleClickOpen} variant="outlined" size="small">
        Open
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemAvatar style={{ margin: '0px 5px' }}>
                      <Avatar
                        src={game.Team.logo}
                        style={{ width: '60px', height: '60px' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ margin: '5px 20px' }}
                      primary={` ${game.Team.name}`}
                    />
                    <ListItemSecondaryAction>
                      {game.team1}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  {game.PlayerStats.filter(
                    (stat) => stat.teamIdAtTheGame === game.Team.uuid
                  )
                    .sort(function (a, b) {
                      return new Date(b.pts) - new Date(a.pts)
                    })
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar style={{ margin: '0px 5px' }}>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '60px', height: '60px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            style={{ margin: '5px 20px' }}
                            primary={player.Player.firstName}
                            secondary={player.Player.lastName}
                          />
                          <ListItemSecondaryAction>
                            {player.pts}
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                </List>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemAvatar style={{ margin: '0px 5px' }}>
                      <Avatar
                        src={game.Visitor.Team.logo}
                        style={{ width: '60px', height: '60px' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ margin: '5px 20px' }}
                      primary={` ${game.Visitor.Team.name}`}
                    />
                    <ListItemSecondaryAction>
                      {game.team2}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  {game.PlayerStats.filter(
                    (stat) => stat.teamIdAtTheGame !== game.Team.uuid
                  )
                    .sort(function (a, b) {
                      return new Date(b.pts) - new Date(a.pts)
                    })
                    .map((player) => {
                      return (
                        <ListItem>
                          <ListItemAvatar style={{ margin: '0px 5px' }}>
                            <Avatar
                              alt={player.Player.lastName}
                              src={player.Player.photo}
                              style={{ width: '60px', height: '60px' }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            style={{ margin: '5px 20px' }}
                            primary={player.Player.firstName}
                            secondary={player.Player.lastName}
                          />
                          <ListItemSecondaryAction>
                            {player.pts}
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default StatsHistoryDialog
