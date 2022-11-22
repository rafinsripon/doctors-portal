import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="block items-center font-semibold tracking-wider transition-colors duration-200 hover:text-teal-accent-700 bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-8 mt-10 text-gray-100">
            {children}
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
        </button>
    );
};

export default PrimaryButton;