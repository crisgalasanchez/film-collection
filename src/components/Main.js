import React, { Component } from 'react';
import Header from './Header';
import Filters from './Filters';
import Collection from './Collection';
import Footer from './Footer';
import PropTypes from 'prop-types';

class Main extends Component {
    render() { 
        const {
            handleSearch,
            filmList, 
            searchValue,
        } = this.props;
        
        return ( 
            <div className="App">
                <Header/>
                    <h1 className='appTitle'>Film Searcher</h1>
                <Filters 
                    handleSearch={handleSearch} 
                    searchValue = {searchValue}/>
                <Collection 
                    filmList={filmList}
                    searchValue = {searchValue}/>
                <Footer/>
            </div>
         );
    };
};
 
Main.propTypes = {
    handleSearch: PropTypes.func,
    filmList: PropTypes.func,
    searchValue: PropTypes.string
};

export default Main;