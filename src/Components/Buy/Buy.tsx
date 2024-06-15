"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../public/buy.css'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllCrypto } from '@/Services/crypto';
import { ApiErrorResponse, Crypto } from '../../Services/buycrypto';



export function CryptoList(): JSX.Element {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [buyValues, setBuyValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchCryptos();
  }, []);

  async function fetchCryptos() {
    try {
      const cryptosData = await getAllCrypto();
      setCryptos(cryptosData);
    } catch (error) {
      handleFetchError(error as AxiosError<ApiErrorResponse>);
    }
  }
/**
 * Handles the buy operation for a given crypto.
 *
 * @param {Crypto} crypto - The crypto to be bought.
 * @return {Promise<void>} - A promise that resolves when the buy operation is complete.
 * @throws {AxiosError<ApiErrorResponse>} - If there is an error during the buy operation.
 */

async function handleBuy(crypto: Crypto) {
  try {
    const amount = parseFloat(buyValues[crypto.id]);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!Number.isFinite(amount)) {
      toast.error('Invalid amount. Please enter a numeric value.');
      return;
    }

    const response = await buyCrypto(crypto.id, amount);
    toast.success(`Successfully bought ${crypto.name} with amount ${amount}`);
  } catch (error) {
    handleBuyError(error as AxiosError<ApiErrorResponse>);
  }
}
  /**
 * Sends a request to the server to buy a cryptocurrency with the specified amount.
 *
 * @param {string} id_crypto - The ID of the cryptocurrency to buy.
 * @param {number} amount - The amount of the cryptocurrency to buy.
 * @return {Promise<AxiosResponse>} A promise that resolves with the server's response to the buy request.
 * @throws {AxiosError} If there is an error with the request.
 */
  async function buyCrypto(id_crypto: string, amount: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/buy`;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const data = {
      id_crypto,
      amount,
    };

    const response = await axios.post(url, data, axiosConfig);
    return response;
  }

  function handleFetchError(error: AxiosError<ApiErrorResponse>) {
    console.error('Error fetching cryptos:', error);
    toast.error('Failed to fetch cryptos');
  }

  function handleBuyError(error: AxiosError<ApiErrorResponse>) {
    console.error('Error buying crypto:', error);
    toast.error(`Failed to buy crypto: ${error.response?.data?.message || error.message}`);
  }
  /**
   * Updates the buyValues state with the new value for the given id.
   *
   * @param {string} id - The id of the value to update.
   * @param {string} amount - The new value for the given id.
   * @return {void} This function does not return anything.
   */
  function handleValueChange(id: string, amount: string) {
    setBuyValues((prevValues) => ({
      ...prevValues,
      [id]: amount,
    }));
  }

  const settings = {
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

  return (
    <div className="crypto-list-container">
      <h1 className="title text-2xl font-bold text-center mb-6">Exchange 🚀</h1>
      <Slider {...settings}>
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-card p-4">
            <div className="card-content rounded-lg shadow-md p-4 flex flex-col justify-between items-center">
              <div>
                <span className="crypto-name block text-lg font-semibold">{crypto.name} 🥮</span>
                <span className="crypto-details block text-gray-500">Market Volume: {crypto.quantity} Coins | Coin Price: {crypto.value}$</span>
              </div>
              <div className="buy-section flex items-center space-x-4 mt-4">
                <input
                  className="input-field border border-gray-300 rounded p-2"
                  type="number"
                  value={buyValues[crypto.id] || ''}
                  onChange={(e) => handleValueChange(crypto.id, e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
                <button
                  className="buy-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleBuy(crypto)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <ToastContainer />
    </div>
  );
}

export default CryptoList;
