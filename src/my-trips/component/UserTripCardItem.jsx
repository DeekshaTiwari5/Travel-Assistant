import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      if (
        resp.data.places.length > 0 &&
        resp.data.places[0].photos.length > 3
      ) {
        console.log(resp.data.places[0].photos[3].name);
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
        console.log(PhotoUrl);
      }
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all ">
        <img
          src={photoUrl ? photoUrl : "/background.jpg"}
          className="object-cover rounded-xl h-[220px] p-4 mt-5 "
        />
        <div>
          <h2 className="font-bold text-lg gap-8">
            {trip?.userSelection?.location?.properties?.formatted}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
