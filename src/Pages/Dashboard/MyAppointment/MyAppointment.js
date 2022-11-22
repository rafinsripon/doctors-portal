import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyAppointment = () => {
    const {user} = useContext(AuthContext);
    const url = `https://doctors-portal-server-mocha.vercel.app/bookings?email=${user?.email}`
    const {data : bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data)
            return data;
        }
    })
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Appoinments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map((booking, i) => <tr key={booking._id}>
                  <th>{i + 1}</th>
                  <td>{booking.patient}</td>
                  <td>{booking.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                  <td>
                    {
                      booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-sm btn-primary text-white">pay</button>
                      </Link>
                    }
                    {
                      booking.price && booking.paid && <span className="text-green-600">
                        paid
                      </span>
                    }
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
