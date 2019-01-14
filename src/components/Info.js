import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlayFilm from '../images/playfilm.jpg';
import Loading from "./Loading";

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filmId: this.props.match.params.imdbID,
            filmInfo: {}
        } ;
    };
   
    componentDidMount() { 
        let id = this.props.match.params.imdbID;
        const URL = 'https://www.omdbapi.com/?apikey=f12ba140&i=';
        fetch(`${URL}${id}`)
        .then(response => response.json())
        .then(json => {
            this.setState({
                filmInfo:json
            });
        });
    };
    
    render (){
        return(this.state.filmInfo.Title !== undefined
        ?  <div className="container__data">
                <div className="container__data--card d-flex flex-column">
                    <h3 className="card-title">{this.state.filmInfo.Title} ({this.state.filmInfo.Year})</h3>
                    <div className="d-flex flex-column flex-md-row">
                        <div className="p-2">
                                { this.state.filmInfo.Poster === 'N/A' 
                                    ? <img className='card-img-top image mx-auto d-block' src='https://via.placeholder.com/210x295/cccccc/666666/?text=TV' alt={this.state.filmInfo.Title}/>
                                    : <img className='card-img-top image mx-auto d-block' src={this.state.filmInfo.Poster} alt={this.state.filmInfo.Title}/>
                                }
                            <h6 className="font-weight-bold text-center pt-2">✪ Rating: {this.state.filmInfo.imdbRating}</h6>
                        </div>
                        <div className="p-2">
                            <ul className="d-flex flex-column">
                                <li className="d-flex justify-content">
                                    <h5 className="mr-2">Director: </h5>
                                    <p className="font-italic"> {this.state.filmInfo.Director}</p>
                                </li>
                                <li className="d-flex justify-content">
                                    <h5 className="mr-2">Actors: </h5>
                                    <p className="font-italic"> {this.state.filmInfo.Actors}</p>
                                </li >
                                <li className="d-flex justify-content">
                                    <h5 className="mr-2">Duration: </h5>
                                    <p className="font-italic"> {this.state.filmInfo.Runtime}</p>
                                </li >
                                <li className="d-flex justify-content">
                                    <h5 className="mr-2">Language: </h5>
                                    <p className="font-italic"> {this.state.filmInfo.Language}</p>
                                </li>
                                <li className="d-flex justify-content">
                                    <h5 className="mr-2">Genre: </h5>
                                    <p className="font-italic"> {this.state.filmInfo.Genre}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body card__plot">
                        <h2 className="card-subtitle pb-2">Plot</h2>
                        <p className="card-text text-justify">{this.state.filmInfo.Plot}</p>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        <Link
                            to={'/'}>
                            <button className="btn btn-dark">Back to films</button>
                        </Link>
                        <a title={this.state.filmInfo.Title} href={this.state.filmInfo.Website} about="_blank" alt= "Watch movie"><img className="icon__film" src={PlayFilm} alt="Watch video" /></a>
                    </div>
                </div> 
            </div>
        :  <Loading/> 
        )
    };
}

export default Info;