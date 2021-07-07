import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router';


export default class reset extends Component {
state={};

    handlerSubmit = e =>{
        e.preventDefault();

        const data={
            token: this.props.match.params.id,
            password:this.password,
            passwordconfirm: this.passwordconfirm,
        };
        // axios.post('reset',data).then(
        //     res=>{console.log(res);
            
        //     this.setState({
        //         reset:true
        //     });
        //     }).catch(
        //     err=>{
        //         console.log(err)

        //     })
    };
  
    render() {
        if(this.state.reset){
            return <Redirect to={'/login'}/>
        }

            return (
              <form onSubmit={this.handlerSubmit}>
               <h3>Reset Password</h3>
          
                    <div className="form-group">
                      <label htmlFor="password">Password................</label>
                      <input type="password" name="password" placeholder="password" onChange={e =>this.password=e.target.value}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password Confirm</label>
                      <input type="password" name="password" placeholder="password confirm" onChange={e =>this.passwordconfirm=e.target.value}/>
                    </div>
               
                  <button type="submit" className="btn">
                  Submit
                  </button>
                 
             
             
              </form>
            );
         };
}
