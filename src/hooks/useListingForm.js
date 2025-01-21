import { useState, useEffect } from "react";
import { fetchCountries, fetchCities, fetchMakes, fetchModels } from "../data/ListingFormOptions";

export function useListingForm(isEdit, onSubmit) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

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
    country: null,
    city: null,
    make: null,
    model: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (onSubmit) {
      onSubmit(formData); 
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("/images/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      const result = await response.text();
      const imageId = result.split(": ")[1];
      setUploadedImages((prev) => [...prev, { id: imageId, file }]);
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  // Options for dropdowns
  const options = {

    countries: countries.map(country => ({ value: country.id, label: country.name })),
    cities: cities.map(city => ({ value: city.id, label: city.name })),
    makes: makes.map(make => ({ value: make.id, label: make.name })),
    models: models.map(model => ({ value: model.id, label: model.name })),

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
      try {
        const [countryData, makeData] = await Promise.all([fetchCountries(), fetchMakes()]);
        console.log("Fetched countries:", countryData);
        console.log("Fetched makes:", makeData);
        setCountries(countryData || []);
        setMakes(makeData || []);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (!formData.country) {
        setCities([]);
        return;
      }
      try {
        const cityData = await fetchCities(formData.country); // Pass country ID
        console.log(`Fetched cities for country ${formData.country}:`, cityData);
        setCities(cityData || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    loadCities();
  }, [formData.country]);

  useEffect(() => {
    const loadModels = async () => {
      if (!formData.make) {
        setModels([]);
        return;
      }
      try {
        const modelData = await fetchModels(formData.make);
        console.log(`Fetched models for make ${formData.make}:`, modelData);
        setModels(modelData || []);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    loadModels();
  }, [formData.make]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "country" ? { city: "" } : {}),
      ...(key === "make" ? { model: "" } : {}),
    }));
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
    uploadedImages,
    uploadImage,
    resetForm, 
  };
}
