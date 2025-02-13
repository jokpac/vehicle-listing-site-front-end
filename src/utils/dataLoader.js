import { useState, useEffect } from "react";
import { fetchCountries, fetchCities, fetchMakes, fetchModels } from "../data/DropdownOptions";

export const useDropdownData = (selectedCountry, selectedMake) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    // Load initial data (countries and makes)
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

    // Load cities based on selected country
    useEffect(() => {
        const loadCities = async () => {
            if (!selectedCountry) {
                setCities([]);
                return;
            }
            try {
                const cityData = await fetchCities(selectedCountry);
                setCities(cityData || []);
            } catch (error) {
                console.error("Error loading cities:", error);
            }
        };
        loadCities();
    }, [selectedCountry]);

    // Load models based on selected make
    useEffect(() => {
        const loadModels = async () => {
            if (!selectedMake) {
                setModels([]);
                return;
            }
            try {
                const modelData = await fetchModels(selectedMake);
                setModels(modelData || []);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        loadModels();
    }, [selectedMake]);

    return { countries, cities, makes, models };
};
