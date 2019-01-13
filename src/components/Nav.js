import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() { 
        return ( 
            sessionStorage.getItem('userLogged') !== null
            ?
            <div className="d-flex justify-content-center main">
                <Link
                    className="link__landing"
                    to={'/'}>
                    <button type="button" className="btn btn-outline-dark text-white font-weight-bold">All movies</button>
                </Link>
                <Link
                    className="link__landing"
                    to={'/favorite'}>
                    <button type="button" className="btn btn-outline-dark text-white font-weight-bold">My favorites</button>
                </Link>
            </div>
            :
            <div className="d-flex justify-content-center main">
                <Link
                    className="link__landing"
                    to={'/'}>
                    <button type="button" className="btn btn-outline-dark text-white font-weight-bold">All movies</button>
                </Link>
            </div>
         );
    }
}
 
export default Nav;