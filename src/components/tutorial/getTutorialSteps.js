import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PersonIcon from '@material-ui/icons/Person'
import HelpIcon from '@material-ui/icons/Help'

const myRoster = [
  {
    target: '.tutoMyRoster1',
    content: (
      <div>
        Your line-up is your players who play games. Put the best you have in
        it.
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster2',
    content: ` Your bench is the players who doens't play games, you can find young players in development for exemple, waiting for them to improve or other players in case you lose a player.`,
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster3',
    content: (
      <div>
        You can put on bench a player with it.
        <Grid item xs={12} style={{ margin: '5px 0px' }}>
          click
          <TouchAppIcon
            style={{
              marginBottom: '-5px'
            }}
          />
        </Grid>
        We put it back after.
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster4',
    content: (
      <div>
        And this one is to put a player in line-up, you can put it back!{' '}
        <Grid item xs={12} style={{ margin: '5px 0px' }}>
          click
          <TouchAppIcon
            style={{
              marginBottom: '-5px'
            }}
          />
        </Grid>
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster5',
    content: (
      <div>
        You have a quick feedback on the player progress. If he progress, you
        see a green arrow
        <ArrowDropDownCircleIcon
          style={{
            transform: 'rotate(180deg)',
            color: 'rgb(76, 175, 80)',
            margin: '-5px 1px -5px 2px'
          }}
        />
        . If he regress, you see a red arrow{' '}
        <ArrowDropDownCircleIcon
          style={{
            transform: 'rotate(180deg)',
            color: 'rgb(217, 48, 33)',
            marginBottom: '-5px'
          }}
        />{' '}
        . Otherwise, if he stay at his level, no arrow.
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster6',
    content: (
      <div>
        In this game, player stats evolve with time. This is the value of the
        player. It is constantly recalculate, in function of the player stats
        evolving. It gives you a quick idea of the player level. Go to the chart
        page{' '}
        <TrendingUpIcon
          style={{
            marginBottom: '-5px'
          }}
        />{' '}
        if you want to know more about player stats evolving.
      </div>
    ),
    disableBeacon: true
  }
]
const contracts = [
  {
    target: '.tutoContracts1',
    content: (
      <div>
        It is the amount of money that your team spend on players salaries for
        actual season. In NBA, (and in other sports) we called salary cap the
        limit of this amount. In this game, it is 100 millions($).
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoContracts2',
    content:
      'It is the season in progress, and you have a visual for the next 3 years.',
    disableBeacon: true
  },
  {
    target: '.tutoContracts3',
    content: 'Here the money your team spend for year n+1 etc...',
    disableBeacon: true
  },
  {
    target: '.tutoContracts4',
    content: 'The money you have left for this season.',
    disableBeacon: true
  },
  {
    target: '.tutoContracts5',
    content: 'The money you have left for the year n+1 etc...',
    disableBeacon: true
  },
  {
    target: '.tutoContracts6',
    content: 'You can also fire a player to release money.',
    disableBeacon: true
  }
]
const extensions = [
  {
    target: '.tutoExtensions1',
    content: `Here you find the players you can resign. You can do that for a player who has only 1 year left on his contract (if you don't have any, come back later).`,
    disableBeacon: true
  },
  {
    target: '.tutoExtensions2',
    content: (
      <div>
        Click{' '}
        <TouchAppIcon
          style={{
            marginBottom: '-5px'
          }}
        />{' '}
        to see how we resign a player.
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoExtensions3',
    content:
      'Select the salary you want to give to the player, and look at the player interest under the player photo.',
    disableBeacon: true,
    spotlightPadding: 35,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '.tutoExtensions4',
    content:
      'You can see at the same time the interest of the player in function of the salary you put.',
    disableBeacon: true,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '.tutoExtensions5',
    content:
      'Select the number of years you want for the contract in addition of his actual year.',
    disableBeacon: true,
    spotlightPadding: 35,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '.tutoExtensions6',
    content: (
      <div>
        Click{' '}
        <TouchAppIcon
          style={{
            marginBottom: '-5px'
          }}
        />{' '}
        to propose the contract if you want to try.
      </div>
    ),
    disableBeacon: true,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '.tutoExtensions7',
    content: 'You see the answer to your proposal.',
    disableBeacon: true,

    styles: {
      options: {
        zIndex: 10000
      }
    }
  }
]
const homehasNotViewed = [
  {
    target: '.tutoSwitch',
    content: `Hello there, welcome to nba manager, if you want tutorial help, turn on this on any page, you will find tips and explanations. Enjoy!`,
    disableBeacon: true
  }
]
const homehasViewed = [
  {
    target: '.tutoHome1',
    content: (
      <div>
        You can simulate one game here.
        <Grid item xs={12} style={{ margin: '5px 0px' }}>
          click
          <TouchAppIcon
            style={{
              marginBottom: '-5px'
            }}
          />
        </Grid>
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoHome2',
    content: (
      <Typography>
        After simulate, you can see game result, and you can open game stats.
        <Grid item xs={12} style={{ margin: '5px 0px 0px 0px' }}>
          Open stats
          <TouchAppIcon
            style={{
              marginBottom: '-5px'
            }}
          />
        </Grid>
      </Typography>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoHome3',
    content: (
      <>
        <Typography>
          Here, you can see all game stats for each player (points, rebounds,
          assists etc..).
        </Typography>
        <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
          Close it{' '}
          <TouchAppIcon
            style={{
              marginBottom: '-5px'
            }}
          />{' '}
          when you ready to continue
        </Typography>
      </>
    ),
    disableBeacon: true
    // styles: {
    //   options: {
    //     marginTop: '100px'
    //   }
    // }
  },
  {
    target: '.tutoHome4',
    content: (
      <>
        <Typography>You can simulate all game in the season here.</Typography>
        <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
          You will be able to do it after the tutorial, go next for now.
        </Typography>
      </>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoHome5',
    content: 'Click to open the sidebar',
    disableBeacon: true
  },
  {
    target: '.tutoHome6',
    content: (
      <>
        <Typography>
          This is your sidebar, you can find everything you need here.
          <Grid item xs={12} style={{ margin: '5px 0px 0px 0px' }}>
            Go to my roster{' '}
            <PersonIcon
              style={{
                marginBottom: '-5px'
              }}
            />{' '}
            to continue.
          </Grid>
        </Typography>
        <Typography style={{ color: 'grey', fontSize: 'inherit' }}>
          You can turn off the tutorial at any moment on the appbar{' '}
          <HelpIcon
            style={{
              marginBottom: '-3px',
              fontSize: 'large'
            }}
          />{' '}
        </Typography>
      </>
    ),
    disableBeacon: true,
    placement: 'right-end',
    spotlightPadding: 0,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  }
]

const playerFinder = [
  {
    target: '.tutoPlayerFinder1',
    content: (
      <div>
        All players are display here. You have their stats, age, value etc...
      </div>
    ),
    disableBeacon: true
  },
  {
    target: '.tutoPlayerFinder2',
    content: <div>You can filter them by name.</div>,
    disableBeacon: true
  }
]

function getTutorialSteps(location, tutorial) {
  switch (location) {
    case '/myteam':
      return myRoster

    case '/contracts':
      return contracts

    case '/extension':
      return extensions

    case '/home':
      if (tutorial && !tutorial.hasViewed) {
        return homehasNotViewed
      } else {
        return homehasViewed
      }

    case '/playerfinder':
      return playerFinder

    default:
      return []
  }
}
export default getTutorialSteps
