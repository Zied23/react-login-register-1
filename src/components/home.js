import axios from 'axios'
import React, { Component } from 'react'

export default class Home extends Component {
    state ={};
     componentDidMount(){
         const config ={
             headers: {
                 Authorization: 'Bearer' + localStorage.getItem('token')
              
             }
            
         };
         console.log(config);
        axios.get('user', config).then(
            res =>{
                this.setState({
                    user: res.data
                    
                });
                console.log(res.data)
            },
            err =>{
                console.log(err)
            }
        )
     }
    render() {
if(this.state.data){
    return(
        <h2>logged {this.state.user.displayName}</h2>
    )
}
        return (
            <div>
                <h1>Not logged</h1>
            </div>
        )
    }
}
