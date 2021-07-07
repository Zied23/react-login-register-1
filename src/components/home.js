
import React, { Component } from 'react'
import LandingPage from './views/LandingPage/LandingPage'

import imagsss from "./../login.PNG"

import { Login } from './login';
import TendanceVideo from './views/Tendance/TendanceVideo';
import NewPlaylist from './views/LandingPage/NewPlaylist';



export default class home extends Component {

    render() {
       
        if (this.props.user) {



            return (
                <div>
                    <h1>
                    
               
                   
                    </h1>

         <hr/><hr/>

                    <div class="container">
        


                        
                        <div class="row g-0">
  <div class="col-sm-6 col-md-8">   <LandingPage /></div>
  <div class="col-6 col-md-4">  <TendanceVideo /></div>
</div>   
                    </div>
                 </div>
            )
        }
        return (
            <div>
                <Login />


               

            </div>
        )
    }
}
