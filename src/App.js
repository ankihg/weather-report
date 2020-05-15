import React from 'react';
import logo from './logo.svg';
import './App.css';
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
         units: 'metric',
         location: {},
         forecast: null,
       }
     }

     updateCity(evt) {
        this.setState({
          cityInput: evt.target.value,
        });
     }

    getForecast() {
        console.log(this.state.cityInput);
        fetch(`/forecast?city=${this.state.cityInput}&units=${this.state.units}`)
          .then(response => response.json())
          .then((response) => {
              console.log(response);
              this.setState({
                forecast: response.forecast,
                location: response.location,
            });
          });
    }

  render() {
      return (
        <div className="App">
          <Container>
            <Row>
                <Col xs={6} md={4}>
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
                <Forecast forecast={this.state.forecast}></Forecast>
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
