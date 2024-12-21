import React, { useState, useContext, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import AdminContext from "@/app/context/adminContext";
import axios from "axios";

// Specify the libraries needed for Google Maps API
const libraries = ["places"];

const PlaceAutocomplete = () => {
  const { onboardField, setOnboardField } = useContext(AdminContext);
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef(null);

  // Combine business name and address dynamically
  useEffect(() => {
    if (onboardField.name && onboardField.address) {
      setInputValue(`${onboardField.name}, ${onboardField.address}`);
    }
  }, [onboardField.name, onboardField.address]);

  // Handle place selection from Autocomplete
  const onPlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    const place = autocomplete.getPlace();

    if (place.geometry) {
      const { formatted_address, geometry } = place;

      // Get the coordinates (lat, lng)
      const coordinates = geometry.location.toJSON();

      // Log the coordinates
      console.log("Selected coordinates:", coordinates);

      setOnboardField((prev) => ({
        ...prev,
        address: formatted_address
          .replace(/[^\x20-\x7E]/g, "")
          .replace(/^[,. ]+/, "")
          .trim(),
        lat: coordinates.lat,
        lng: coordinates.lng, // { lat, lng }
      }));

      setInputValue(formatted_address);
    } else {
      console.error(
        "Place details unavailable. Searching with Text Search API..."
      );
      fetchExactLocation(`${onboardField.name}, ${onboardField.address}`); // Fallback
    }
  };

  // Fallback: Use Google Places Text Search API for precise results
  const fetchExactLocation = async (query) => {
    const apiKey = "AIzaSyAAByluIDePTXyPVFSCzMxkMi7F3_3xS_M";
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const place = results[0]; // Get the first matching result
        const { formatted_address, geometry } = place;

        // Get the coordinates (lat, lng)
        const coordinates = geometry.location;

        // Log the coordinates
        console.log("Fetched coordinates from Text Search API:", coordinates);

        setOnboardField((prev) => ({
          ...prev,
          address: formatted_address
            .replace(/[^\x20-\x7E]/g, "")
            .replace(/^[,. ]+/, "")
            .trim(),
          lat: coordinates.lat,
          lng: coordinates.lng,
        }));
        setInputValue(formatted_address);
      } else {
        console.error("No results found in Text Search API.");
        alert("Could not find the exact location. Please refine your input.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching the location.");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyAAByluIDePTXyPVFSCzMxkMi7F3_3xS_M"}
      libraries={libraries}
    >
      <div className="mb-6">
        <label htmlFor="business-name" className="block mb-2">
          Business Name
        </label>
        <input
          id="business-name"
          value={onboardField.name}
          onChange={(e) =>
            setOnboardField((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          placeholder="Enter the business name"
          className="w-full border border-black h-12 rounded-md p-4 mb-4"
        />

        <label htmlFor="address-area" className="block mb-2">
          Address Area
        </label>
        <input
          id="address-area"
          value={onboardField.address}
          onChange={(e) =>
            setOnboardField((prev) => ({ ...prev, address: e.target.value }))
          }
          placeholder="Enter the address area"
          className="w-full border border-black h-12 rounded-md p-4 mb-4"
        />

        <label htmlFor="autocomplete-input" className="block mb-2">
          Search Business Location
        </label>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            id="autocomplete-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for business name and address"
            className="w-full border border-black h-12 rounded-md p-4"
          />
        </Autocomplete>
      </div>
    </LoadScript>
  );
};

export default PlaceAutocomplete;
