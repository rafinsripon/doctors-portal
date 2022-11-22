import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  const [treatment, setTreatMent] = useState(null);
  const date = format(selectedDate, 'PP');

  const {data : appointmentOptions = [], refetch, isLoading} = useQuery({
    queryKey: ['appointmentOptions', date],
    queryFn: async() => {
      const res = await fetch(`https://doctors-portal-server-mocha.vercel.app/appointmentOptions?date=${date}`)
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading />
  }

  return (
    <section className="mt-24 px-6">
      <p className="font-bold text-primary pl-6 text-center">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 mb-24">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatMent={setTreatMent}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal 
        selectedDate={selectedDate} 
        treatment={treatment} 
        setTreatMent={setTreatMent}
        refetch ={refetch}/>
        
      )}
    </section>
  );
};

export default AvailableAppointments;
