import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Forecast extends React.Component {
    render() {
        return (
            <Container>
                {JSON.stringify(this.props.forecast, null, 4)}
                {
                    this.props.forecast &&
                    <Row>
                        <Col md={6}>
                            <h2>{this.props.forecast && this.props.forecast.desc}</h2>
                        </Col>

                        <Col md={6}>
                            <h3>{this.props.forecast.temp.now}º</h3>
                            <h4>{this.props.forecast.temp.min}º - {this.props.forecast.temp.max}º</h4>
                        </Col>
                    </Row>
                }
                </Container>
        );
    }

}
