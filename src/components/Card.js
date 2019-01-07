import React, { Component, Fragment } from 'react';
import MoreInfo from '../images/moreinfo.jpg';
import Favourite from '../images/favourite.jpg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
    render() {
        const {film} = this.props;
        return (
            <Fragment>
                <div className='p-2 card container__image'>
                    <img className='card-img-top rounded image__film' src={film.Poster} alt={film.Title}/>
                    <div className=' card-body container__name'>
                        <h5 className='card-title list__name'>{film.Title}</h5>
                    </div>
                    <div className='container__link'>
                        <Link to={'/film/'+film.imdbID}><img className='icon__link' src={MoreInfo} alt="more info" /></Link>
                        <Link to={'/film/'+film.imdbID}><img className='icon__link' src={Favourite} alt="favourite" /></Link>
                        {/* <button type="button" class="btn btn-primary" value ={film.imdbID} ><Link to={'/film/'+film.imdbID}>moreInfo!</Link></button> */} 
                    </div>
                </div>
            </Fragment>
        );
    };
};

Card.propTypes = {
    film: PropTypes.object,
};

export default Card;