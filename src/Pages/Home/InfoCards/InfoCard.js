import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, icon, bgClass} = card;
    return (
        <div className={`flex lg:flex lg:flex-row flex-col md:flex-row items-center text-center lg:text-start gap-4 p-8 rounded-xl ${bgClass}`}>
            <img className='w-20' src={icon} alt="" />
            <div>
                <h2 className='text-2xl font-bold text-white'>{name}</h2>
                <p className='font-semibold text-white'>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;