import React, { Component } from 'react';
import imageLoading from '../images/loading.jpg';

class Loading extends Component {
    render() {
        return (
            <div className='containerLoading'>
                <img
                    src={imageLoading}
                    alt="Loading page..."
                />
            </div>
        );
    };
};

export default Loading;