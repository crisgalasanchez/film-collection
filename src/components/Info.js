import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlayFilm from '../images/playfilm.jpg';
// import { CSSTransitionGroup } from 'react-transition-group'

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filmId: this.props.match.params.imdbID,
            filmInfo: {}
        } ;

        this.setFilmInfo = this.setFilmInfo.bind(this);
    };
    setFilmInfo(json){
        this.setState({
            filmInfo:json
        });
    }
    componentDidMount() { 
        let id = this.props.match.params.imdbID;
        const URL = 'http://www.omdbapi.com/?apikey=f12ba140&i=';
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
        ?  <div className="filmDataContainer">
                <div className="filmCardDetail">
                    <div className="filmNameContainer">
                        <h1 className="titlefilm">{this.state.filmInfo.Title}</h1>
                    </div>
                    <div className="photoAndDataContainer">
                        <div className="photoAndTypeContainer">
                            <div className="photoContainerDetail">
                                <img src={this.state.filmInfo.Poster} alt={this.state.filmInfo.Title} />

                                {/* <CSSTransitionGroup
                                    transitionName="filmTransition"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1000}
                                    transitionLeaveTimeout={false}>
                                    ////
                                </CSSTransitionGroup> */}
                            </div>
                        </div>
                    </div>  

                    <div className="allDataContainer">
                        <h2 className="dataInfoDetail">Characteristics</h2>
                        {/* <CSSTransitionGroup
                            transitionName="filmInfoTransition"
                            transitionAppear={true}
                            transitionAppearTimeout={1500}>
                            //
                        </CSSTransitionGroup> */}
                        <ul className="listCharacteristicsDetails">
                            <li>
                                <h3 className="characteristicInfo">Year:</h3>
                                <h3 className="characteristicData">{this.state.filmInfo.Year}</h3>
                            </li>
                            <li>
                                <h3 className="characteristicInfo">Director:</h3>
                                <p className="characteristicData">{this.state.filmInfo.Director}</p>
                            </li>
                            <li>
                                <h3 className="characteristicInfo">Language:</h3>
                                <p className="characteristicData">{this.state.filmInfo.Language}</p>
                            </li>
                            <li>
                                <h3 className="characteristicInfo">Genre:</h3>
                                <p className="characteristicData">{this.state.filmInfo.Genre}</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="bigTitle">Plot</h2>
                        <p className="characteristicData">{this.state.filmInfo.Plot}</p>
                        {/* <CSSTransitionGroup
                            transitionName="filmPlotTransition"
                            transitionAppear={true}
                            transitionAppearTimeout={2500}
                        >
                            ///
                        </CSSTransitionGroup> */}
                    </div>
                    <div className="containerButtonBackDetail">
                        <Link
                            className="linkToLanding"
                            to={'/'}>
                            <button className="buttonBack">Back to films</button>
                            
                        </Link>
                        <a title={this.state.filmInfo.Title} href={this.state.filmInfo.Website} about="_blank"><img src={PlayFilm}alt="Watch tv" /></a>
                    </div>
                </div> 
            </div>
        :   <div>
                Loading
            </div>
        )
    };
}

export default Info;