import React, { Component, Fragment } from 'react';
import MoreInfo from '../images/moreinfo.jpg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: this.props.logged
        };
        this.changeFavorite = this.changeFavorite.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
        this.existsPoster = this.existsPoster.bind(this);
        this.isLogged = this.isLogged.bind(this);
    }
    changeFavorite(e){
        if(e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            this.props.favoriteHandler('remove', e.target.value);
        } else {
            e.target.classList.add('active');
            this.props.favoriteHandler('add', e.target.value);
        }
    }  
    isFavorite(){
        const {film} = this.props;
        let cssClass = '';
        this.props.favoriteList.map((favorite) =>{
            if(favorite.imdbID === film.imdbID){
                cssClass = 'active';
            }
        });
        return cssClass;
    }
    existsPoster(){
        const {film} = this.props;
        if(film.Poster === 'N/A'){
            return 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        }else{
            return film.Poster;
        }
    }
    isLogged(){
        let cssClass = 'd-block';
        if(!this.props.logged){
            cssClass = 'd-none';
        }
        return cssClass;
    }
    
    render() {
        const {film} = this.props;
        let poster = this.existsPoster();
        let favoriteClass = this.isFavorite();
        let displayLogged = this.isLogged();
        return (
            <Fragment>
                <div className='p-2 container__card mx-3'>
                    <img className='card-img-top rounded image' src={poster} alt={film.Title}/>
                    <div className=' card-body'>
                        <h5 className='card-title'>{film.Title}</h5>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button value={film.imdbID} className={'action-button ' + favoriteClass + displayLogged} onClick={this.changeFavorite}>♥</button>
                        <Link to={'/film/'+film.imdbID}><img className='icon__link' src={MoreInfo} alt="more info" /></Link>
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