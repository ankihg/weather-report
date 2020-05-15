import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
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
                <Col xs={6} md={4}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {this.state.units.map((unit, i) => (
                        <Button
                            key={i}
                            onClick={this.updateUnits.bind(this, i)}
                            variant={i === this.state.selectedUnitsIndex ? "contained" : ""}>
                                { unit.desc }
                            </Button>))}
                </ButtonGroup>
                    <TextField label="City" margin="normal" variant="outlined"
                        value={this.state.city}
                        onChange={this.updateCity.bind(this)}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            this.getForecast.call(this)
                          }
                        }}
                        />
                        <Row>
                            {
                                this.state.forecast &&
                                <div>
                                    Showing forecast for:
                                    <h1>{this.state.location.city}, {this.state.location.country}</h1>
                                </div>
                            }
                        </Row>
                </Col>
                <Col xs={6} md={8}>
                    <Map city={this.state.location.city} coordinates={this.state.location.coordinates}></Map>
                </Col>
            </Row>
            <Row>
                <Forecast forecast={this.state.forecast} unitsSymbol={this.getSelectedUnits().symbol}></Forecast>
            </Row>
          </Container>

        </div>
      );
  }

}


// <Autocomplete
//     id="free-solo-demo"
//     freeSolo
//     options={['a', 'b', 'c'].map((option) => option)}
//     renderInput={(params) => (
//       <TextField {...params} label="City" margin="normal" variant="outlined" />
//     )}
//   />
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
