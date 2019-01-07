import React, { Component } from 'react';
import Card from './Card.js';
import NoFilms from '../images/nofilm.jpg';
import PropTypes from 'prop-types';

class Collection extends Component {
    
    render() {
        const { filmList, searchValue} = this.props;
        return filmList.length !== 0
        ?  <div className="container__film">  
                <ul className="row list__names">{
                        filmList.map((film) =>{
                            return( 
                        <li className="col-lg-4 col-sm-6 col-xs-12 list__film" key={film.imdbID}>
                                    <Card film={film} />
                                </li>
                            );
                        })
                }
                </ul>
            </div>
        : <NoFilms searchValue = {searchValue}/> 
    };
}
Collection.propTypes = {
    filmList: PropTypes.func,
};

export default Collection;