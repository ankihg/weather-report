import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import {Container, Row, Col} from 'react-bootstrap';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    }

    getInitialState() {
       return {
         city: '',
         units: 'metric',
         forecast: {},
       }
     }

     updateCity(evt) {
        this.setState({
          city: evt.target.value,
        });
     }

    getForecast() {
        console.log(this.state.city);
        fetch(`/forecast?city=${this.state.city}&units=${this.state.units}`)
          .then(response => response.json())
          .then((forecast) => {
              console.log(forecast);
              this.setState({ forecast })
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
                </Col>
                <Col xs={6} md={8}>
                    <ComposableMap style={{width: "600px", height: "400px"}}>
                        <Geographies geography={geoUrl}>
                          {({ geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                          }
                        </Geographies>


                        {
                            this.state.forecast.loc &&
                            <Marker key={this.state.forecast.loc.city} coordinates={this.state.forecast.loc.coordinates}>
                              <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                              <text
                                textAnchor="middle"
                                y={15}
                                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
                                {this.state.forecast.loc.city}
                              </text>
                            </Marker>
                        }

                    </ComposableMap>
                </Col>
            </Row>

          </Container>



                {JSON.stringify(this.state.forecast, null, 4)}

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
