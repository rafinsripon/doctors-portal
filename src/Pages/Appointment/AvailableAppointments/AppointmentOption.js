import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatMent }) => {
  const { name, slots, price } = appointmentOption;
  return (
    <div className="card shadow-xl text-center mb-16">
      <div className="card-body">
        <h2 className="card-title justify-center font-bold text-primary">
          {name}
        </h2>
        <p className="font-semibold">
          {slots.length > 0 ? slots[0] : "Try Another Day"}
        </p>
        <p className="font-semibold">
          {slots.length} {slots.length > 0 ? "Spaces" : "Space"} Available
        </p>
        <p>price: {price}</p>
        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            htmlFor="booking-modal"
            onClick={() => setTreatMent(appointmentOption)}
            className="btn border-none rounded-none inline-flex items-center font-semibold tracking-wider transition-colors duration-200 hover:text-teal-accent-700 bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-8 mt-10 text-gray-100 cursor-pointer"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
