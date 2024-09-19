import React, { useState } from "react";

function Autocomplete({ onPlaceSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      setLoading(true);
      const requestOptions = {
        method: "GET",
      };

      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${
            import.meta.env.VITE_GEOAPIFY_API_KEY
          }`,
          requestOptions
        );
        const result = await response.json();

        if (result.features) {
          setSuggestions(result.features);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setInputValue(place.properties.formatted);
    setSuggestions([]);
    onPlaceSelect(place);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a location"
        className="border p-2 w-full"
      />
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <ul className="border mt-2 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.properties.place_id}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
