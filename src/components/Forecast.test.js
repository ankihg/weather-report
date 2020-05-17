import React from 'react';
import Forecast from './Forecast';
import renderer from 'react-test-renderer';

test('Snapshot of Forecast component', () => {
    const component = renderer.create(
        <Forecast forecast={{desc: 'Cloudy forever', temp: {now: 55, min:54, max: 57}}} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
