import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Forecast extends React.Component {
    render() {
        return (
            <Container>
                {
                    this.props.forecast &&
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h2>{this.props.forecast && this.props.forecast.desc}</h2>
                            </Col>

                            <Col md={6}>
                                <h3><Temp temp={this.props.forecast.temp.now} unitsSymbol={this.props.tempSymbol}/></h3>
                                <h5><Temp temp={this.props.forecast.temp.min} unitsSymbol={this.props.tempSymbol}/> - <Temp temp={this.props.forecast.temp.max} unitsSymbol={this.props.tempSymbol}/></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <h5>{this.props.forecast.humidity}% humidity</h5>
                            </Col>
                            <Col md={8}>
                                <h5>{this.props.forecast.windSpeed} {this.props.speedSymbol} wind speed</h5>
                            </Col>
                        </Row>
                    </Container>
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
