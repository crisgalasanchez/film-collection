import React, { Component } from 'react';
import NoFilm from '../images/nofilm.jpg';

class NoFilms extends Component {
    render() { 
        return ( 
            <div className="card bg-dark text-white m-5">
                <img className="card-img rounded"
                    src={NoFilm} 
                    alt="No films to show"/>
                <div>    
                    <h3 className="card-title text-center">No films to show...</h3>
                </div>
            </div>
         );
    }
}
 
export default NoFilms;