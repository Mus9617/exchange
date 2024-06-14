"use client"
import React, { useState } from 'react';
import Nav from '@/Components/Nav/Nav';
import SearchBar from '@/Components/Research/Research';
import TypeWriter from '@/Components/TypeWriter/TypeWriter';
import Charts from '@/Components/User/User';
import CreateCrypto from '@/Components/Create/CreateCrypto';
import OffersList from '@/Components/Exchange/Exchange';
import '../../../public/bodybackground.css';
import CryptoList from "@/Components/Buy/Buy"

/**
 * Renders the UserPage component.
 *
 * @return {JSX.Element} The rendered UserPage component.
 */
const UserPage = () => {
  const [showOffers, setShowOffers] = useState(false);

  return (
    <div className='lily3'>
    <div >
      <Nav />
      <TypeWriter />
      <SearchBar />
   
      <div className="exchange-container">
        <button 
          onClick={() => setShowOffers(!showOffers)} 
          className="show-offers-button bg-blue-500 text-white p-2 rounded fixed right-4 bottom-20 z-50">
          {showOffers ? "Hide Trade Offers 🚀" : "Show Trade Offers 🚀"}
        </button>
        {showOffers && <OffersList />}
        <CreateCrypto />
      </div>
      <Charts />
      <CryptoList />
      </div>
    </div>
  );
};

export default UserPage;