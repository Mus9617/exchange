import React from 'react';
import ContactUser from '@/Components/Contact/contact';
import Nav from '@/Components/Nav/Nav';
import "../../../public/body.css"

const ContactPage = () => {
  return (
    <div className='lily1'>
      <Nav />
      <ContactUser />
    </div>
  );
};

export default ContactPage;