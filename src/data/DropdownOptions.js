import axios from "./AxiosInstance";

export const fetchCountries = async () => {
  const response = await axios.get("/api/countries");
  return response.data;
};

export const fetchCities = async (countryId) => {
  const response = await axios.get(`/api/countries/${countryId}/cities`);
  return response.data;
};

export const fetchMakes = async () => {
  const response = await axios.get("/api/makes");
  return response.data;
};

export const fetchModels = async (makeId) => {
  const response = await axios.get(`/api/makes/${makeId}/models`);
  return response.data;
};

export const getDropdownOptions = ({ countries, cities, makes, models }) => {
  return {

    countries: countries.map(country => ({ value: country.id, label: country.name })),
    cities: cities.map(city => ({ value: city.id, label: city.name })),
    makes: makes.map(make => ({ value: make.id, label: make.name })),
    models: models.map(model => ({ value: model.id, label: model.name })),

    fuelTypes: [
      { value: "PETROL", label: "Petrol" },
      { value: "DIESEL", label: "Diesel" },
      { value: "ELECTRIC", label: "Electric" },
      { value: "HYBRID", label: "Hybrid" },
    ],
    transmissions: [
      { value: "MANUAL", label: "Manual" },
      { value: "AUTOMATIC", label: "Automatic" },
    ],
    drivenWheels: [
      { value: "FWD", label: "Front-Wheel Drive" },
      { value: "RWD", label: "Rear-Wheel Drive" },
      { value: "AWD", label: "All-Wheel Drive" },
    ],
    listingType: [
      { value: "SALE", label: "Sale" },
      { value: "RENT", label: "Rent" },
    ]
  };
};