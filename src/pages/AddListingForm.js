import React from "react";
import "./AddListingForm.css";
import { useListingForm } from "../hooks/useListingForm";
import Dropdown from "../components/Form/Dropdown";
import TextArea from "../components/Form/TextArea";
import TextInput from "../components/Form/TextInput";

function AddListingForm({ isEdit, onSubmit, existingListing }) {
  const {
    formData,
    options,
    handleChange,
    handleSubmit,
  } = useListingForm(isEdit, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="add-listing-form">
      <h2>{isEdit ? "Edit Listing" : "Add Listing"}</h2>
      
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
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
        placeholder="Select Country"
      />
      <Dropdown
        id="city"
        label="City"
        options={options.cities} 
        value={formData.city}
        onChange={(e) => handleChange("city", e.target.value)}
        placeholder="Select City"
        disabled={!formData.country}
      />

      {/* Make and Model Dropdowns */}
      <Dropdown
        id="make"
        label="Make"
        options={options.makes} 
        value={formData.make}
        onChange={(e) => handleChange("make", e.target.value)}
        placeholder="Select Make"
      />
      <Dropdown
        id="model"
        label="Model"
        options={options.models} 
        value={formData.model}
        onChange={(e) => handleChange("model", e.target.value)}
        placeholder="Select Model"
        disabled={!formData.make}
      />

      <button type="submit" className="submit-button">
        {isEdit ? "Edit Listing" : "Submit"}
      </button>
    </form>
  );
}

export default AddListingForm;
