import React, { Component } from 'react';
import NoFilm from '../images/noFilm.jpg';

class NoFilms extends Component {
    render() { 
        return ( 
            <div className="noFilmsContainer">
                <img className="catchFilm" 
                src={NoFilm} 
                alt="No films to show"/>
                <h1 className="noFilmsMessage">No films to show {this.props.searchValue}...</h1>
                <h2 className="noFilmsMessage2">Catch it!</h2>
            </div>
         );
    }
}
 
export default NoFilms;