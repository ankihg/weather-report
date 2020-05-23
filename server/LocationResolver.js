module.exports = class LocationResolver {
    constructor(cityList) {
        this.cityHash = this.hashCityListByName(cityList);
    }
    hashCityListByName(cityList, prefixLength=3) {
        return cityList.reduce((acc, city) => {
            const key = city.name.substring(0, prefixLength).toLowerCase();
            acc[key] = acc[key] || [];
            acc[key].push(city);
            return acc;
        });
    }
    resolve(prefix) {
        return this.cityHash[prefix.toLowerCase()] || [];
    }
}
