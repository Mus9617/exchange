
import CryptoHistory from '@/Components/CryptoList/CryptoList'
import Nav from '@/Components/Nav/Nav'
import SearchBar from '@/Components/Research/Research'

import React from 'react'
import "../../../public/body.css"
import TypeWriter2 from '@/Components/TypeWriter/TypeWriter2'
import UserAssets from '@/Components/UserAsset/UserAsset'
import HistoricTrades from '@/Components/HistoricTrades/HisstoricTrades'



const Asset = () => {
  return (
    <div className='lily1'>
        <Nav />
        <TypeWriter2 />
     <SearchBar />
     <HistoricTrades />
     <UserAssets />
      <CryptoHistory />
      </div>

  )
}

export default Asset