import React from "react";
import loginImg from "../../login.PNG";
import "./style.scss";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";




export class Login extends React.Component {


  state = {}

  handlerSubmit = e => {
    e.preventDefault();
    const data = {
      //username: this.username,
      email: this.email,
      password: this.password
    }

    axios.post("Account/login", data).then(
      res => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('UserID', res.data.userID);
          this.setState({
            isLogged: true
          });

          this.props.setUser(res.data);



          console.log(res.data);
        }

      })
      .catch(
        err => {
          // this.setState({
          //   message: err.response.data.message
          // })
          console.log(err);
        })
  };

  render() {


    if (this.state.isLogged) {



      return <Redirect from="*" to="/Home" />;


    } else {

    }
    let error = '';
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      )
    }
    return (
      <form onSubmit={this.handlerSubmit}>

        <div className="container">

<div className="col-sm-8" >

          <div className="image">
            <img  className="image" src={loginImg} />
          </div>
          <hr />

          <h6 style={{ color: '#FFFFFF' }}>Pour continuer, connectez-vous à Listy.</h6>


          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label" style={{ color: '#FFFFFF' }}>Adresse email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" name="email" placeholder="Adresse email" id="inputEmail3" onChange={e => this.email = e.target.value} />
            </div>
          </div>



          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label" style={{ color: '#FFFFFF' }}>Mot de passe</label>
            <div class="col-sm-10">
              <input type="password" name="password" placeholder="Mot de passe" class="form-control" id="inputPassword3" onChange={e => this.password = e.target.value} />
            </div>
          </div>
          <p className="forgot-password text-right">
            <Link to={'/forgot'} style={{ color: '#FFFFFF' }}>Mot de passe obliée?</Link>
          </p>
          </div>
          <button type="submit" class="btn btn-warning">Connexion</button>

          <hr />
          <h6 style={{ color: '#FFFFFF' }}>Vous n'avez pas de compte ?</h6>
          <button type="submit" class="btn btn-outline-warning"><Link to={'/register'} style={{ color: '#FFFFFF' }}> Inscription</Link></button>


          <hr />



        </div>
        <h1> {error}</h1>
      </form>
    );
  };

}
