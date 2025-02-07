import { useState, useEffect } from "react";
import { fetchCountries, fetchCities, fetchMakes, fetchModels } from "../data/ListingFormOptions";
import ListingService from "../services/ListingService";
import { validateListing } from "./formValidationUtils";

export function useListingForm(listingId, onSubmit) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const imageUploadURL = 'http://localhost:8080/images/upload';

  const initialFormState = {
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
    listingType: "",
    listingStatus: "ACTIVE",
    imageURLs: []
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateField = (name, value) => {
    const validationResult = validateListing({ ...formData, [name]: value });
    return validationResult[name];
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { city: "" } : {}),
      ...(name === "make" ? { model: "" } : {})
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Only validate if field has been touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const fieldError = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleSubmit = async (e, directPayload = null) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    try {
      const payload = directPayload || {
        title: formData.title,
        price: Number(formData.price),
        year: Number(formData.year),
        month: Number(formData.month),
        mileage: Number(formData.mileage),
        description: formData.description,
        engineSize: Number(formData.engineSize),
        enginePower: Number(formData.enginePower),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        drivenWheels: formData.drivenWheels,
        countryId: Number(formData.country),
        cityId: Number(formData.city),
        makeId: Number(formData.make),
        modelId: Number(formData.model),
        listingType: formData.listingType,
        images: uploadedImages,
        imageURLs: uploadedImages.map(image => `images/${image.id}`),
        listingStatus: listingId ? formData.listingStatus : "ACTIVE"
      };

      const validationErrors = validateListing(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await onSubmit(payload);
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setUploadedImages([]);
  };

  useEffect(() => {
    if (listingId) {
      const fetchListingData = async () => {
        try {
          const listingData = await ListingService.getListingById(listingId);
          setFormData({
            title: listingData.title || "",
            price: listingData.price || "",
            year: listingData.year || "",
            month: listingData.month || "",
            mileage: listingData.mileage || "",
            description: listingData.description || "",
            engineSize: listingData.engineSize || "",
            enginePower: listingData.enginePower || "",
            fuelType: listingData.fuelType || "",
            transmission: listingData.transmission || "",
            drivenWheels: listingData.drivenWheels || "",
            country: listingData.country?.id || "",
            city: listingData.city?.id || "",
            make: listingData.make?.id || "",
            model: listingData.model?.id || "",
            listingType: listingData.listingType || "SALE",
            listingStatus: listingData.listingStatus || "ACTIVE",
            imageURLs: listingData.imageURLs || []
          });

          if (listingData.imageURLs) {
            setUploadedImages(
              listingData.imageURLs.map((url) => {
                const id = url.split("/")[1];
                return {
                  id,
                  url,
                };
              })
            );
          }
        } catch (error) {
          console.error("Error fetching listing data:", error.message);
        }
      };

      fetchListingData();
    }
  }, [listingId]);

  // Uploading image
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${imageUploadURL}`, {
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
        setCities(cityData || []);
      } catch (error) {
        console.error("Error loading cities:", error)
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
        setModels(modelData || []);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    loadModels();
  }, [formData.make]);

  return {
    formData,
    options,
    handleChange,
    handleSubmit,
    handleBlur,
    uploadedImages,
    uploadImage,
    isSubmitting,
    errors,
    touched,
    resetForm
  };
}