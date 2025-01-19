import { useState, useEffect } from "react";
import { fetchCountries, fetchCities, fetchMakes, fetchModels } from "../data/ListingFormOptions";

export function useListingForm(isEdit, onSubmit) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    year: "",
    month: "",
    mileage: "",
    description: "",
    engineSize: "",
    enginePower: "",
    fuelType: "",
    transmission: "",
    drivenWheels: "",
    country: "",
    city: "",
    make: "",
    model: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (onSubmit) {
      onSubmit(formData); 
    }
  };

  // Options for dropdowns
  const options = {
    countries: countries.map(country => ({ value: country.name, label: country.name })),
    cities: cities.map(city => ({ value: city.name, label: city.name })),
    makes: makes.map(make => ({ value: make.name, label: make.name })),
    models: models.map(model => ({ value: model.name, label: model.name })),
    fuelTypes: [
      { value: "petrol", label: "Petrol" },
      { value: "diesel", label: "Diesel" },
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
    ],
    transmissions: [
      { value: "manual", label: "Manual" },
      { value: "automatic", label: "Automatic" },
    ],
    drivenWheels: [
      { value: "fwd", label: "Front-Wheel Drive" },
      { value: "rwd", label: "Rear-Wheel Drive" },
      { value: "awd", label: "All-Wheel Drive" },
    ],
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const [countryData, makeData] = await Promise.all([fetchCountries(), fetchMakes()]);
      console.log("Fetched countries:", countryData);
      console.log("Fetched makes:", makeData);
      setCountries(countryData || []);
      setMakes(makeData || []);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.country) {
      const loadCities = async () => {
        const cityData = await fetchCities(formData.country);
        console.log("Fetched cities for country", formData.country, ":", cityData);
        setCities(cityData);
      };
      loadCities();
    } else {
      setCities([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.make) {
      const loadModels = async () => {
        const modelData = await fetchModels(formData.make);
        console.log("Fetched models for make", formData.make, ":", modelData);
        setModels(modelData);
      };
      loadModels();
    } else {
      setModels([]);
    }
  }, [formData.make]);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      year: "",
      month: "",
      mileage: "",
      description: "",
      engineSize: "",
      enginePower: "",
      fuelType: "",
      transmission: "",
      drivenWheels: "",
      country: "",
      city: "",
      make: "",
      model: "",
    });
  };

  return {
    formData,
    options,
    handleChange,
    handleSubmit,
    resetForm, 
  };
}
