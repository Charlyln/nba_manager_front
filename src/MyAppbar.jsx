import React, { useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import TodayIcon from '@material-ui/icons/Today'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import GroupIcon from '@material-ui/icons/Group'
import MenuIcon from '@material-ui/icons/Menu'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DescriptionIcon from '@material-ui/icons/Description'
import SearchIcon from '@material-ui/icons/Search'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import HistoryIcon from '@material-ui/icons/History'
import PostAddIcon from '@material-ui/icons/PostAdd'
import HelpIcon from '@material-ui/icons/Help'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonIcon from '@material-ui/icons/Person'
import trophyIcon from './images/trophyIconDark.png'
import trophyIconLight from './images/trophyIconLight.png'
import TocIcon from '@material-ui/icons/Toc'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import allActions from './actions'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

function MyAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tutorial = useSelector((state) => state.tutorial)
  const [open, setOpen] = useState(false)
  const [trophyIsSelected, setTrophyIsSelected] = useState(false)
  let location = useLocation()

  const links = [
    {
      to: '/home',
      name: 'Calendar',
      icon: <TodayIcon />
    },
    {
      to: '/myteam',
      name: 'My roster',
      icon: <PersonIcon />
    },
    {
      to: '/training',
      name: 'Training',
      icon: <DirectionsRunIcon />
    },
    {
      to: '/contracts',
      name: 'Contracts',
      icon: <DescriptionIcon />
    },
    {
      to: '/extension',
      name: 'Extensions',
      icon: <PostAddIcon />
    },
    {
      to: '/playerfinder',
      name: 'Player finder',
      icon: <SearchIcon />
    },
    {
      to: '/freeagents',
      name: 'Free agents',
      icon: <GroupAddIcon />
    },
    {
      to: '/trade',
      name: 'Trade',
      icon: <SwapHorizIcon />
    },
    {
      to: '/allteams',
      name: 'All teams',
      icon: <GroupIcon />
    },
    {
      to: '/charts',
      name: 'Charts',
      icon: <TrendingUpIcon />
    },
    {
      to: '/ranking',
      name: 'Ranking',
      icon: <FormatListNumberedIcon />
    },
    {
      to: '/standings',
      name: 'Best players',
      icon: <WhatshotIcon />
    },
    {
      to: '/stats',
      name: 'Season stats',
      icon: <TocIcon />
    },
    {
      to: '/history',
      name: 'Stats history',
      icon: <HistoryIcon />
    },
    {
      to: '/profil',
      name: 'Trophies',
      icon: (
        <img
          style={{
            width: '25px',
            height: '25px'
          }}
          src={trophyIsSelected ? trophyIconLight : trophyIcon}
          alt="trophy"
        />
      )
    },
    {
      to: '/profil',
      name: 'Profil',
      icon: <AccountCircleIcon />
    },
    {
      to: '/help',
      name: 'Help',
      icon: <HelpIcon />
    }
  ]

  const handleClickOpen = () => {
    setOpen(true)
    if (tutorial && tutorial.step === 4) {
      const timer = setTimeout(() => {
        dispatch(allActions.tutorialActions.increment())
      }, 100)
      return () => clearTimeout(timer)
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (tutorial && tutorial.step === 5) {
      const timer = setTimeout(() => {
        dispatch(allActions.tutorialActions.increment())
        dispatch(allActions.tutorialActions.setGeneralTutoOn())
      }, 100)
      return () => clearTimeout(timer)
    }
  }

  const handleChange = () => {
    if (tutorial && tutorial.is === 'on' && tutorial.step === 6) {
      dispatch(allActions.tutorialActions.increment())
      dispatch(allActions.tutorialActions.setOff())
      dispatch(allActions.tutorialActions.setGeneralTutoOff())
      window.localStorage.setItem(
        'tutorial',
        JSON.stringify({
          ...tutorial,
          step: 7,
          is: 'off',
          generalTutoIs: 'off',
          generalStep: 0
        })
      )
    } else if (tutorial && tutorial.generalTutoIs === 'on') {
      dispatch(allActions.tutorialActions.setGeneralTutoOff())
      window.localStorage.setItem(
        'tutorial',
        JSON.stringify({ ...tutorial, generalTutoIs: 'off', generalStep: 0 })
      )
    } else if (tutorial && tutorial.generalTutoIs === 'off') {
      dispatch(allActions.tutorialActions.setGeneralTutoOn())
      window.localStorage.setItem(
        'tutorial',
        JSON.stringify({ ...tutorial, generalTutoIs: 'on', generalStep: 0 })
      )
    }
  }

  const getPageName = () => {
    const page = links.find((link) => link.to === location.pathname)
    if (page) {
      return page.name.toUpperCase()
    }
  }
  const putRightTrophyIcon = () => {
    setTrophyIsSelected((trophyIsSelected) => !trophyIsSelected)
  }

  const list = () => (
    <div role="presentation" className={classes.list}>
      <List>
        {links.map((link) => (
          <>
            <Link
              className="tutoSideBar"
              to={link.to}
              style={{ textDecoration: 'none', color: 'white' }}
              onMouseEnter={link.name === 'Trophies' ? putRightTrophyIcon : ''}
              onMouseLeave={link.name === 'Trophies' ? putRightTrophyIcon : ''}
            >
              <ListItem button key={link.name} onClick={handleClose}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
            {link.to === '/extension' ||
            link.to === '/home' ||
            link.to === '/allteams' ||
            link.to === '/history' ? (
              <Divider />
            ) : (
              ''
            )}
          </>
        ))}
      </List>
    </div>
  )

  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <IconButton
            aria-label="menu"
            edge="start"
            disabled={tutorial && tutorial.step < 4}
            onClick={handleClickOpen}
            className="tutoAppBar"
          >
            <MenuIcon style={{ color: '#2F2E2C' }} />
          </IconButton>

          <Typography style={{ color: '#2F2E2C' }} variant="h6" component="h6">
            {getPageName()}
          </Typography>

          {tutorial && tutorial.step < 6 ? (
            ''
          ) : (
            <FormControlLabel
              className="tutoSwitch"
              style={{ marginLeft: 'auto' }}
              control={
                <Switch
                  checked={tutorial && tutorial.generalTutoIs === 'on'}
                  onChange={handleChange}
                  name="Tutorial"
                />
              }
              label={
                <HelpIcon
                  style={{
                    color:
                      tutorial && tutorial.generalTutoIs === 'on'
                        ? ''
                        : '#bdbdbd',
                    marginTop: '5px'
                  }}
                  color={
                    tutorial && tutorial.generalTutoIs === 'on'
                      ? 'secondary'
                      : ''
                  }
                />
              }
              labelPlacement="start"
            />
          )}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer anchor="left" open={open} onClose={handleClose}>
        {list()}
      </SwipeableDrawer>
    </>
  )
}

export default MyAppBar
