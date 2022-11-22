import React from 'react';

const Service = ({service}) => {
    const {name, description, img} = service;
    return (
        <div className='text-center p-8 shadow-xl rounded-xl'>
            <img className='mx-auto' src={img} alt="" />
            <h2 className='mt-4 font-bold text-xl'>{name}</h2>
            <p className='font-bold mt-4 text-gray-400'>{description}</p>
        </div>
    );
};

export default Service;