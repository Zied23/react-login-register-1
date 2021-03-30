import React from 'react'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home'
import Nav from './components/Nav';
import { BrowserRouter, Switch,Route } from 'react-router-dom';

import Auth from './components/login/Auth';
export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
   <Nav/>
      <div className="auth-warapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Auth" component={Auth}/>
          </Switch>
        
        </div>
      </div>
    </div>
    </BrowserRouter>
  )
}
