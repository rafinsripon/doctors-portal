import React from "react";
import banner from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {

  return (
    <div className="overflow-hidden banner-img">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 lg:px-8 lg:py-28">
        <div className="flex lg:flex-col items-center justify-between xl:flex-row flex-col-reverse">
          <div>
            <DayPicker
              mode="single"
              selected={selectedDate} 
              onDayClick={setSelectedDate}
            />
          </div>
          <div className="w-full max-w-xl">
            <div className="relative">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
              >
                <defs>
                  <pattern
                    id="766323e1-e594-4ffd-a688-e7275079d540"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                  width="52"
                  height="24"
                />
              </svg>
              <div className="relative">
                <img
                  className="w-[594px] h-[355px]"
                  src={banner}
                  alt="Img Not Found"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
