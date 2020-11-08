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
              width: '140px',
              height: '35px'
            }}
            variant="contained"
            endIcon={<CheckIcon />}
            color="secondary"
          >
            This one !
          </Button>
        ) : (
          <Button
            type="submit"
            style={{
              width: '140px',
              height: '35px'
            }}
            onClick={() => putTeamChoice(uuid)}
            variant="contained"
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
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          variant="static"
                          value={player.value}
                          color={teamChoice === uuid ? 'secondary' : 'primary'}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="button"
                            component="div"
                            color="textSecondary"
                          >
                            <strong>{player.value}</strong>
                          </Typography>
                        </Box>
                      </Box>
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
