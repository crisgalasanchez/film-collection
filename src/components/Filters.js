import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
    render() {
        const {
            handleSearch,
            searchValue,
        } = this.props;

        return (
            <div>
                <label htmlFor="filmSearch" />
                <input
                    id="filmSearch"
                    type="text"
                    title="filmName"
                    onChange={handleSearch}
                    value={searchValue}
                    placeholder="Filter film by name..."
                    className="inputFilter"/>
            </div>
        );
    };
};

Filters.propTypes = {
    handleSearch: PropTypes.func,
    searchValue: PropTypes.string
};

export default Filters;