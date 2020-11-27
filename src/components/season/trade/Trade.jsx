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
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  ListItemAvatar,
  Typography
} from '@material-ui/core'
import { apiUrl } from '../../../apiUrl'
import Axios from 'axios'
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball'
import ProgressBall from '../../mutliple/ProgressBall'
import SpeedDials from './SpeedDials'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 400,
    height: 323,
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

  const getTeams = async () => {
    try {
      const UserUuid = uuid
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

  // const deleteOhterTeam = () => {
  //   setwantChangeTeam(true)
  //   // setLeft(myteamsData.Players)
  //   setRight([])
  //   setLeft([])
  //   setTeamsData([])
  //   // setRight([4, 5, 6, 7, 1])
  // }

  const getOtherTeams = async (uuid) => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/${uuid}`)
      setRight(res.data.Players)
      setTeamsData(res.data)
      setwantChangeTeam(false)

      // const timer = setTimeout(() => {
      //   setIsLoading(false)
      // }, 500)
      // return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getMyTeams()
    getTeams()
    // getOtherTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    // if (left.find(player => player.uuid === value.uuid)) {

    // }

    setChecked(newChecked)
  }

  // const handleAllRight = () => {
  //   setRight(right.concat(left))
  //   setLeft([])
  // }

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

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right))
  //   setRight([])
  // }

  const goBack = () => {
    handleClose()
    getTeams()
  }

  const tradeIt = () => {
    const rightFiltered = right.find(
      (player) => player.TeamUuid === myteamsData.uuid
    )

    const leftFiltered = left.find(
      (player) => player.TeamUuid !== myteamsData.uuid
    )

    if (!rightFiltered && !leftFiltered) {
      setMessage('No change ! Select players you want to trade and try again.')
    } else if (left.length !== 5 || right.length !== 5) {
      setMessage(
        'Trade rejected ! The 2 teams must have the same number of players after the trade.'
      )
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

      console.log(sum, sum2)

      if (sum > sum2) {
        setMessage(
          `Trade rejected ! We give you too much for what we receive !`
        )
      } else {
        setRight([])
        setwantChangeTeam(true)

        setLeft([])
        setTeamsData([])

        setMessage(`Trade accepeted !`)
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
        getMyTeams()
        getTeams()
      }
    }

    handleClickOpen()
  }

  const customList = (items) => {
    return (
      <>
        {items
          .sort(function (a, b) {
            return new Date(b.value) - new Date(a.value)
          })
          .map((value) => {
            const labelId = `transfer-list-item-${value}-label`

            return (
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

                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="static"
                    value={value.value}
                    color={
                      value.TeamUuid === myteamsData.uuid
                        ? 'primary'
                        : 'secondary'
                    }
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
                      <strong>{value.value}</strong>
                    </Typography>
                  </Box>
                </Box>

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
            )
          })}
        <ListItem />
      </>
    )
  }

  if (isLoading) {
    return <ProgressBall />
  }

  return (
    <>
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
        // spacing={2}
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
                left.length !== 5 ||
                right.length !== 5 ||
                !right.find((player) => player.TeamUuid === myteamsData.uuid)
              }
            >
              Trade
            </Button>
          </Grid>
        </Grid>
        <Grid item className={classes.paper}>
          <Paper>
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
            <Button onClick={goBack} color="primary">
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}
