import { useState, useEffect } from "react";
import { fetchCountries, fetchCities, fetchMakes, fetchModels } from "../data/ListingFormOptions";

export const useFilterState = () => {
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

    const [filters, setFilters] = useState(initialFilters);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const resetFilters = () => {
        setFilters({ ...initialFilters });
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
            if (!filters.country) {
                setCities([]);
                return;
            }
            try {
                const cityData = await fetchCities(filters.country);
                setCities(cityData || []);
            } catch (error) {
                console.error("Error loading cities:", error);
            }
        };
        loadCities();
    }, [filters.country]);

    useEffect(() => {
        const loadModels = async () => {
            if (!filters.make) {
                setModels([]);
                return;
            }
            try {
                const modelData = await fetchModels(filters.make);
                setModels(modelData || []);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        loadModels();
    }, [filters.make]);

    const handleChange = (key, value) => {
        const stringFields = ['fuelType', 'transmission', 'drivenWheels', 'listingType'];
        const decimalFields = ['engineSizeMin', 'engineSizeMax'];
        
        let newValue;
        if (stringFields.includes(key)) {
            newValue = value || "";
        } else if (decimalFields.includes(key)) {
            // For engine size, preserve the decimal input
            newValue = value === '' ? '' : value;
        } else {
            // For other numeric fields, convert to number or empty string
            newValue = value ? Number(value) : "";
        }

        setFilters((prev) => ({
            ...prev,
            [key]: newValue,
            ...(key === "country" ? { city: "" } : {}),
            ...(key === "make" ? { model: "" } : {}),
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