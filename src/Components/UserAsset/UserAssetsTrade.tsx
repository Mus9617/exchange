'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { UserAssets } from '@/Services/userTrades';


const UserAssetsTrade: React.FC = () => {
  const [assets, setAssets] = useState<UserAssets | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [tradeAmount, setTradeAmount] = useState<{ [key: string]: number }>({});
  const [showContent, setShowContent] = useState(false);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${process.env.NEXT_PUBLIC_API_URL}/user/my-assets`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, config);
        setAssets(response.data);
      } catch (err) {
        setError('Failed to fetch assets');
        toast.error('Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleTrade = (cryptoId: string, cryptoName: string, amount: number) => {
    const tradeAmountValue = tradeAmount[cryptoId] || 0;
    toast.success(`Congratulations! You just bought ${tradeAmountValue} coins of ${cryptoName}`);
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="lily1 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">MY WALLET</h1>
        {assets && (
          <>
            <div className="text-center mb-8">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={toggleContent}
              >
                {showContent ? 'Hide Assets' : 'View Assets'}
              </button>
            </div>
            {showContent && (
              <Slider {...settings}>
                {assets.UserHasCrypto.map(({ Crypto, amount }) => (
                  <div key={Crypto.id} className="p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9">
                        <img src={Crypto.image} alt={Crypto.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">{Crypto.name}</h2>
                        <p className="text-gray-700">Quantity: {amount}</p>
                        <p className="text-gray-700">Value: ${Crypto.value.toFixed(2)}</p>
                        <input
                          type="range"
                          min="0"
                          max={amount}
                          value={tradeAmount[Crypto.id] || 0}
                          onChange={(e) => setTradeAmount({ ...tradeAmount, [Crypto.id]: parseInt(e.target.value, 10) })}
                          className="w-full mt-4"
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 w-full"
                          onClick={() => handleTrade(Crypto.id, Crypto.name, amount)}
                        >
                          Trade
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default UserAssetsTrade;
