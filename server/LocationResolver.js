module.exports = class LocationResolver {
    constructor(cityList) {
        this.cityHash = this.hashCityListByName(cityList);
    }
    hashCityListByName(cityList, prefixLength=3) {
        return cityList.reduce((acc, city) => {
            if (!city.name) return acc;
            const fullName = `${city.name}${city.state && `, ${city.state}`}, ${city.country}`;
            const key = this.prepKey(fullName.substring(0, prefixLength));
            acc[key] = acc[key] || [];
            acc[key].push(city);
            return acc;
        });
    }
    resolve(prefix) {
        if (!prefix) return [];
        return this.cityHash[this.prepKey(prefix)] || [];
    }
    prepKey(str) {
        return str.toLowerCase();
    }
}
