import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
    render() {
        const {handleSearch,searchValue} = this.props;

        return (
            <div className="d-flex justify-content-center container__filter">
                <input
                    id="filmSearch"
                    type="text"
                    title="filmName"
                    onChange={handleSearch}
                    value={searchValue}
                    placeholder="Filter movie by name..."
                    className="form-control input__filter"/>
            </div>
        );
    };
};

Filters.propTypes = {
    handleSearch: PropTypes.func,
    searchValue: PropTypes.string
};

export default Filters;