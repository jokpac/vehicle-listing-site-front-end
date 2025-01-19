import axios from "./AxiosConfig";

export const fetchCountries = async () => {
  const response = await axios.get("/api/countries");
  return response.data;
};

export const fetchCities = async (countryId) => {
  const response = await axios.get(`/api/cities?country=${countryId}`);
  return response.data;
};

export const fetchMakes = async () => {
  const response = await axios.get("/api/makes");
  return response.data;
};

export const fetchModels = async (makeId) => {
  const response = await axios.get(`/api/models?make=${makeId}`);
  return response.data;
};
