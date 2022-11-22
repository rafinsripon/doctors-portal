import React from "react";
import quote from "../../../assets/icons/quote.svg";
import avater1 from "../../../assets/images/people1.png";
import avater2 from "../../../assets/images/people2.png";
import avater3 from "../../../assets/images/people3.png";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      reviews:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deseruntvoluptatem alias ut provident sapiente repellendus.",
      location: "California",
      img: avater1,
    },
    {
      _id: 2,
      name: "Denney Mario",
      reviews:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deseruntvoluptatem alias ut provident sapiente repellendus.",
      location: "Newyeok",
      img: avater2,
    },
    {
      _id: 3,
      name: "Holi Json",
      reviews:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deseruntvoluptatem alias ut provident sapiente repellendus.",
      location: "Dk Khatar",
      img: avater3,
    },
  ];
  return (
    <section className="mt-24 lg:px-0 px-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary font-bold text-lg">Testimonial</p>
          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            What Our Patients Says
          </h2>
        </div>
        <figure>
          <img className="lg:w-40 w-24 " src={quote} alt="" />
        </figure>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-16">
        {
            reviews.map(review => <Testimonial 
            key={review._id}
            review={review}/>)
        }
      </div>
    </section>
  );
};

export default Testimonials;
