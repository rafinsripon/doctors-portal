import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ treatment,setTreatMent, selectedDate, refetch }) => {
  //treatment is a just another name of appointmentsOptions with, name, slots, id
  const { name: treatmentName, slots, price } = treatment; 
  const date = format(selectedDate, "PP");
  const {user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: treatmentName,
      patient: name,
      slot,
      email,
      price,
      phone,
      // time: new Date().toLocaleTimeString()
    }

    fetch('https://doctors-portal-server-mocha.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        setTreatMent(null)
        toast.success('Booking Confirm')
        refetch();
      }else{
        toast.error(data.message)
      }
    })

  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              value={date}
              disabled
              className="input w-full mt-6 border-2 text-gray-800 font-bold bg-gray-300 border-gray-300"
            />

            <select name="slot" className="select border-2 mt-6 border-gray-300 w-full">

              {slots.map((slot, index) => (
                <option 
               key={index}
                defaultValue={slot}
                > {slot} </option>
              ))}

            </select>

            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full mt-6 border-2 border-gray-300"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Your Email Address"
              className="input w-full mt-6 border-2 border-gray-300"
            />
            <input
              name="phone"
              type="text"
              placeholder="Your Phone Number"
              className="input w-full mt-6 border-2 border-gray-300"
            />
            <input
              className="w-full rounded-md btn btn-secondary mt-6"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
