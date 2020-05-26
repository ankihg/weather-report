# Weather Report

## About
A simple full-stack app powered by a Node/Express backend and React frontend that displays weather forecasts retrieved from [Open Weather Map](https://openweathermap.org/).


## Run locally
First create a `.env` file at the root of the project defining an API key named `owmApiKey` from [Open Weather Map](https://openweathermap.org/)
```
owmApiKey=abc123
```

Make sure you `npm install`, then to serve the project locally run `npm run dev` and visit `localhost:3000`

The project will use ports `3000` and `3001`

## Test
Make sure you have [Jest](https://jestjs.io/) installed globally by running `npm install -g jest`

Then run `npm test` to run both backend and frontend tests

## Production considerations
The following improvements are necessary for the project to be production worthy:
- Healthchecks for OpenWeatherMap to know if they are experiencing an outage and report to user
- Provide accessibility support by following the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (a11y)
- Associate an id with server requests for more coherent logging

## Future improvements
- Refresh forecast periodically to provide up-to-date data to users
- Improve location input by allowing users to input coordinates or zip code
- Optimize layout to react to mobile devices (Currently usable but not ideal)
- Write units selection and city suggestions to local storage to load at future visits
- Infrastructure in place for text localization process (i18n)

## References
- Weather and city data is provided by [Open Weather Map](https://openweathermap.org/)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Favicon sourced from iconfinder.com - https://www.iconfinder.com/icons/89137/earth_icon
