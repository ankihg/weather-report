import React from 'react';
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
import Suggestions from './components/Suggestions'

import Logger from './utils/Logger'
const logger = new Logger();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.loadCitiesMatchingPrefix('aba');
    }

    getInitialState() {
        return {
            cityInput: '',
            selectedUnitsIndex: 0,

            location: {},
            forecast: null,
            error: null,
            awaitingResponse: false,

            cityMatches: [], // Loaded from backend at page load and input change
            suggestedCities: [ // Modified at forecast fetch to add recently searched cities
                'Seattle, WA, US',
                'Tokyo, JP',
                'Cape Town, ZA',
            ],
            units: [
                {desc: 'fahrenheit', tempSymbol: 'F', speedSymbol: 'miles/hour', key: 'imperial'},
                {desc: 'celsius', tempSymbol: 'C', speedSymbol: 'meters/sec', key: 'metric'},
                {desc: 'kelvin', tempSymbol: 'K', speedSymbol: 'meters/sec', key: 'kelvin'},
            ],
       }
     }

     clearResultState() {
         this.setState({
             location: {},
             forecast: null,
             error: null,
         });
     }

     updateCity(val, next) {
         logger.log('Update city:', val);
         this.setState({
             cityInput: val || '',
         }, () => {
             if (!this.state.cityInput) this.clearResultState();
             else if (this.state.cityInput.length === 3)
                this.loadCitiesMatchingPrefix(this.state.cityInput);
            if (next) return next();
         });
     }

     updateCityAndGetForecast(val) {
         this.updateCity(val, this.getForecast.bind(this))
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
                logger.log('Requesting forecast for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                fetch(`/forecast?city=${this.state.cityInput}&units=${this.getSelectedUnits().key}`)
                    .then(resp => {
                        this.setState({awaitingResponse: false});
                        if (!resp.ok) throw resp;
                        return resp;
                    })
                    .then(response => response.json())
                    .then((response) => {
                        logger.log('Forecast received for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                        this.setState({
                            forecast: response.forecast,
                            location: response.location,
                        });
                        this.addToSuggestedCities(this.state.cityInput);
                    })
                    .catch((resp) => {
                        logger.warn('Error receiving forecast for', this.state.cityInput, 'in', this.getSelectedUnits().key);
                        if (resp.json)
                            resp.json().then((err) => {
                                this.setState({error: err});
                            });
                        else this.setState({error: {message: 'unknown error'}});
                    });
                });
    }

    addToSuggestedCities(city) {
        for (let recentCity of this.state.suggestedCities)
            if (city === recentCity) return;

        this.state.suggestedCities.unshift(city);
        if (this.state.suggestedCities > 3)
            this.state.suggestedCities.pop();

        this.setState({suggestedCities: this.state.suggestedCities});
    }

    loadCitiesMatchingPrefix(prefix) {
        fetch(`/cities?prefix=${prefix}`)
            .then(response => response.json())
            .then((cities) => {
                console.log('got cities', cities.length, cities[0]);
                this.setState({cityMatches: cities});
            })
            .catch();
    }

    getSelectedUnits() {
        return this.state.units[this.state.selectedUnitsIndex];
    }
    render() {
        return (
            <Container className="App">
                <Card>
                    <CardContent>
                        <Row>
                            <Col md={6}>
                                <Autocomplete
                                    freeSolo
                                    onChange={(evt, val) => { this.updateCityAndGetForecast.call(this, val) }}
                                    options={this.state.cityMatches.slice(0, 10000).map((c) => `${c.name}${c.state && `, ${c.state}`}, ${c.country}`)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="City" margin="normal" variant="outlined"
                                            value={this.state.cityInput}
                                            placeholder={'St. Louis, MO, US'}
                                            onChange={(evt) => this.updateCity.call(this, evt.target.value)}
                                            onKeyPress={evt => { evt.key === 'Enter' && this.getForecast.call(this) }}/>
                                        )}
                                      />

                                      <Row>
                                          <ButtonGroup style={{marginTop: '25px', margin: 'auto'}} color="primary" aria-label="outlined primary button group">
                                              {this.state.units.map((unit, i) => (
                                                  <Button
                                                          key={i}
                                                          onClick={this.updateUnits.bind(this, i)}
                                                          variant={i === this.state.selectedUnitsIndex ? "contained" : ""}>
                                                      { unit.desc }
                                                  </Button>))}
                                          </ButtonGroup>
                                      </Row>
                                <Row>
                                    <Card style={{width: '98%', height: '140px', margin: 'auto', marginTop: '10px'}}>
                                        <CardContent>
                                            {
                                                this.state.awaitingResponse ?
                                                <h6>Requesting data...</h6>
                                                :
                                                this.state.error != null ?
                                                <Error message={this.state.error.message} />
                                                :
                                                this.state.forecast ?
                                                <Forecast forecast={this.state.forecast} tempSymbol={this.getSelectedUnits().tempSymbol} speedSymbol={this.getSelectedUnits().speedSymbol}/>
                                                :
                                                <h3>Enter a city to see its forecast</h3>
                                            }
                                        </CardContent>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card style={{width: '98%', height: '180px', margin: 'auto', marginTop: '10px'}}>
                                        <CardContent>
                                            <Suggestions suggestedCities={this.state.suggestedCities} updateCityAndGetForecast={this.updateCityAndGetForecast.bind(this)} />
                                        </CardContent>
                                    </Card>
                                </Row>
                            </Col>

                            <Col md={6}>
                                <Card style={{height: '456px'}}>
                                    <CardContent>
                                        <Map style={{margin: 'auto'}} city={this.state.location.city} coordinates={this.state.location.coordinates}></Map>
                                        {
                                            this.state.location.city &&
                                            <h5> {this.state.location.city}, {this.state.location.country} </h5>
                                        }
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
            </Container>
      );
  }
}

export default App;
