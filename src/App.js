import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Container, Row, Col} from 'react-bootstrap';

import Map from './components/Map'
import Forecast from './components/Forecast'
import Error from './components/Error'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.loadCitiesMatchingPrefix('sea');
    }

    getInitialState() {
        return {
            cityInput: '',
            selectedUnitsIndex: 0,

            location: {},
            forecast: null,
            error: null,
            awaitingResponse: false,

            cities: [], // Loaded from backend at page load
            units: [
                {desc: 'fahrenheit', symbol: 'F', key: 'imperial'},
                {desc: 'celsius', symbol: 'C', key: 'metric'},
                {desc: 'kelvin', symbol: 'K', key: 'kelvin'},
            ],
       }
     }

     updateCity(value) {
         console.log('value', value);
         this.setState({
             cityInput: value,
         }, () => {
             if (this.state.cityInput.length === 3)
                this.loadCitiesMatchingPrefix(this.state.cityInput);
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
        this.setState(
            {
                location: {},
                forecast: null,
                error: null,
                awaitingResponse: true,
            },
            () => {
                console.log('Requesting forecast for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                fetch(`/forecast?city=${this.state.cityInput}&units=${this.getSelectedUnits().key}`)
                    .then(resp => {
                        this.setState({awaitingResponse: false});
                        if (!resp.ok) throw resp;
                        return resp;
                    })
                    .then(response => response.json())
                    .then((response) => {
                        console.log('Forecast received for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                        this.setState({
                            forecast: response.forecast,
                            location: response.location,
                        });
                    })
                    .catch((resp) => {
                        console.log('Error receiving forecast for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                        if (resp.json)
                            resp.json().then((err) => {
                                this.setState({error: err});
                            });
                        else this.setState({error: {message: 'unknown error'}});
                    });
                });
    }

    loadCitiesMatchingPrefix(prefix) {
        fetch(`/cities?prefix=${prefix}`)
            .then(response => response.json())
            .then((cities) => {
                console.log('got cities', cities.length, cities[0]);
                this.setState({cities: cities});
            })
            .catch();
    }

    getSelectedUnits() {
        return this.state.units[this.state.selectedUnitsIndex];
    }
    render() {
        return (
            <div className="App">
                <Container>
                    <Card>
                        <CardContent>
                            <Row>

                                <Col md={6}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        onChange={(evt, val) => {
                                            this.updateCity(val);
                                            this.getForecast();
                                        }}
                                        options={this.state.cities.slice(0, 10000).map((c) => `${c.name}${c.state && `, ${c.state}`}, ${c.country}`)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="City" margin="normal" variant="outlined"
                                                value={this.cityInput}
                                                onChange={(evt) => this.updateCity.call(this, evt.target.value)}
                                                onKeyPress={event => {
                                                  if (event.key === 'Enter') {
                                                    this.getForecast.call(this)
                                                  }
                                                }}/>
                                            )}
                                          />

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
                                                {
                                                    this.state.awaitingResponse ?
                                                    <h6>Requesting data...</h6>
                                                    :
                                                    this.state.error != null ?
                                                    <Error message={this.state.error.message} /> :
                                                    <Forecast forecast={this.state.forecast} unitsSymbol={this.getSelectedUnits().symbol}></Forecast>
                                                }
                                            </CardContent>
                                        </Card>
                                    </Row>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <CardContent>
                                            <Map style={{margin: 'auto'}} city={this.state.location.city} coordinates={this.state.location.coordinates}></Map>
                                            {
                                                this.state.location.city &&
                                                <h3> {this.state.location.city}, {this.state.location.country} </h3>
                                            }
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Container>
            </div>
      );
  }
}

export default App;
