document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', () => ({
        data: [],
        townDropDown: {},
        modelDropDown: {},
        colorDropDown: {},
        makeDropDown: {},


        init() {
            fetch('./cars.json')
                .then(response => response.json())
                .then(cars => {
                    this.data = cars;
                    this.buildDropDown();
                });

        },


        buildDropDown() {
            let townDropDown = {};
            let modelDropDown = {};
            let colorDropDown = {};
            let makeDropDown = {};

            this.data.forEach(item => {
                townDropDown[item.town] = item.town;
                modelDropDown[item.model] = item.model;
                colorDropDown[item.color] = item.color;
                makeDropDown[item.make] = item.make;
            });

            this.townDropDown = townDropDown;
            this.modelDropDown = modelDropDown;
            this.colorDropDown = colorDropDown;
            this.makeDropDown = makeDropDown;
        }

    }))
})