import React from 'react';
import Map from './Map';
import renderer from 'react-test-renderer';

test('Snapshot of Map component', () => {
    const component = renderer.create(
        <Map city={'Seattle'} coordinates={[-122.33, 47.61]} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
