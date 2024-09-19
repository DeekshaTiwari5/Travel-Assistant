import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[40px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h2>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator,creating custom itineraies
        tailored to your interesrs and budget.
      </p>
      <div className="text-center mt-2">
        <Link to={"/create-trip"}>
          <Button>Get Started,It's Free</Button>
        </Link>
        <img
          src="/landingpage.png"
          className="-mt-20gap-8text-center mt-16 my-20 "
        />
      </div>
    </div>
  );
}

export default Hero