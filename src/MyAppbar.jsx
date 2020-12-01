import React, { useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Divider
} from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import TodayIcon from '@material-ui/icons/Today'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import GroupIcon from '@material-ui/icons/Group'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DescriptionIcon from '@material-ui/icons/Description'
import SearchIcon from '@material-ui/icons/Search'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import PostAddIcon from '@material-ui/icons/PostAdd'
import HelpIcon from '@material-ui/icons/Help'
import TocIcon from '@material-ui/icons/Toc'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonIcon from '@material-ui/icons/Person'
import trophyIcon from './images/trophyIconDark.png'
import trophyIconLight from './images/trophyIconLight.png'

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
      name: 'My team',
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
      to: '/ranking',
      name: 'Ranking',
      icon: <TocIcon />
    },
    {
      to: '/stats',
      name: 'Season stats',
      icon: <TrendingUpIcon />
    },
    {
      to: '/standings',
      name: 'Best players',
      icon: <StarsIcon />
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
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getPageName = () => {
    const page = links.find((link) => link.to === location.pathname)
    if (page) {
      return page.name
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
          <IconButton aria-label="menu" edge="start" onClick={handleClickOpen}>
            <MenuIcon style={{ color: '#2F2E2C' }} />
          </IconButton>

          <Typography style={{ color: '#2F2E2C' }} variant="h6">
            {getPageName()}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer anchor="left" open={open} onClose={handleClose}>
        {list()}
      </Drawer>

      {/* <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
          style={{
            margin: '100px auto ',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {links.map((link) => (
            <Paper
              elevation={10}
              style={{ width: '200px', height: '100px', margin: '10px' }}
            >
              <Link to={link.to} style={{ textDecoration: 'none' }}>
                <Button
                  startIcon={link.icon}
                  style={{ width: '200px', height: '100px' }}
                  onClick={handleClose}
                >
                  {link.name}
                </Button>
              </Link>
            </Paper>
          ))}
        </div>
      </Dialog> */}
    </>
  )
}

export default MyAppBar
