import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

 


function InfoSection({ trip }) {

  const { photoUrl, setPhotoUrl } = useState('');
const [isLoading, setIsLoading] = useState(false); // Track loading state

useEffect(() => {
  if (trip) {
    setIsLoading(true); // Start loading indicator
    GetPlacePhoto()
      .then(() => setIsLoading(false)) // Stop loading indicator on success
      .catch(() => setIsLoading(false)); // Stop loading indicator on error
  }
}, [trip]);
  // useEffect(() => {
  //   console.log(trip);
  //   trip && GetPlacePhoto();
  // }, [trip]);

  // const GetPlacePhoto = async () => {
  //   const textQuery = trip?.userSelection?.location?.properties?.formatted;
  //   try {
  //     const result = await GetPlaceDetails(textQuery);
  //     console.log("DATA", result); // This should log the filtered data array

  //     // Check if there's at least one photo
  //     if (result && result.length > 0 && result[0].photo) {
  //       const photoReference = result[0].photo; // Use the first photo reference
  //       const PhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=1000&maxwidth=1000&key=${
  //         import.meta.env.VITE_GOOGLE_PLACE_API_KEY
  //       }`;
  //       console.log(PhotoUrl);
  //       setPhotoUrl(PhotoUrl); // Update state with constructed photo URL
  //     } else {
  //       console.log("No photos found");
  //     }
  //     return result;
  //   } catch (error) {
  //     console.error("Error fetching place photo:", error);
  //     return null;
  //   }
  // }
  const GetPlacePhoto = async () => {
    const textQuery = trip?.userSelection?.location?.properties?.formatted;
    try {
      const result = await GetPlaceDetails(textQuery);
      // ... rest of your code

      // Check if there's at least one photo
      if (result && result.length > 0 && result[0].photo) {
        const photoReference = result[0].photo;
        const PhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=1000&maxwidth=1000&key=${
          import.meta.env.VITE_GOOGLE_PLACE_API_KEY
        }`;
        console.log(PhotoUrl);
        // setPhotoUrl(PhotoUrl); // Update state with constructed photo URL (Fixed line)
      } else {
        console.log("No photos found");
        // setPhotoUrl(""); // Set to empty string if no photos (Optional for error handling)
      }
      return result;
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl(""); // Set to empty string on error (Optional for error handling)
      return null;
    }
  };
    // try {
      // const result = await GetPlaceDetails(textQuery);
      // console.log("DATA"+result); // This should log the filtered data array
      // const PhotoUrl = PHOTO_REF_URL.replace(
      //   "{NAME}",
        // resp.data.places[0].photos[3].name
      // );
      // console.log(PhotoUrl);
  //     return result;
  //   } catch (error) {
  //     console.error("Error fetching place photo:", error);
  //     return null;
  //   }
  // };

  // // Call the function and handle the result
  // GetPlacePhoto().then((data) => {
  //   if (data) {
  //     console.log("Place details:", data);
  //   } else {
  //     console.log("No data retrieved");
  //   }
  // });

  // const GetPlacePhoto =async() => {
  //   const data = {
  //     textQuery:trip?.userSelection?.location?.properties?.formatted,
  //   }
  //   const result = await GetPlaceDetails(data).then(resp => {
  //     console.log(resp.data.places[0].photos[3].name);
  //    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
  //     setPhotoUrl(PhotoUrl);
  // console.log(PhotoUrl);
  //   })
  // }
  // console.log(GetPlacePhoto());

  return (
    <div>
      {isLoading && <div>Loading photo...</div>} {/* Loading indicator */}
      <img
        src={photoUrl ? photoUrl : "/background.jpg"}
        className="h-[360px] w-full object-cover rounded-xl"
        alt={
          trip?.userSelection?.location?.properties?.formatted || "Place Photo"
        }
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className=" font-bold text-2xl">
            {trip?.userSelection?.location?.properties?.formatted ||
              "Address not available"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸{trip?.userSelection?.budget}Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No.of Traveler {trip?.userSelection?.noOfDays}
            </h2>
          </div>
        </div>
        <Button>
          <BsFillSendFill />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
