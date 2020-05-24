import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Forecast extends React.Component {
    render() {
        return (
            <Container>
                {
                    this.props.forecast &&
                    <Row>
                        <Col md={6}>
                            <h2>{this.props.forecast && this.props.forecast.desc}</h2>
                        </Col>

                        <Col md={6}>
                            <h3><Temp temp={this.props.forecast.temp.now} unitsSymbol={this.props.unitsSymbol}/></h3>
                            <h4><Temp temp={this.props.forecast.temp.min} unitsSymbol={this.props.unitsSymbol}/> - <Temp temp={this.props.forecast.temp.max} unitsSymbol={this.props.unitsSymbol}/></h4>
                        </Col>
                    </Row>
                }
                </Container>
        );
    }
}

class Temp extends React.Component {
    render() {
        return (<span>{this.props.temp}º{this.props.unitsSymbol}</span>);
    }
}
