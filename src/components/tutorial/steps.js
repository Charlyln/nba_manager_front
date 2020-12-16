export const myRoster = [
  {
    target: '.tutoMyRoster1',
    content:
      'Your line-up is your players who play games. Put the best you have in it.',
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster2',
    content: ` Your bench is the players who doens't play games, you can find young players in development for exemple, waiting for them to improve or other players in case you lose a player.`,
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster3',
    content:
      'You can put on bench a player with it. Try it ! (we put it back after) !',
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster4',
    content: 'And this one is to put a player in line-up, you can put it back!',
    disableBeacon: true
  },
  {
    target: '.tutoMyRoster5',
    content: `You have a quick feedback on the player progress. If the player progress, you see the green arrow. If he regress, you have the red arrow. Otherwise, if he stay at his level, no arrow.`,
    disableBeacon: true
  }
]

export const contracts = [
  {
    target: '.tutoContracts1',
    content:
      'It is the amount of money that your team spend on players salaries for actual season. In NBA, (and in other sports) we called salary cap the limit of this amount. And here, it is 100 millions($).',
    disableBeacon: true
  },
  {
    target: '.tutoContracts2',
    content:
      'It is the season in progress, and you have a visual for the next 3 years',
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
    content: 'You can also fire a player here to release money.',
    disableBeacon: true
  }
]
export const extensions = [
  {
    target: '.tutoExtensions1',
    content: `Here you find the players you can resign. You can do that for a player who has only 1 year left on his contract. (if you don't have any, come back later)`,
    disableBeacon: true
  },
  {
    target: '.tutoExtensions2',
    content: 'Click to see how we resign a player.',
    disableBeacon: true
  },
  {
    target: '.tutoExtensions3',
    content: 'Select the salary you want to give to the player.',
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
    content: 'Click to propose the contract if you want to try.',
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
