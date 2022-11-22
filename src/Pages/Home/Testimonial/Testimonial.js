import React from "react";

const Testimonial = ({review}) => {
    const {name, reviews, location, img} = review;
  return (
    <blockquote className="rounded-lg shadow-xl p-8 py-10">
      <p className=" text-gray-500">
        {reviews}
      </p>
      <div className="flex items-center mt-4">
        <img
          alt="Man"
          src={img}
          className="h-16 w-16 rounded-full object-cover border-2 border-primary"
        />

        <div className="ml-4">
          <div className="flex justify-center gap-0.5 text-green-500">
            <p className="mt-1 text-lg font-medium text-gray-700">{name}</p>
          </div>
          <p>{location}</p>
        </div>
      </div>
    </blockquote>
  );
};

export default Testimonial;
