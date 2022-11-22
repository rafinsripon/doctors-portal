import React from "react";
import { Link } from "react-router-dom";
import dental from "../../../assets/images/treatment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Dental = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-8 mt-32 lg:px-20 px-4">
      <img className="lg:w-[460px] md:w-full h-[570px] rounded-xl" src={dental} alt="" />
      <div className="lg:mt-0 mt-4">
        <h2 className="lg:text-5xl md:text-5xl text-3xl font-bold text-gray-900">
          Exceptional Dental Care, on Your Terms
        </h2>
        <p className="font-semibold text-gray-500 mt-10">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <PrimaryButton>GET STARTED</PrimaryButton>
      </div>
    </div>
  );
};

export default Dental;
