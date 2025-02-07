import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../components/Form/TextInput";
import TextArea from "../components/Form/TextArea";
import Dropdown from "../components/Form/Dropdown";
import ImageUpload from "../utils/imageUpload";
import { useListingForm } from "../utils/listingFormUtils";
import { validateListing } from "../utils/formValidationUtils";
import ListingService from "../services/ListingService";
import Swal from "sweetalert2";
import "../styles/ListingForm.css";

function ListingForm() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const imageURL = `http://localhost:8080/images`;

  const {
    formData,
    options,
    handleChange,
    handleSubmit,
    handleBlur,
    uploadedImages,
    uploadImage,
    errors,
    isSubmitting
  } = useListingForm(listingId, async (payload) => {
    try {
      if (listingId) {
        await ListingService.updateListing(listingId, payload);
      } else {
        await ListingService.submitListing(payload);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      handleSubmit(e);
      return;
    }

    const payload = {
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
      imageURLs: uploadedImages.map(image => `images/${image.id}`),
      listingStatus: "ACTIVE"
    };

    const result = await Swal.fire({
      title: 'Submit Listing?',
      text: 'Are you sure you want to submit this listing?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#f44336'
    });

    if (result.isConfirmed) {
      handleSubmit(e, payload);
    }
  };

  const filteredCities = formData.country
    ? options.cities.filter(city => city.countryId === formData.country.id)
    : [];

  const filteredModels = formData.make
    ? options.models.filter(model => model.makeId === formData.make.id)
    : [];

  return (
    <form className="add-listing-form" onSubmit={handleFormSubmit} noValidate>
      {/* Text Inputs */}
      <TextInput
        id="title"
        label="Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        onBlur={() => handleBlur("title")}
        required
        error={errors.title}
      />

      <TextInput
        id="price"
        type="number"
        label="Price"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        onBlur={() => handleBlur("price")}
        required
        error={errors.price}
      />

      <TextInput
        id="year"
        type="number"
        label="Year"
        value={formData.year}
        onChange={(e) => handleChange("year", e.target.value)}
        onBlur={() => handleBlur("year")}
        required
        error={errors.year}
      />

      <TextInput
        id="month"
        type="number"
        label="Month"
        value={formData.month}
        onChange={(e) => handleChange("month", e.target.value)}
        onBlur={() => handleBlur("month")}
        required
        error={errors.month}
      />

      <TextInput
        id="mileage"
        type="number"
        label="Mileage"
        value={formData.mileage}
        onChange={(e) => handleChange("mileage", e.target.value)}
        onBlur={() => handleBlur("mileage")}
        required
        error={errors.mileage}
      />

      <TextArea
        id="description"
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        required
        error={errors.description}
      />

      <TextInput
        id="engineSize"
        type="number"
        label="Engine Size"
        value={formData.engineSize}
        onChange={(e) => handleChange("engineSize", e.target.value)}
        onBlur={() => handleBlur("engineSize")}
        required
        error={errors.engineSize}
        allowDecimals={true}
      />

      <TextInput
        id="enginePower"
        type="number"
        label="Engine Power"
        value={formData.enginePower}
        onChange={(e) => handleChange("enginePower", e.target.value)}
        onBlur={() => handleBlur("enginePower")}
        required
        error={errors.enginePower}
      />

      {/* Image Upload Section */}
      <ImageUpload
        uploadedImages={uploadedImages}
        uploadImage={uploadImage}
        imageURL={imageURL}
      />

      {/* Dropdowns */}
      <Dropdown
        id="fuelType"
        label="Fuel Type"
        options={options.fuelTypes}
        value={formData.fuelType}
        onChange={(e) => handleChange("fuelType", e.target.value)}
        onBlur={() => handleBlur("fuelType")}
        placeholder="Select Fuel Type"
        required
        error={errors.fuelType}
      />

      <Dropdown
        id="transmission"
        label="Transmission"
        options={options.transmissions}
        value={formData.transmission}
        onChange={(e) => handleChange("transmission", e.target.value)}
        onBlur={() => handleBlur("transmission")}
        placeholder="Select Transmission"
        required
        error={errors.transmission}
      />

      <Dropdown
        id="drivenWheels"
        label="Driven Wheels"
        options={options.drivenWheels}
        value={formData.drivenWheels}
        onChange={(e) => handleChange("drivenWheels", e.target.value)}
        onBlur={() => handleBlur("drivenWheels")}
        placeholder="Select Driven Wheels"
        required
        error={errors.drivenWheels}
      />

      {/* Country and City Dropdowns */}
      <Dropdown
        id="country"
        label="Country"
        options={options.countries}
        value={formData.country || ""}
        onChange={(e) => handleChange("country", e.target.value)}
        onBlur={() => handleBlur("country")}
        placeholder="Select Country"
        required
        error={errors.country}
      />

      <Dropdown
        id="city"
        label="City"
        options={filteredCities}
        value={formData.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
        onBlur={() => handleBlur("city")}
        placeholder="Select City"
        disabled={!formData.country}
        required
        error={errors.city}
      />

      {/* Make and Model Dropdowns */}
      <Dropdown
        id="make"
        label="Make"
        options={options.makes}
        value={formData.make || ""}
        onChange={(e) => handleChange("make", e.target.value)}
        onBlur={() => handleBlur("make")}
        placeholder="Select Make"
        required
        error={errors.make}
      />

      <Dropdown
        id="model"
        label="Model"
        options={filteredModels}
        value={formData.model || ""}
        onChange={(e) => handleChange("model", e.target.value)}
        onBlur={() => handleBlur("model")}
        placeholder="Select Model"
        disabled={!formData.make}
        required
        error={errors.model}
      />

      <Dropdown
        id="listingType"
        label="Listing Type"
        options={[
          { value: "SALE", label: "Sale" },
          { value: "RENT", label: "Rent" },
        ]}
        value={formData.listingType}
        onChange={(e) => handleChange("listingType", e.target.value)}
        onBlur={() => handleBlur("listingType")}
        placeholder="Select Listing Type"
        required
        error={errors.listingType}
      />

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ListingForm;