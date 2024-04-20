import React from 'react';
import men from '../assets/img/men.jpg';
import women from '../assets/img/women.jpg';

const Body = () => {
  return (
    <div className='flex mt-10 mb-10 font-mono justify-center tracking-widest gap-6'>
      <div className='w-[44.2%] h-2/6 relative'>
        <img src={women} alt="for her" className="object-cover cursor-pointer" />
        <div className="absolute top-2/3 left-0 w-full text-center text-2xl text-white p-2">for her</div>
      </div>
      <div className='w-[44.2%] h-2/6 relative'>
        <img src={men} alt="for him" className="object-cover cursor-pointer" />
        <div className="absolute top-2/3 left-0 w-full text-center text-2xl text-white p-2">for him</div>
      </div>
    </div>
  );
}

export default Body;
