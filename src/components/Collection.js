import React, { Component } from 'react';
import Card from './Card.js';
import NoFilms from '../images/nofilm.jpg';
import PropTypes from 'prop-types';

class Collection extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            favoriteHandler : this.props.favoriteHandler,
            favoriteList : this.props.favoriteList
        };
    };
    render() {
        const { filmList, searchValue, logged} = this.props;
        return filmList.length !== 0
        ?  <div className="container container__film">  
                <ul className="row list__names">{
                        filmList.map((film) =>{
                            return( 
                                <li className="col-xl-3 card list__film" key={film.imdbID}>
                                    <Card 
                                        film={film} 
                                        favoriteHandler={this.state.favoriteHandler}
                                        favoriteList={this.state.favoriteList}
                                        logged={logged}
                                    />
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