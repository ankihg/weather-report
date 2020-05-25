const LocationResolver = require('./LocationResolver');

test('get matches for prefixes', () => {
    const cityList = [
        {name: 'Ashtabula', state: 'OH', country: 'US'},
        {name: 'Ashland', state: 'OR', country: 'US'},
        {name: 'Ha', state: '', country: 'BT'},
        {name: 'St. Louis', state: 'MO', country: 'US'}
    ];

    const locationResolver = new LocationResolver(cityList);

    let results;
    results = locationResolver.resolve('ash');
    expect(results.length).toBe(2);
    expect(results[0]).toStrictEqual({name: 'Ashtabula', state: 'OH', country: 'US'});
    expect(results[1]).toStrictEqual({name: 'Ashland', state: 'OR', country: 'US'});

    results = locationResolver.resolve('Ha,');
    expect(results.length).toBe(1);
    expect(results[0]).toStrictEqual({name: 'Ha', state: '', country: 'BT'});

    results = locationResolver.resolve('st.');
    expect(results.length).toBe(1);
    expect(results[0]).toStrictEqual({name: 'St. Louis', state: 'MO', country: 'US'});

    results = locationResolver.resolve('st');
    expect(results.length).toBe(0);
});
