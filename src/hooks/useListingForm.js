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
    country: "",
    city: "",
    make: "",
    model: "",
    imageURLs: [],
    listingStatus: "ACTIVE",
    listingType: "SALE",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      year: Number(formData.year),
      month: Number(formData.month),
      engineSize: parseFloat(formData.engineSize),
      enginePower: parseInt(formData.enginePower, 10),
      countryId: formData.country,
      cityId: formData.city,
      makeId: formData.make,
      modelId: formData.model,
      imageURLs: uploadedImages.map(image => `images/${image.id}`)
    };

    console.log("Submitting payload:", payload);

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  // Uploading image
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.text();
      const imageId = result.split(": ")[1];
      setUploadedImages((prev) => [...prev, { id: imageId, fileName: file.name, file }]);
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
        const cityData = await fetchCities(formData.country);
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
      imageURLs: [],
      listingStatus: "ACTIVE",
      listingType: "SALE"
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
