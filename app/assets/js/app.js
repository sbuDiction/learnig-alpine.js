document.addEventListener('alpine:init', () => {
    Alpine.data('cars', () => ({
        filteredList: [],
        filterMsg: "",
        showMgs: false,
        townInputVal: 'All',
        modelInputVal: 'All',
        colorInputVal: 'All',
        makeInputVal: 'All',
        towFilter: {
            Paarl: "CJ", Bellville: "CY", Stellenbosch: "CL", Malmesbury: "CK", "Cape Town": "CA", Kuilsriver: "CF"
        },

        init() {
            fetch('./cars.json')
                .then(response => response.json())
                .then(cars => {
                    this.filteredList = cars;
                });
        },

        filter() {
            fetch('./cars.json')
                .then(response => response.json())
                .then(cars => {
                    const filterByAll = this.townInputVal !== 'All' && this.modelInputVal !== 'All' && this.colorInputVal !== 'All' && this.makeInputVal !== 'All';
                    const filteredList = cars.filter(car => {
                        if (filterByAll) return car.town === this.townInputVal && car.model === this.modelInputVal && car.color === this.colorInputVal && car.make === this.makeInputVal;
                        else if (this.townInputVal !== 'All' && this.modelInputVal !== 'All') return car.town === this.townInputVal && car.model === this.modelInputVal;
                        else if (this.makeInputVal !== 'All' && this.townInputVal !== 'All') return car.make === this.makeInputVal && car.town === this.townInputVal;
                        else if (this.townInputVal !== 'All') return car.town === this.townInputVal;
                        else if (this.modelInputVal !== 'All') return car.model === this.modelInputVal;
                        else if (this.colorInputVal !== 'All') return car.color === this.colorInputVal;
                        else if (this.makeInputVal !== 'All') return car.make === this.makeInputVal;
                        else return true;
                    });

                    this.filteredList = filteredList;
                });

        },

        mostPopularMake() {
            const checkBox = document.getElementById('inlineRadio1');
            if (checkBox.checked) {
                const fIlterInstance = Filter();
                fetch('./cars.json')
                    .then(response => response.json())
                    .then(cars => {
                        const mostPopular = fIlterInstance.mostPopular(cars);
                        const filteredList = this.filteredList.filter(car => {
                            return car.make === mostPopular;
                        });
                        this.filterMsg = filteredList.length > 0 ? `${mostPopular}` : ` Not Found`;
                        this.filteredList = filteredList;
                        this.showMgs = true;
                        setTimeout(() => {
                            this.showMgs = false;
                        }, 5000);
                    });

            } else {
                fetch('./cars.json')
                    .then(response => response.json())
                    .then(cars => {
                        this.filteredList = cars;
                    });
            }
        },
    }))
})