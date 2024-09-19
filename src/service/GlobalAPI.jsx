// import axios from "axios";

// // const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
// const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete?text=";

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
//     "X-Goog-FieldMask": [
//       "places.photo",
//       "places.displayName",
//       "places.geo-cordinates",
//     ],
//   },
// };
// export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);




// const PHOTO_REF_URL =
//   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx1000&key=" +
//   import.meta.env.VITE_GOOGLE_PLACE_API_KEY;


import axios from "axios";

const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete";
const GOOGLE_MAPS_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY; // Ensure you have this key

export const GetPlaceDetails = async (text) => {
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY; // Ensure you have this key in your environment variables
  const url = `${BASE_URL}?text=${encodeURIComponent(text)}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Full Response:", response);

    const filteredData = response.data.features.map((feature) => ({
      id: feature.properties.place_id,
      displayName: feature.properties.formatted,
      geoCoordinates: feature.geometry.coordinates,
    }));
    console.log("Filtered Data:", filteredData);

    return filteredData;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

// New function to fetch photo using Google Maps Places API
export const GetPlacePhoto = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log("Place Details Response:", response);

    if (response.data.result && response.data.result.photos) {
      const photoReference = response.data.result.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_PLACES_API_KEY}`;
      return photoUrl;
    } else {
      console.log("No photos found for this place");
      return null; // Indicate no photo found
    }
  } catch (error) {
    console.error("Error fetching place photo:", error);
    return null; // Indicate error
  }
};

// const pixabayApiKey = "45107150-e09cb6c948306a63c1e347756"; // Replace with your key

// const GetPlacePhotoFromPixabay = async (placeName) => {
//   const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${placeName}&image_type=photo`;
  
//   try {
//     const response = await axios.get(url);
//     // Check for successful response and at least one image
//     if (response.data.totalHits > 0 && response.data.hits[0]) {
//       return response.data.hits[0].webformatURL; // Return URL of first image
//     } else {
//       return null; // No image found
//     }
//   } catch (error) {
//     console.error("Error fetching photo from Pixabay:", error);
//     return null; // Handle error gracefully
//   }
// };

