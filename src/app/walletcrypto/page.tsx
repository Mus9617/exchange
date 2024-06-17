import Nav from '@/Components/Nav/Nav'
import UserAssetsTrade from '@/Components/UserAsset/UserAssetsTrade'
import React from 'react'
import "../../../public/body.css"
import Footer from '@/Components/Footer/Footer'
import TypeWriterWallet from '@/Components/TypeWriter/TypeWriter3'

const walletCrypto = () => {
  return (
    <div className='lily1'>
        <Nav />
        <TypeWriterWallet />
        <UserAssetsTrade />
        <Footer />
    </div>
  )
}

export default walletCrypto