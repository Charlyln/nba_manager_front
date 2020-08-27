import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);

