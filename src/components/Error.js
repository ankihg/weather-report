import React from 'react';

export default class Map extends React.Component {
    render() {
        return (
            <span>
                <h2>{this.props.message}</h2>
                <h6>Please try again</h6>
            </span>
        );
    }
}
