import { useState } from "react";
import { useDropdownData } from "./dataLoader";

// Custom hook to manage filter state and dropdown data
export const useFilterState = () => {
    // Initial filter values
    const initialFilters = {
        priceMin: "",
        priceMax: "",
        yearMin: "",
        yearMax: "",
        mileageMin: "",
        mileageMax: "",
        engineSizeMin: "",
        engineSizeMax: "",
        enginePowerMin: "",
        enginePowerMax: "",
        fuelType: "",
        transmission: "",
        drivenWheels: "",
        country: "",
        city: "",
        make: "",
        model: "",
        listingType: "",
    };

    // State to store current filter selections
    const [filters, setFilters] = useState(initialFilters);

    // Fetch dropdown data for dependent fields based on selected country and make
    const { countries, cities, makes, models } = useDropdownData(filters.country, filters.make);

    // Function to reset all filters to their initial state
    const resetFilters = () => {
        setFilters({ ...initialFilters });
    };

    // Function to handle changes in filter fields
    const handleChange = (key, value) => {
        const stringFields = ['fuelType', 'transmission', 'drivenWheels', 'listingType']; // Fields that store strings
        const decimalFields = ['engineSizeMin', 'engineSizeMax']; // Fields that may contain decimal values

        let newValue;

        // Determine the correct format for the new value based on the field type
        if (stringFields.includes(key)) {
            newValue = value || ""; // Ensure string fields default to empty string
        } else if (decimalFields.includes(key)) {
            newValue = value === '' ? '' : value;  // Maintain empty string for decimals when no value is provided
        } else {
            newValue = value ? Number(value) : "";  // Convert numeric fields to numbers, default to empty string
        }

        // Update filters state and reset dependent fields when necessary
        setFilters((prev) => ({
            ...prev,
            [key]: newValue,
            ...(key === "country" ? { city: "" } : {}), // Reset city if country changes
            ...(key === "make" ? { model: "" } : {}), // Reset model if make changes
        }));
    };

    return {
        filters,
        setFilters,
        handleChange,
        resetFilters,
        countries,
        cities,
        makes,
        models
    };
};