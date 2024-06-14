'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../public/OffersList.css';

interface Trade {
  Giver: {
    pseudo: string;
  };
  Receiver: {
    pseudo: string;
  };
  Crypto: {
    name: string;
  };
  quantity: number;
  created_at: string;
}

interface ApiErrorResponse {
  message: string;
}

async function fetchTrades(): Promise<Trade[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/trade/all`;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.get<Trade[]>(url, axiosConfig);
    return response.data;
  } catch (error) {
    handleFetchError(error as AxiosError<ApiErrorResponse>);
    return []; 
  }
}

function handleFetchError(error: AxiosError<ApiErrorResponse>) {
  console.error('Error fetching trades:', error);
  toast.error('Failed to fetch trades');
}

function transformTradeData(trades: Trade[]): { giverPseudo: string; receiverPseudo: string; cryptoName: string; quantity: number; created_at: string }[] {
  return trades.map((trade) => ({
    giverPseudo: trade.Giver.pseudo,
    receiverPseudo: trade.Receiver.pseudo,
    cryptoName: trade.Crypto.name,
    quantity: trade.quantity,
    created_at: trade.created_at,
  }));
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

async function fetchUserDetails(): Promise<{ role: string }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/details`;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.get<{ role: string }>(url, axiosConfig);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { role: '' }; 
  }
}

export function HistoricTrades(): JSX.Element {
  const [trades, setTrades] = useState<{ giverPseudo: string; receiverPseudo: string; cryptoName: string; quantity: number; created_at: string }[]>([]);
  const [showTrades, setShowTrades] = useState(false);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    fetchTrades()
      .then(transformTradeData)
      .then(setTrades);

    fetchUserDetails()
      .then(userDetails => setRole(userDetails.role));
  }, []);

  return (
    <div>
      {role === 'admin' && (
        <button onClick={() => setShowTrades(!showTrades)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {showTrades ? 'Hide Trades' : 'Show Trades'}
        </button>
      )}
      {showTrades && (
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">Historic Trades 📊</h1>
          <Slider {...sliderSettings}>
            {trades.map((trade) => (
              <div key={trade.created_at} className="p-4">
                <div className="bg-white rounded shadow-md p-4 flex flex-col justify-between items-center">
                  <div>
                    <span className="block text-lg font-semibold">{trade.cryptoName} 🪙</span>
                    <span className="block text-gray-500">Quantity: {trade.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="block text-gray-500">Giver: {trade.giverPseudo}</span>
                    <span className="block text-gray-500">Receiver: {trade.receiverPseudo}</span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-gray-500">Date: {trade.created_at}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default HistoricTrades;