import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    }

    getInitialState() {
       return {
         city: '',
         units: 'metric',
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
          .then((response) => {
              console.log(response);
          });
    }
    // this.state = {
    //   name: '',
    //   greeting: ''
    // };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({ name: event.target.value });
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <TextField label="City" margin="normal" variant="outlined"
                value={this.state.city}
                onChange={this.updateCity.bind(this)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.getForecast.call(this)
                  }
                }}
                />

          </header>
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
