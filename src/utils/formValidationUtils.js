// Validation rules for the listing form
export const validateListing = (formData) => {
    const errors = {};
    
    // Title validation
    if (!formData.title?.trim()) {
        errors.title = "Title is required";
    } else if (formData.title.length < 3) {
        errors.title = "Title must be at least 3 characters long";
    }

    // Price validation
    if (formData.price === '') {
        errors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
        errors.price = "Price must be greater than 0";
    }

    // Year validation
    if (formData.year === '') {
        errors.year = "Year is required";
    } else {
        const year = Number(formData.year);
        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
            errors.year = `Year must be between 1900 and ${currentYear}`;
        }
    }

    // Month validation
    if (formData.month === '') {
        errors.month = "Month is required";
    } else {
        const month = Number(formData.month);
        if (month < 1 || month > 12) {
            errors.month = "Month must be between 1 and 12";
        }
    }

    // Mileage validation
    if (formData.mileage === '') {
        errors.mileage = "Mileage is required";
    } else if (Number(formData.mileage) < 0) {
        errors.mileage = "Mileage must be greater than or equal to 0";
    }

    // Description validation
    if (!formData.description?.trim()) {
        errors.description = "Description is required";
    } else if (formData.description.length < 10) {
        errors.description = "Description must be at least 10 characters long";
    }

    // Engine size validation
    if (formData.engineSize === '') {
        errors.engineSize = "Engine size is required";
    } else if (Number(formData.engineSize) <= 0) {
        errors.engineSize = "Engine size must be greater than 0";
    }

    // Engine power validation
    if (formData.enginePower === '') {
        errors.enginePower = "Engine power is required";
    } else if (Number(formData.enginePower) <= 0) {
        errors.enginePower = "Engine power must be greater than 0";
    }

    // Required dropdowns
    if (!formData.fuelType) {
        errors.fuelType = "Please select a fuel type";
    }

    if (!formData.transmission) {
        errors.transmission = "Please select a transmission type";
    }

    if (!formData.drivenWheels) {
        errors.drivenWheels = "Please select driven wheels";
    }

    if (!formData.country) {
        errors.country = "Please select a country";
    }

    if (!formData.city) {
        errors.city = "Please select a city";
    }

    if (!formData.make) {
        errors.make = "Please select a make";
    }

    if (!formData.model) {
        errors.model = "Please select a model";
    }

    if (!formData.listingType) {
        errors.listingType = "Please select a listing type";
    }

    return errors;
};

// Helper function to check if form has errors
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};
