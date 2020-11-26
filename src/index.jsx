import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'

import Home from './components/season/home/Home'
import SignUp from './components/signup/Signup'
import TeamChoice from './components/signup/TeamChoice'
import Trade from './components/season/trade/Trade'
import MyTeam from './components/season/myteam/MyTeam'
import Training from './components/season/training/Training'
import PlayerFinder from './components/season/playerfinder/PlayerFinder'
import Stats from './components/season/stats/Stats'
import MyAppBar from './components/MyAppbar'
import Contracts from './components/season/contracts/Contracts'
import FreeAgent from './components/season/freeagents/FreeAgent'
import Extensions from './components/season/extensions/Extensions'
import Help from './components/season/help/Help'
import Offseason from './components/offSeason/Offseason'
import Ranking from './components/season/ranking/Ranking'
import Start from './components/signup/Start'
import StatsHistory from './components/season/Stats history/StatsHistory'
import BestPlayers from './components/season/bestplayers/BestPlayers'
import Profil from './components/season/profil/Profil'
import AllTeams from './components/season/allteams/AllTeams'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FB8B3C'
    },
    secondary: {
      main: '#021EA8'
    },
    background: {
      default: '#2F2E2C'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <MyAppBar />
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/teamchoice" component={TeamChoice} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/myteam" component={MyTeam} />
          <Route exact path="/training" component={Training} />
          <Route exact path="/playerfinder" component={PlayerFinder} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/contracts" component={Contracts} />
          <Route exact path="/freeagents" component={FreeAgent} />
          <Route exact path="/extension" component={Extensions} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/offseason" component={Offseason} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/history" component={StatsHistory} />
          <Route exact path="/standings" component={BestPlayers} />
          <Route exact path="/profil" component={Profil} />
          <Route exact path="/allteams" component={AllTeams} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
