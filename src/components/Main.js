import React, { Component } from 'react';
import Header from './Header';
import Filters from './Filters';
import Nav from './Nav';
import PropTypes from 'prop-types';

class Main extends Component {
    render() { 
        const {
            handleSearch
        } = this.props;
        /* const {
            searchValue
        } = this.state; */
        return ( 
            <div className="">
                <Header/> 
                <div className="main">
                    <Nav/> 
                    <Filters 
                        handleSearch={handleSearch}
                        // searchValue={searchValue}
                        />
                </div>
            </div>
         );
    };
};
 
Main.propTypes = {
    handleSearch: PropTypes.func,
    searchValue: PropTypes.string
};

export default Main;