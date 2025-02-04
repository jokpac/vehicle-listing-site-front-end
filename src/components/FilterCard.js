import "../styles/FilterCard.css";
import { useFilterState } from "../utils/filterState";
import Dropdown from "../components/Form/Dropdown";
import TextInput from "../components/Form/TextInput";

const FilterCard = ({ onFilter }) => {
    const { filters, handleChange, resetFilters, countries, cities, makes, models } = useFilterState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredData = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
        );
        console.log("Applied filters:", filteredData);

        onFilter(filteredData);
    };

    const handleReset = () => {
        resetFilters();
        onFilter({});
    };

    return (
        <form onSubmit={handleSubmit} className="filter-card">
            <h3>Filter</h3>

            <div className="filter-row">
                <TextInput id="priceMin" label="Min Price" type="number" value={filters.priceMin} onChange={(e) => handleChange("priceMin", e.target.value)} />
                <TextInput id="priceMax" label="Max Price" type="number" value={filters.priceMax} onChange={(e) => handleChange("priceMax", e.target.value)} />
            </div>

            <div className="filter-row">
                <TextInput id="yearMin" label="Min Year" type="number" value={filters.yearMin} onChange={(e) => handleChange("yearMin", e.target.value)} />
                <TextInput id="yearMax" label="Max Year" type="number" value={filters.yearMax} onChange={(e) => handleChange("yearMax", e.target.value)} />
            </div>

            <div className="filter-row">
                <TextInput id="mileageMin" label="Min Mileage" type="number" value={filters.mileageMin} onChange={(e) => handleChange("mileageMin", e.target.value)} />
                <TextInput id="mileageMax" label="Max Mileage" type="number" value={filters.mileageMax} onChange={(e) => handleChange("mileageMax", e.target.value)} />
            </div>

            <div className="filter-row">
                <TextInput id="engineSizeMin" label="Min Engine Size (L)" type="number" value={filters.engineSizeMin} onChange={(e) => handleChange("engineSizeMin", e.target.value)} allowDecimals={true}/>
                <TextInput id="engineSizeMax" label="Max Engine Size (L)" type="number" value={filters.engineSizeMax} onChange={(e) => handleChange("engineSizeMax", e.target.value)} allowDecimals={true}/>
            </div>

            <Dropdown
                id="fuelType"
                label="Fuel Type"
                options={[
                    { value: "PETROL", label: "Petrol" },
                    { value: "DIESEL", label: "Diesel" },
                    { value: "ELECTRIC", label: "Electric" },
                    { value: "HYBRID", label: "Hybrid" },
                ]}
                value={filters.fuelType}
                onChange={(e) => handleChange("fuelType", e.target.value)}
                placeholder="Select Fuel Type"
            />

            <Dropdown
                id="transmission"
                label="Transmission"
                options={[
                    { value: "MANUAL", label: "Manual" },
                    { value: "AUTOMATIC", label: "Automatic" },
                ]}
                value={filters.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                placeholder="Select Transmission"
            />

            <Dropdown
                id="drivenWheels"
                label="Driven Wheels"
                options={[
                    { value: "FWD", label: "Front-Wheel Drive" },
                    { value: "RWD", label: "Rear-Wheel Drive" },
                    { value: "AWD", label: "All-Wheel Drive" },
                ]}
                value={filters.drivenWheels}
                onChange={(e) => handleChange("drivenWheels", e.target.value)}
                placeholder="Select Driven Wheels"
            />

            <Dropdown
                id="country"
                label="Country"
                options={countries.map(c => ({ value: c.id, label: c.name }))}
                value={filters.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Select Country"
            />

            <Dropdown
                id="city"
                label="City"
                options={cities.map(c => ({ value: c.id, label: c.name }))}
                value={filters.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={!filters.country}
                placeholder="Select City"
            />

            <Dropdown
                id="make"
                label="Make"
                options={makes.map(m => ({ value: m.id, label: m.name }))}
                value={filters.make}
                onChange={(e) => handleChange("make", e.target.value)}
                placeholder="Select Make"
            />

            <Dropdown
                id="model"
                label="Model"
                options={models.map(m => ({ value: m.id, label: m.name }))}
                value={filters.model}
                onChange={(e) => handleChange("model", e.target.value)}
                disabled={!filters.make}
                placeholder="Select Model"
            />

            <Dropdown
                id="listingType"
                label="Listing Type"
                options={[
                    { value: "SALE", label: "Sale" },
                    { value: "RENT", label: "Rent" },
                ]}
                value={filters.listingType}
                onChange={(e) => handleChange("listingType", e.target.value)}
                placeholder="Select Listing Type"
            />

            <button type="submit">Apply Filters</button>
            <button type="button" onClick={handleReset} className="reset-filters-btn">Reset Filters</button>
        </form>
    );
};

export default FilterCard;