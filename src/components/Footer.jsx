import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const links = [
    { text: 'Contact Us', url: '/contact' },
    { text: 'Terms and Conditions', url: '/terms' },
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Refund Policy', url: '/refund' },
    { text: 'Shipping and Returns', url: '/shipping' },
    { text: 'Shop', url: '/shop' }
  ];

  return (
    <footer className='p-4 font-mono tracking-widest bottom-0 w-full'>
      <div className='container justify-around mx-auto flex-row gap-6'>
        <p className='mb-5'>Follow us</p>
        <div className='flex gap-4 mb-24'>
          <FaInstagram size={20} className='cursor-pointer' />
          <FaTwitter size={20} className='cursor-pointer' />
          <FaYoutube size={20} className='cursor-pointer' />
        </div>

        <div className='text-sm flex gap-2'>
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>{link.text}</p>
              {index !== links.length - 1 && <span> | </span>}
            </React.Fragment>
          ))}
        </div>
        <p className='text-sm'>This is website is just for learning purpose.</p>
      </div>
    </footer >
  )
}

export default Footer;
