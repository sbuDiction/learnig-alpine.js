document.addEventListener('alpine:init', () => {
    Alpine.data('cars', () => ({
        filteredList: [],
        availabilityCounter: 0,
        filterMsg: "",
        isLoading: false,
        isShow: false,
        showMgs: false,
        townInputVal: 'All',
        modelInputVal: 'All',
        colorInputVal: 'All',
        makeInputVal: 'All',
        pagination: Pagination(),
        paging: 0,
        currentPage: 0,
        towFilter: {
            Paarl: "CJ", Bellville: "CY", Stellenbosch: "CL", Malmesbury: "CK", "Cape Town": "CA", Kuilsriver: "CF"
        },
        isActive: false,
        crumbs: {},

        init() {
            fetch('./cars.json')
                .then(response => response.json())
                .then(cars => {
                    this.isLoading = true;
                    this.filterMsg = 'Please wait while we fecth some data...';
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isShow = true;
                        this.availabilityCounter = cars.length;
                        this.paging = Math.round(cars.length / 5);
                        this.filteredList = this.pagination.paginate(cars, 5, 1);
                    }, 1000);

                });
        },

        filter() {
            fetch('./cars.json')
                .then(response => response.json())
                .then(cars => {
                    this.isShow = false;
                    this.isLoading = true;
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

                    setTimeout(() => {
                        this.isLoading = false;
                        this.isShow = true;
                        this.availabilityCounter = filteredList.length;
                        this.filterMsg = 'The filtered results were not found';
                        this.paging = Math.round(filteredList.length / 5);
                        this.filteredList = this.pagination.paginate(filteredList, 5, 1);
                    }, 100);

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

        handlePagination(e) {
            e.preventDefault();
            const pageNumber = e.target.value;
            fetch('./cars.json')
                .then(response => response.json())
                .then(carsList => {
                    this.isLoading = true;
                    this.isShow = false;
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isShow = true;
                        this.filteredList = this.pagination.paginate(carsList, 5, pageNumber);
                    }, 100);
                });
        },


        handleSearchCrumbs(crumb) {
            if (this.crumbs['search'] === undefined)
                this.crumbs['search'] = crumb;
        }
    }))
})