import React, { useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Paper,
  Typography
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

function MyAppBar() {
  const [open, setOpen] = useState(false)
  let location = useLocation()

  const links = [
    {
      to: '/home',
      name: 'Calendar',
      icon: <TodayIcon />
    },
    {
      to: '/trade',
      name: 'Trade',
      icon: <SwapHorizIcon />
    },
    {
      to: '/myteam',
      name: 'My team',
      icon: <PersonIcon />
    },
    {
      to: '/allteams',
      name: 'All teams',
      icon: <GroupIcon />
    },
    {
      to: '/training',
      name: 'Training',
      icon: <DirectionsRunIcon />
    },
    {
      to: '/stats',
      name: 'Season stats',
      icon: <TrendingUpIcon />
    },
    {
      to: '/contracts',
      name: 'Contracts',
      icon: <DescriptionIcon />
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
      to: '/history',
      name: 'Stats history',
      icon: <HistoryIcon />
    },
    {
      to: '/ranking',
      name: 'Ranking',
      icon: <TocIcon />
    },
    {
      to: '/standings',
      name: 'Best players',
      icon: <StarsIcon />
    },
    {
      to: '/extension',
      name: 'Extensions',
      icon: <PostAddIcon />
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
      <Dialog fullScreen open={open} onClose={handleClose}>
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
      </Dialog>
    </>
  )
}

export default MyAppBar
