import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import {
  Typography,
  CardMedia,
  Paper,
  Button,
  CardContent,
  CardActions,
  Grow,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  ListItemSecondaryAction
} from '@material-ui/core'
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp'
import RadioButtonCheckedSharpIcon from '@material-ui/icons/RadioButtonCheckedSharp'
import PlayerValue from '../mutliple/PlayerValue'
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp'
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp'

function App({ name, logo, uuid, putTeamChoice, teamChoice, players }) {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <>
      <Paper elevation={10} style={{ margin: '5px', width: '300px' }}>
        <Card>
          <CardContent
            style={{
              padding: '10px 16px 0px'
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>

          <CardContent
            style={{
              padding: '10px'
            }}
          >
            <Grow in={!expanded}>
              <CardMedia
                component="img"
                alt="logo"
                title="team logo"
                image={logo}
                style={{
                  width: '280px',
                  height: '280px',
                  margin: 'auto',
                  padding: '10px',
                  display: expanded ? 'none' : ''
                }}
              />
            </Grow>
            <Grow in={expanded}>
              <List
                style={{
                  display: !expanded ? 'none' : '',
                  padding: 0
                }}
              >
                {players
                  .sort(function (a, b) {
                    return new Date(b.value) - new Date(a.value)
                  })
                  .map((player) => {
                    return (
                      <ListItem
                        style={{
                          padding: '0 15px'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={player.lastName}
                            src={player.photo}
                            style={{
                              width: '50px',
                              height: '50px',
                              marginRight: '15px'
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={player.firstName}
                          secondary={player.lastName}
                        />
                        <ListItemSecondaryAction>
                          <PlayerValue playerValue={player.value} />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
              </List>
            </Grow>
          </CardContent>

          <CardActions disableSpacing>
            {teamChoice === uuid ? (
              <Button
                style={{
                  whiteSpace: 'nowrap'
                }}
                variant="contained"
                endIcon={<RadioButtonCheckedSharpIcon />}
                color="primary"
                size="small"
              >
                select
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={() => putTeamChoice(uuid)}
                variant="outlined"
                size="small"
                color="primary"
                endIcon={<RadioButtonUncheckedSharpIcon />}
              >
                Select
              </Button>
            )}
            <Button
              style={{ marginLeft: '10px' }}
              onClick={handleExpandClick}
              size="small"
              variant="outlined"
              endIcon={
                !expanded ? <VisibilitySharpIcon /> : <VisibilityOffSharpIcon />
              }
            >{`Players`}</Button>
          </CardActions>
        </Card>
      </Paper>
    </>
  )
}

export default App
