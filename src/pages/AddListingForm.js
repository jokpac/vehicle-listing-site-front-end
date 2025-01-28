import React from "react";
import "./AddListingForm.css";
import ListingService from "../services/ListingService";
import { useListingForm } from "../hooks/useListingForm";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Form/Dropdown";
import TextArea from "../components/Form/TextArea";
import TextInput from "../components/Form/TextInput";

const AddListingForm = () => {
  const navigate = useNavigate();
  const imageURL = `http://localhost:8080/images`;
  const { formData, options, handleChange, handleSubmit, uploadedImages, uploadImage } =
    useListingForm(false, async (payload) => {
      try {
        await ListingService.submitListing(payload);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting form:", error.message || error);
      }
    });

  const filteredCities = formData.country
    ? options.cities.filter(city => city.countryId === formData.country.id)
    : [];

  const filteredModels = formData.make
    ? options.models.filter(model => model.makeId === formData.make.id)
    : [];

  return (
    <form onSubmit={handleSubmit} className="add-listing-form">

      {/* Text Inputs */}
      <TextInput
        id="title"
        label="Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />

      <TextInput
        id="price"
        label="Price"
        type="number"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        required
      />

      <TextInput
        id="year"
        label="Year"
        type="number"
        value={formData.year}
        onChange={(e) => handleChange("year", e.target.value)}
        required
      />

      <TextInput
        id="month"
        label="Month"
        type="number"
        value={formData.month}
        onChange={(e) => handleChange("month", e.target.value)}
        required
      />

      <TextInput
        id="mileage"
        label="Mileage (km)"
        type="number"
        value={formData.mileage}
        onChange={(e) => handleChange("mileage", e.target.value)}
        required
      />

      <TextArea
        id="description"
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        required
      />

      <TextInput
        id="engineSize"
        label="Engine Size (L)"
        type="number"
        value={formData.engineSize}
        onChange={(e) => handleChange("engineSize", e.target.value)}
        required
      />

      <TextInput
        id="enginePower"
        label="Engine Power (HP)"
        type="number"
        value={formData.enginePower}
        onChange={(e) => handleChange("enginePower", e.target.value)}
        required
      />

      {/* Image Upload Section */}
      <fieldset className="image-upload-section">
        <legend>Images</legend>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              uploadImage(e.target.files[0]);
            }
          }}
        />

        <div className="uploaded-images">
          {uploadedImages.map((image) => (
            <div key={image.id} className="uploaded-image">
              <img
                src={`${imageURL}/${image.id}`}
                alt={`Uploaded ${image.fileName}`}
                className="image-preview"
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Dropdowns */}
      <Dropdown
        id="fuelType"
        label="Fuel Type"
        options={options.fuelTypes}
        value={formData.fuelType}
        onChange={(e) => handleChange("fuelType", e.target.value)}
        placeholder="Select Fuel Type"
      />

      <Dropdown
        id="transmission"
        label="Transmission"
        options={options.transmissions}
        value={formData.transmission}
        onChange={(e) => handleChange("transmission", e.target.value)}
        placeholder="Select Transmission"
      />

      <Dropdown
        id="drivenWheels"
        label="Driven Wheels"
        options={options.drivenWheels}
        value={formData.drivenWheels}
        onChange={(e) => handleChange("drivenWheels", e.target.value)}
        placeholder="Select Driven Wheels"
      />

      {/* Country and City Dropdowns */}
      <Dropdown
        id="country"
        label="Country"
        options={options.countries}
        value={formData.country || ""}
        onChange={(e) => handleChange("country", e.target.value)}
        placeholder="Select Country"
      />

      <Dropdown
        id="city"
        label="City"
        options={filteredCities}
        value={formData.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
        placeholder="Select City"
        disabled={!formData.country}
      />

      {/* Make and Model Dropdowns */}
      <Dropdown
        id="make"
        label="Make"
        options={options.makes}
        value={formData.make || ""}
        onChange={(e) => handleChange("make", e.target.value)}
        placeholder="Select Make"
      />

      <Dropdown
        id="model"
        label="Model"
        options={filteredModels}
        value={formData.model || ""}
        onChange={(e) => handleChange("model", e.target.value)}
        placeholder="Select Model"
        disabled={!formData.make}
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
        placeholder="Select Listing Type"
        required
      />

      <button type="submit" className="submit-button">Submit</button>
    </form>

  );
}

export default AddListingForm;
