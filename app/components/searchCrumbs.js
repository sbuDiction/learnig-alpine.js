document.addEventListener('alpine:init', () => {
    Alpine.data('searchCrumbs', () => ({
        isActive: false,
        crumbs: {},

        handleSearchCrumbs(crumb) {
            if (this.crumbs['search'] === undefined)
                this.crumbs['search'] = crumb;
        }

    }))
})