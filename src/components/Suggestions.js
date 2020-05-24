import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Forecast extends React.Component {
    render() {
        return (
            <Container>
                <List component="nav" aria-label="secondary mailbox folders" style={{overflowY: 'scroll'}}>
                    {this.props.suggestedCities.map((city, i) => (
                        <ListItem button key={i} onClick={() => { this.props.updateCityAndGetForecast(city) }}>
                            <ListItemText primary={city} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }
}
