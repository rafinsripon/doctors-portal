import React from "react";
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section className="mt-52 lg:py-0 py-14"
    style={{
        backgroundImage: `url(${appointment})`
    }}
    >
      <div className="flex lg:flex-row flex-col items-center gap-8 lg:mt-32 mt-0 lg:px-20 px-4">
        <img
          className="-mt-32 hidden lg:block lg:w-1/2 rounded-xl shadow-xl"
          src={doctor}
          alt=""
        />
        <div className="lg:mt-0 mt-4">
            <h4 className="text-primary font-bold">Appointment</h4>
          <h2 className="lg:text-4xl md:text-3xl text-3xl font-bold text-white mt-4">
          Make an appointment Today
          </h2>
          <p className="font-semibold text-gray-200 mt-6">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
          </p>
          <PrimaryButton>APPOINMENT</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
