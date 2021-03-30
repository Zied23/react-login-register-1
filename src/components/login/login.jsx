import React from "react";
import loginImg from "../../login.PNG";
import axios from "axios";
import { Redirect } from "react-router";



export class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
 
  handlerSubmit =e =>{
    e.preventDefault();
    const data ={
      //username: this.username,
      email: this.email,
      password: this.password
    }
    console.log('ok');
    axios.post("Account/login",data).then(
      res=>{
      
        console.log(res)
      }
    ).catch(
      err=>{
        console.log(err);
      }
    )
  }

  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header"></div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e =>this.email=e.target.value}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e =>this.password=e.target.value}/>
            </div>
          </div>
          <button type="submit" className="btn">
          Connexion
          </button>
        </div>
        </div>
     
      </form>
    );
  }
}
