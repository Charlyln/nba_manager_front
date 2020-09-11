import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import App from './App'
import SignUp from './components/Signup'
import TeamChoice from './components/TeamChoice'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { CssBaseline } from '@material-ui/core'

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
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/app" component={App} />
          <Route exact path="/teamchoice" component={TeamChoice} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
