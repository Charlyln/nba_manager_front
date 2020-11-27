import React from 'react'
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TodayIcon from '@material-ui/icons/Today'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import GroupIcon from '@material-ui/icons/Group'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DescriptionIcon from '@material-ui/icons/Description'
import SearchIcon from '@material-ui/icons/Search'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountVerify from '../../mutliple/AccountVerify'

function Help() {
  const links = [
    {
      to: '/home',
      name: 'Calendar',
      icon: <TodayIcon />,
      details:
        'simulate games, and see stats in the games. You can simulate all games in once.'
    },
    {
      to: '/trade',
      name: 'Make a trade',
      icon: <SwapHorizIcon />,
      details: 'trade your players with other teams in the league.'
    },
    {
      to: '/myteam',
      name: 'My team',
      icon: <GroupIcon />,
      details:
        'see your players skills and their evolution with trainings, and you can free a player to sign an other one.'
    },
    {
      to: '/training',
      name: 'Training',
      icon: <DirectionsRunIcon />,
      details:
        'improve your players skills. But carreful, you have only 2 trainings per day.'
    },
    {
      to: '/stats',
      name: 'Stats',
      icon: <TrendingUpIcon />,
      details:
        'see your players stats, by player and by game. You can also see average season stats.'
    },
    {
      to: '/contracts',
      name: 'Contracts',
      icon: <DescriptionIcon />,
      details:
        'see all your players contracts, see the total salary, and the salary cap balance to know the salary cap left'
    },
    {
      to: '/playerfinder',
      name: 'Player finder',
      icon: <SearchIcon />,
      details: 'see all the players in the game. You can filter by name.'
    },
    {
      to: '/freeagents',
      name: 'Free agents',
      icon: <GroupAddIcon />,
      details:
        'see free agents in the league, players who have no contract. You can propose a contract to a free agent if you have space in your team.'
    },
    {
      to: '/history',
      name: 'History',
      icon: <HistoryIcon />,
      details: 'coucou'
    },
    {
      to: '/standings',
      name: 'Best players',
      icon: <StarsIcon />,
      details: 'coucou'
    },
    {
      to: '/extension',
      name: 'Extensions',
      icon: <PostAddIcon />,
      details:
        'propose a extension to players who have only 1 year left in their contract.'
    }
  ]

  return (
    <>
      <Grid style={{ marginTop: '100px', marginBottom: '100px' }}>
        <div style={{ width: '90%', margin: 'auto' }}>
          {links.map((help) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={help.name}
                >
                  {help.icon}
                  <Typography
                    style={{ marginLeft: '7px' }}
                  >{`${help.name}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{ marginLeft: '7px' }}
                  >{`In ${help.name.toLocaleLowerCase()}, you can ${
                    help.details
                  }`}</Typography>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      </Grid>
    </>
  )
}

export default Help
