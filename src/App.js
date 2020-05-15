import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// import Autocomplete from '@material-ui/lab/Autocomplete';
import {Container, Row, Col} from 'react-bootstrap';

import Map from './components/Map'
import Forecast from './components/Forecast'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            cityInput: '',
            selectedUnitsIndex: 0,
            location: {},
            forecast: null,

            units: [
                {desc: 'fahrenheit', symbol: 'F', key: 'imperial'},
                {desc: 'celsius', symbol: 'C', key: 'metric'},
                {desc: 'kelvin', symbol: 'K', key: 'kelvin'},
            ],
       }
     }

     updateCity(evt) {
         this.setState({
             cityInput: evt.target.value,
         });
     }

     updateUnits(unitsIndex) {
         console.log(this.state.units[unitsIndex]);
         const isUnitsChanged = unitsIndex !== this.state.selectedUnitsIndex;
         this.setState({selectedUnitsIndex: unitsIndex},
             () => isUnitsChanged && this.getForecast());
     }

    getForecast() {
        if (!this.state.cityInput) return;
        console.log(this.state.cityInput);
        this.setState({forecast: null},
            () => {
                fetch(`/forecast?city=${this.state.cityInput}&units=${this.getSelectedUnits().key}`)
                    .then(response => response.json())
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            forecast: response.forecast,
                            location: response.location,
                        });
                    });
                });
    }

    getSelectedUnits() {
        return this.state.units[this.state.selectedUnitsIndex];
    }
    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card>
                                <CardContent>
                                    <TextField label="City" margin="normal" variant="outlined"
                                        value={this.state.city}
                                        onChange={this.updateCity.bind(this)}
                                        onKeyPress={event => {
                                          if (event.key === 'Enter') {
                                            this.getForecast.call(this)
                                          }
                                        }}/>

                                        <ButtonGroup style={{marginTop: '25px', marginLeft: '5px'}} color="primary" aria-label="outlined primary button group">
                                            {this.state.units.map((unit, i) => (
                                                <Button
                                                    key={i}
                                                    onClick={this.updateUnits.bind(this, i)}
                                                    variant={i === this.state.selectedUnitsIndex ? "contained" : ""}>
                                                        { unit.desc }
                                                </Button>))}
                                        </ButtonGroup>
                                    <Row>
                                        <Card style={{width: '98%', height: '200px', margin: 'auto'}}>
                                            <CardContent>
                                                <Forecast forecast={this.state.forecast} unitsSymbol={this.getSelectedUnits().symbol}></Forecast>
                                            </CardContent>
                                        </Card>
                                    </Row>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <CardContent>
                                    <Map style={{margin: 'auto'}} city={this.state.location.city} coordinates={this.state.location.coordinates}></Map>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
      );
  }
}

export default App;
