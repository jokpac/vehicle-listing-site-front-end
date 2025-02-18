import { useState, useEffect } from "react";
import ListingService from "../services/ListingService";
import { validateListing } from "./formValidationUtils";
import { getDropdownOptions } from "../data/DropdownOptions";
import { useDropdownData } from "./dataLoader";
import { uploadImage as uploadImageFunction } from "./imageUpload";

export function useListingForm(listingId, onSubmit) {

  const [uploadedImages, setUploadedImages] = useState([]); // State for storing uploaded images
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
  const [errors, setErrors] = useState({}); // State for tracking validation errors
  const [touched, setTouched] = useState({}); // State to track which fields have been interacted with

  // Initial state of the form
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

  // State for managing form data
  const [formData, setFormData] = useState(initialFormState);

  // Handles countries, cities, makes and models field logic
  const { countries, cities, makes, models } = useDropdownData(formData.country, formData.make);

  // Get dropdown options dynamically
  const options = getDropdownOptions({ countries, cities, makes, models });

  // Handles image upload logic
  const uploadImage = (file) => {
    uploadImageFunction(file, setUploadedImages);
  };

  // Validates a single field and returns error message if applicable
  const validateField = (name, value) => {
    const validationResult = validateListing({ ...formData, [name]: value });
    return validationResult[name];
  };

  // Handles form field changes and updates state accordingly
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { city: "" } : {}), // Reset city if country changes
      ...(name === "make" ? { model: "" } : {}) // Reset model if make changes
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field only if it has been touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Handles field blur event for validation
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

  // Handles form submission
  const handleSubmit = async (e, directPayload = null) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    try {
      // Construct payload for submission
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

      // Validate form data before submission
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

  // Resets the form to its initial state
  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setUploadedImages([]);
  };

  // Fetches listing data if editing an existing listing
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
            country: listingData.countryId || "",
            city: listingData.cityId || "",
            make: listingData.makeId || "",
            model: listingData.modelId || "",
            listingType: listingData.listingType || "",
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