const mostPopularMake = (cars) => {
    let allMakes = {};
    let mostPopular = '';
    let minVal = 0;

    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        let make = car.make;
        if (allMakes[make] === undefined) allMakes[make] = 0;
        allMakes[make]++;
    }


    for (const make in allMakes) {
        if (Object.hasOwnProperty.call(allMakes, make)) {
            const val = allMakes[make];
            if (val >= minVal) minVal = val, mostPopular = make;
        }
    }

    return mostPopular;
}
