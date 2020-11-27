import { Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
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
  CircularProgress,
  Box,
  Tab,
  Tabs
} from '@material-ui/core'
import './Allteams.css'
import AccountVerify from '../../mutliple/AccountVerify'

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
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  }

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`
    }
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
      {isLoading ? (
        <ProgressBall />
      ) : (
        <>
          <AccountVerify />
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
                  <Tab label={team.name} {...a11yProps(value)} />
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
                          <Box position="relative" display="inline-flex">
                            <CircularProgress
                              variant="static"
                              value={player.value}
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
