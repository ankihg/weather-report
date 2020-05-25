# Weather Report

## About
A simple full-stack app powered by a Node/Express backend and React frontend that displays weather forecasts retrieved from [Open Weather Map](https://openweathermap.org/)


## Run locally
First create a `.env` file at the root of the project defining an API key named `owmApiKey` from Open Weather Map
```
owmApiKey=abc123
```

Then to serve the project locally run `npm run dev` and visit `localhost:3000`

This will use ports 3000 and 3001

## Test
Make sure you have [Jest](https://jestjs.io/) installed globally by running `npm install -g jest`

Then run `npm test` to run both backend and frontend tests

## Production considerations
- Text internationalization
- Healthchecks for OpenWeatherMap

## Future improvements
- Refresh forecast periodically
- Improve of location input like allowing users to input coordinates or zip code
- Improve responsiveness for mobile devices
- Write units and city suggestions to cookies or local storage to load at future visits

## Reference
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Favicon sourced from iconfinder.com - https://www.iconfinder.com/icons/89137/earth_icon
