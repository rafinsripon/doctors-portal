import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, email, patient, _id } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://doctors-portal-server-mocha.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess('')
    setProcessing(true)
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patient,
              email: email
            },
          },
        },
      );
      if(confirmError){
        setCardError(confirmError.message)
        return;
      }
      if(paymentIntent.status === "succeeded"){
        //payment store database
        const payment = {
            price,
            transactionId: paymentIntent.id,
            email,
            bookingId: _id
        }
        fetch('https://doctors-portal-server-mocha.vercel.app/payments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                setSuccess('Congrats! Your payment Complate');
                setTransactionId(paymentIntent.id);
            }
        })
    }
    setProcessing(false)

  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary px-12 text-white btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-rose-600">{cardError}</p>
      {
        success && <div>
            <p className="text-green-600 font-bold">{success}</p>
            <p className="text-accent font-bold">Your Transaction ID: <span className="text-green-600">{transactionId}</span></p>
        </div>
      }
    </>
  );
};

export default CheckoutForm;
