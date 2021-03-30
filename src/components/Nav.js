import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
export default class Nav extends Component {
    render() {
        return (
            <div>
                 <nav className="navbar navbar-expand navbar-ligt fixedtop">
        <div className="container">
          {/* <a href="" className="navbar-brand">Home</a> */}
          <Link to={'/'} className="navbar-brand">Home</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                
                <Link to={'/Auth'} className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
            </div>
        )
    }
}
