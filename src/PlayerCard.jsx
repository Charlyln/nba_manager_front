import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import {
  List,
  Checkbox,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core'

function PlayerCard({ name, lastName, image, skills, checkoxChange }) {
  return (
    <Card
      style={{
        margin: '30px',
        width: '300px',
        borderRadius: '10px'
      }}
    >
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                style={{
                  width: '70px',
                  height: '70px'
                }}
                alt="Remy Sharp"
                src={image}
              />
            </ListItemAvatar>
            <ListItemText
              style={{
                marginLeft: '10px'
              }}
              primary={name}
              secondary={lastName}
            />

            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                color="primary"
                onChange={() => checkoxChange(name)}
              />
            </ListItemSecondaryAction>
          </ListItem>

          {skills.map((skill) => (
            <>
              <ListItem>
                <ListItemText>{skill.score}</ListItemText>{' '}
                <ListItemText>{skill.name}</ListItemText>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayerCard
