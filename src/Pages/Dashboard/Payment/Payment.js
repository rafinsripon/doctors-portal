import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

//Payment
const Payment = () => {
  const booking = useLoaderData();
  const { treatment, price, appointmentDate, slot } = booking;


  return (
    <div>
      <h3 className="text-3xl font-bold uppercase text-primary mt-8">
        Payment for {treatment}
      </h3>
      <p className="text-xl text-bold mt-2">
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>
      <div className="w-96 mt-8 border-8 border-cyan-100 p-4">
        <Elements stripe={stripePromise}>
          <CheckoutForm 
          booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
