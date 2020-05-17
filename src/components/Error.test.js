import React from 'react';
import Error from './Error';
import renderer from 'react-test-renderer';

test('Snapshot of Error component', () => {
    const component = renderer.create(
        <Error message={'This is a test'} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
