import React from "react";
import contactImg from '../../../assets/images/appointment.png'
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const ContactUs = () => {
  return (
    <section className="mt-24"
    style={{
        backgroundImage: `url(${contactImg})`
    }}
    >
      <div className="text-center pt-10">
        <p className="font-bold text-lg text-primary">Contact Us</p>
        <h2 className="text-4xl font-bold text-white">
          Stay connected with us
        </h2>
      </div>
      <div className="p-6 dark:text-gray-100 mt-8">
        <form
          className="container w-full max-w-xl p-8 mx-auto space-y-6"
        >
          <div>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="block w-full p-3 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-100"
            />
          </div>
          <div>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              required
              className="block w-full p-3 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-100"
            />
          </div>
          <div>
            <textarea
              id="message"
              type="text"
              placeholder="Message..."
              className="block w-full h-32 p-3 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-100"
            ></textarea>
          </div>
          <div className="text-center">
            <PrimaryButton className='mt-[4px]'>Submit</PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
