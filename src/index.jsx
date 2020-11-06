import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/Signup'
import TeamChoice from './components/TeamChoice'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { CssBaseline } from '@material-ui/core'
import Trade from './components/Trade'
import MyTeam from './components/MyTeam'
import Training from './components/Training'
import PlayerFinder from './components/PlayerFinder'
import Stats from './components/Stats'
import MyAppBar from './components/MyAppbar'
import Contracts from './components/Contracts'
// import BestPlayers from './components/BestPlayers'
import FreeAgent from './components/FreeAgent'
import Extensions from './components/Extensions'
import Help from './components/Help'
import Offseason from './components/offSeason/Offseason'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E59923'
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
          <Route exact path="/" component={SignUp} />
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
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
