import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

export default class forgot extends Component {
    handlerSubmit =e =>{
        e.preventDefault();
        const data ={
            email: this.email
        };
        axios.post('forgot',data).then(
            res =>{
                console.log(res)
            }
        ).catch(
            err => {console.log(err);
            })
    };
 
    render() {
   
     
        return (
          <form onSubmit={this.handlerSubmit}>
           <div className="content"></div>
           <div className="col-sm-6"></div>
        <h5 style={{ color: '#FFFFFF' }}>Mot de passe oublié ?</h5>
            <div className="header"></div>
            <div className="content">
              
              <div className="form">
                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <input type="text" name="email" placeholder="Email" onChange={e =>this.email=e.target.value}/>
                </div>
                
              </div>
              <button type="submit" className="btn" style={{ color: '#FFFFFF' }}>
                    Envoyer
              </button>
             
            </div>
         
         
          </form>
        );
     };
}
