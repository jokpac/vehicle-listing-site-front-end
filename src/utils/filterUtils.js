export const filterListings = (listings, filters) => {
    let filteredData = [...listings];

    if (filters.priceMin) filteredData = filteredData.filter(listing => listing.price >= filters.priceMin);
    if (filters.priceMax) filteredData = filteredData.filter(listing => listing.price <= filters.priceMax);
    if (filters.yearMin) filteredData = filteredData.filter(listing => listing.year >= filters.yearMin);
    if (filters.yearMax) filteredData = filteredData.filter(listing => listing.year <= filters.yearMax);
    if (filters.mileageMin) filteredData = filteredData.filter(listing => listing.mileage >= filters.mileageMin);
    if (filters.mileageMax) filteredData = filteredData.filter(listing => listing.mileage <= filters.mileageMax);
    if (filters.engineSizeMin) filteredData = filteredData.filter(listing => listing.engineSize >= filters.engineSizeMin);
    if (filters.engineSizeMax) filteredData = filteredData.filter(listing => listing.engineSize <= filters.engineSizeMax);
    if (filters.fuelType) filteredData = filteredData.filter(listing => listing.fuelType === filters.fuelType);
    if (filters.transmission) filteredData = filteredData.filter(listing => listing.transmission === filters.transmission);
    if (filters.drivenWheels) filteredData = filteredData.filter(listing => listing.drivenWheels === filters.drivenWheels);
    if (filters.country) filteredData = filteredData.filter(listing => listing.country.id === filters.country);
    if (filters.city) filteredData = filteredData.filter(listing => listing.city.id === filters.city);
    if (filters.make) filteredData = filteredData.filter(listing => listing.make.id === filters.make);
    if (filters.model) filteredData = filteredData.filter(listing => listing.model.id === filters.model);
    if (filters.listingType) filteredData = filteredData.filter(listing => listing.listingType === filters.listingType);

    return filteredData;
};