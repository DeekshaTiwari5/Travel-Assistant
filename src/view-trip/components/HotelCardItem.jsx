import { GetPlaceDetails, GetPlacePhoto } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto =async() => {
    const data = {
      textQuery:item?.name,
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);
     const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
      console.log(PhotoUrl);
    })
  }

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          item?.name +
          "," +
          item?.address
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          {/* <img
            src={photoUrl}
            alt="/background.jpg"
            className="rounded-xl h-[1800px] w-full object-cover "
          /> */}
          <img
            src={photoUrl ? photoUrl : "/background.jpg"}
            className="rounded-xl h-[180px] w-full object-cover "
          />
          <div className="my-2 fl flex-col gap-2">
            <h2 className="font-medium">{item?.name}</h2>
            <h2 className="text-xs text-gray-500">📍 {item?.address}</h2>
            <h2 className="text-sm"> 💰{item?.price}</h2>
            <h2 className="text-sm"> ⭐{item?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem