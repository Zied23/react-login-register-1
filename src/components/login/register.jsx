import axios from "axios";
import React from "react";
import loginImg from "../../login.PNG";
 
export class Register extends React.Component {
 
  handlerSubmit =e =>{
    e.preventDefault();
    const data ={
      displayName:this.displayName,
      email: this.email,
      password: this.password,
      username: this.username,
    }
    console.log(data);
    axios.post("Account/Register",data).then(
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
        <div className="base-container">
          <div className="header"></div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form" >
            <div className="form-group">
                <label htmlFor="displayName">DisplayName</label>
                <input type="text" name="displayName" placeholder="displayName"  onChange={e =>this.displayName=e.target.value}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email"  onChange={e => this.email=e.target.value}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password"  onChange={e => this.password=e.target.value}/>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username"  onChange={e =>this.username=e.target.value}/>
              </div>
            </div>

            
            <button type="submit" className="btn">
            S'inscrire
          </button>
          </div>
        </div>
      </form>
    );
  }
}
