import React, { useState } from 'react'
import {
  Button,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  ListItemSecondaryAction,
  Typography,
  CircularProgress,
  Box
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import PlayerValue from '../mutliple/PlayerValue'

const PlayerCardCollapse = ({ teamChoice, uuid, putTeamChoice, players }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <CardActions disableSpacing>
        {teamChoice === uuid ? (
          <Button
            style={{
              whiteSpace: 'nowrap'
            }}
            variant="contained"
            endIcon={<CheckIcon />}
            color="secondary"
            size="small"
          >
            This one
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => putTeamChoice(uuid)}
            variant="contained"
            size="small"
            color="primary"
            endIcon={<AddIcon />}
          >
            Select
          </Button>
        )}
        <Button
          style={{ marginLeft: 'auto' }}
          onClick={handleExpandClick}
          size="small"
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >{`Players`}</Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            {players
              .sort(function (a, b) {
                return new Date(b.value) - new Date(a.value)
              })
              .map((player) => {
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={player.lastName}
                        src={player.photo}
                        style={{ width: '50px', height: '50px' }}
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
        </CardContent>
      </Collapse>
    </>
  )
}

export default PlayerCardCollapse
