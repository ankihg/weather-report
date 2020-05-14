import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Forecast extends React.Component {
    render() {
        return (
            <Container>
                {JSON.stringify(this.props.forecast, null, 4)}
            </Container>
        );
    }

}
