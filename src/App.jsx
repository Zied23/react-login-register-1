import React ,{Component}from 'react'
import "./App.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home'
import Nav from './components/Nav';
import { BrowserRouter, Switch,Route } from 'react-router-dom';


import axios from 'axios';
import forgot from './components/login/forgot';
import reset from './components/login/reset';
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage';
import { Login, Register } from './components/login';
import Profile from './components/Profile/Profile';
import UserToSee from './components/Profile/UserToSee';
import NewPlaylist from './components/views/LandingPage/NewPlaylist';
import MyList from './components/views/LandingPage/MyList';



export default class App extends Component  {
 
  state={};
    componentDidMount = () => {
        axios.get('Account/user').then(
            res => {
                this.setUser(res.data)
                //console.log(res)
            },
            err=>{
                console.log(err)
            }
        )
    };
    setUser = user => {
      this.setState({
        user: user
        
    });

    };
  render(){
  return (
    <BrowserRouter>
    <div className="App">
   <Nav user={this.state.user} setUser= {this.setUser}/>
      <div className="auth-warapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/Home" component={() => <Home user={this.state.user} />}/>
            <Route exact path="/Login" component={() => <Login setUser={this.setUser}/>}/>
            <Route exact path="/forgot" component={forgot}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/reset/:id" component={reset}/>
            <Route exact path="/video/upload" component={ () => <UploadVideoPage user={this.state.user} />}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/NewPlaylist" component={NewPlaylist}/>
            <Route exact path="/UserToSee/:userId" component={UserToSee}/>
            <Route exact path="/MyList/:listID" component={MyList}/>
            
          </Switch>
        
        </div>
      </div>
    </div>
    </BrowserRouter>
  )
};
}
