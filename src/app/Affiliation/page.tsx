"use client"
import Nav from '@/Components/Nav/Nav'
import PromoCodePage from '@/Components/PromoCode/PromoCode'
import React, { useState } from 'react';
import "../../../public/bodybackground.css"
import TypeWriter1 from '@/Components/TypeWriter/TypeWriter1'
import Footer from '@/Components/Footer/Footer';



/**
 * Renders the App component which displays the navigation, typewriter effect, promo code page, and footer.
 *
 * @return {ReactElement} The rendered App component.
 */

  const App: React.FC = () => {
  return (
    <div className='lily'>
      <div>
        <Nav />
        <TypeWriter1 />
        <PromoCodePage />
        <Footer/>
      </div>
    </div>
  )
}

export default App