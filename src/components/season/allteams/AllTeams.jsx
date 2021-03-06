import { Grid, Paper } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import ProgressBall from '../../mutliple/ProgressBall'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  ListItemSecondaryAction,
  Typography,
  Box,
  Tab,
  Tabs
} from '@material-ui/core'
import './Allteams.css'
import AccountVerify from '../../mutliple/AccountVerify'
import PlayerValue from '../../mutliple/PlayerValue'

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '40%'
    }
  }
}))

function AllTeams() {
  const classes = useStyles()
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [allTeamsData, setAllTeamsData] = useState([])
  const [value, setValue] = useState(0)

  function TabPanel(props) {
    const { children, value, index } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    getTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTeams = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myleague/${UserUuid}`)
      setAllTeamsData(res.data)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AccountVerify />
      {isLoading ? (
        <>
          <ProgressBall />
        </>
      ) : (
        <>
          <Grid
            container
            style={{
              marginTop: '100px',
              marginBottom: '50px',
              justifyContent: 'center'
            }}
          >
            <Paper className={classes.paper}>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="on"
              >
                {allTeamsData.map((team) => (
                  <Tab label={team.name} />
                ))}
              </Tabs>

              <List>
                {allTeamsData[value].Players.sort(function (a, b) {
                  return new Date(b.value) - new Date(a.value)
                }).map((player) => {
                  return (
                    <TabPanel value={value} index={value}>
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
                    </TabPanel>
                  )
                })}
              </List>
            </Paper>
          </Grid>
        </>
      )}
    </>
  )
}
export default AllTeams
