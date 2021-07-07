import axios from "axios";
import React from "react";
import { Redirect } from "react-router";
import loginImg from "../../login.PNG";
 
export class Register extends React.Component {
  state= {}
  handlerSubmit =e =>{
    e.preventDefault();
    const data ={
      displayName:this.displayName,
      email: this.email,
      password: this.password,
      username: this.username,
    }
    
    axios.post("Account/Register",data).then(
      res=>{
        if(res.status=200){
          this.setState({succes:true})
        }
        console.log(res)
      }
    ).catch(
      err=>{
        console.log(err);
      }
    )
  }

  render() {
    if(this.state.succes){
    
     
     
      return <Redirect from="*"   to="/login" />;
     
    
    }else{
      
    }
    let error ='';
    if(this.state.message){
      error =(
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      )}
    return (
      <>
      <form onSubmit={this.handlerSubmit}>
        <div className="image">
              <img src={loginImg} />
            </div>
            <hr/>
        <div className="base-container">
        
          <div className="content">
            <div className="col-sm-6">
            <h6 style={{ color: '#FFFFFF' }}>Inscrivez-vous gratuitement pour commencer à écouter.</h6>
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

            
            
         
          
          <hr/>
          <button type="submit" className="btn btn-warning">
            S'inscrire
           
          </button>
          </div>
          </div>
        </div>
       
      </form>
      
      </>
    );
  }
}
