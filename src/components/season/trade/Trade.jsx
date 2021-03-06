import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grow,
  ListItemAvatar
} from '@material-ui/core'
import { apiUrl } from '../../../apiUrl'
import Axios from 'axios'
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball'
import ProgressBall from '../../mutliple/ProgressBall'
import SpeedDials from './SpeedDials'
import AccountVerify from '../../mutliple/AccountVerify'
import TrophySnackbar from '../../mutliple/TrophySnackbar'
import updateSalaryCapLeft from '../../api calls/updateSalaryCapLeft'
import PlayerValue from '../../mutliple/PlayerValue'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 400,
    height: 365,
    overflow: 'auto'
  },
  button: {
    margin: 5
  }
}))

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

export default function Trade() {
  const classes = useStyles()
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([4, 5, 6, 7, 1])
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [myteamsData, setMyTeamsData] = useState({})
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [wantChangeTeam, setwantChangeTeam] = useState(true)
  const [allTeamsData, setAllTeamsData] = useState([])
  const [openTrophySnackbar, setOpenTrophySnackbar] = useState(false)
  const [TrophyData, setTrophyData] = useState([])
  const [trophyName] = useState('Make a trade')

  const iOpenTrophySnackbar = () => {
    setOpenTrophySnackbar(true)
  }

  const closeTrophySnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenTrophySnackbar(false)
  }

  const getTrophy = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/trophies/${trophyName}/${uuid}`)
      setTrophyData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myleague/${UserUuid}`)
      setAllTeamsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setMessage('')
  }

  const getMyTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setLeft(res.data.Players)
      setMyTeamsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getOtherTeams = async (uuid) => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/${uuid}`)
      setRight(res.data.Players)
      setTeamsData(res.data)
      setwantChangeTeam(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      await getMyTeams()
      await getTeams()
      await getTrophy()
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (error) {
      console.log(error)
    }
  }

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value) => () => {
    console.log(value)
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const tradeIt = async () => {
    const rightFiltered = right.find(
      (player) => player.TeamUuid === myteamsData.uuid
    )

    const leftFiltered = left.find(
      (player) => player.TeamUuid !== myteamsData.uuid
    )

    if (!rightFiltered && !leftFiltered) {
      setMessage('No change ! Select players you want to trade and try again.')
    } else {
      const array3 = left
        .filter((player) => player.TeamUuid === teamsData.uuid)
        .map((player) => {
          return player.value
        })
      const array4 = right
        .filter((player) => player.TeamUuid === myteamsData.uuid)
        .map((player) => {
          return player.value
        })

      const add1 = (a, b) => a + b
      const add2 = (a, b) => a + b
      const sum = array3.reduce(add1)
      const sum2 = array4.reduce(add2)

      if (sum > sum2) {
        setMessage(`Trade rejected ! We give you too much for what we receive.`)
      } else if (array4.length !== array3.length) {
        setMessage(
          `Trade rejected ! You must trade the same number of players.`
        )
      } else {
        setRight([])
        setwantChangeTeam(true)

        setLeft([])
        setTeamsData([])
        setMessage(`Trade accepeted !`)

        if (!TrophyData.earned) {
          await Axios.post(`${apiUrl}/trophies/earned/${uuid}`, {
            name: trophyName
          })
          iOpenTrophySnackbar()
        }
        const array5 = left.filter(
          (player) => player.TeamUuid === teamsData.uuid
        )
        const array6 = right.filter(
          (player) => player.TeamUuid === myteamsData.uuid
        )

        array5.map(
          async (player) =>
            await Axios.put(`${apiUrl}/players/${player.uuid}`, {
              TeamUuid: myteamsData.uuid
            })
        )
        array6.map(
          async (player) =>
            await Axios.put(`${apiUrl}/players/${player.uuid}`, {
              TeamUuid: teamsData.uuid
            })
        )
        await updateSalaryCapLeft(uuid, myteamsData.uuid)
        await getTeams()
        await getMyTeams()
      }
    }

    handleClickOpen()
  }

  const customList = (items) => {
    return (
      <>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`

          return (
            <Grow in>
              <ListItem
                key={value}
                role="listitem"
                button
                disabled={wantChangeTeam}
                onClick={handleToggle(value)}
              >
                <ListItemAvatar>
                  <Avatar src={value.photo} />
                </ListItemAvatar>
                <ListItemText
                  style={{ marginRight: '20px' }}
                  id={labelId}
                  primary={`${value.firstName || ''} ${value.lastName || ''}`}
                />

                {value.value ? (
                  <PlayerValue
                    playerValue={value.value}
                    playerTeamUuid={value.TeamUuid}
                    changeBoxColor={true}
                  />
                ) : (
                  ''
                )}

                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    disabled={wantChangeTeam}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              </ListItem>
            </Grow>
          )
        })}
        <ListItem />
      </>
    )
  }

  return (
    <>
      <AccountVerify />
      {isLoading ? (
        <ProgressBall />
      ) : (
        <>
          <TrophySnackbar
            openTrophySnackbar={openTrophySnackbar}
            closeTrophySnackbar={closeTrophySnackbar}
            trophyName={trophyName}
          />
          <Grid container style={{ marginTop: '100px' }}>
            <Grid item xs={12}>
              <SpeedDials
                myteamsUuid={myteamsData.uuid}
                allTeamsData={allTeamsData}
                getOtherTeams={getOtherTeams}
                right={right}
              />
            </Grid>
          </Grid>
          <Grid
            justify="center"
            alignItems="center"
            className={classes.root}
            container
            style={{ marginTop: '50px' }}
          >
            <Grid item>
              <Paper className={classes.paper}>
                <List dense component="div" role="list">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={myteamsData.logo} />
                    </ListItemAvatar>
                    <ListItemText primary={`${myteamsData.name}`} />
                  </ListItem>
                  <Divider />
                  {customList(left)}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>

                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={tradeIt}
                  disabled={
                    !right.find(
                      (player) => player.TeamUuid === myteamsData.uuid
                    ) ||
                    !left.find((player) => player.TeamUuid !== myteamsData.uuid)
                  }
                >
                  Trade
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <List dense component="div" role="list">
                  <ListItem>
                    <ListItemAvatar>
                      {right.length > 0 ? (
                        <Avatar src={teamsData.logo} />
                      ) : (
                        <Avatar>
                          <SportsBasketballIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText primary={`${teamsData.name || ''}`} />
                  </ListItem>
                  <Divider />
                  {customList(right)}
                </List>
              </Paper>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      )}
    </>
  )
}
