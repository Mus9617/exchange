"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../public/OffersList.css';
import { ApiErrorResponse, Offer } from '../../Services/exchange';


/**
 * Renders a list of trade offers with a slider and buy functionality.
 *
 * @return {JSX.Element} The JSX element containing the trade offers.
 */

export function OffersList(): JSX.Element {
  const [offers, setOffers] = useState<{ pseudo: string; amount: number; cryptoName: string }[]>([]);
  const [buyValues, setBuyValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const offersData = await getAllOffers();
      setOffers(offersData);
    } catch (error) {
      handleFetchError(error as AxiosError<ApiErrorResponse>);
    }
  }

  /**
   * Retrieves all offers from the API and modifies the data structure.
   *
   * @return {Promise<{ pseudo: string; amount: number; cryptoName: string }[]>} A promise that resolves to an array of modified offers.
   */

  
  async function getAllOffers(): Promise<{ pseudo: string; amount: number; cryptoName: string }[]> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/offer/all`;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.get<Offer[]>(url, axiosConfig);

    const modifiedOffers = response.data.map((offer) => ({
      pseudo: offer.User.pseudo,
      amount: offer.amount,
      cryptoName: offer.Crypto.name,
    }));

    return modifiedOffers;
  }

/**
 * Handles the creation of a trade by sending a request to the server.
 *
 * @param {string} id_offer - The ID of the offer to create a trade for.
 * @return {Promise<void>} A promise that resolves when the trade is successfully created.
 * @throws {AxiosError<ApiErrorResponse>} If there is an error creating the trade.
 */
  
  async function handleCreateTrade(id_offer: string) {
    try {
      const response = await createTrade(id_offer);
      console.log('Create trade response:', response.data);
      toast.success(`Successfully created trade for offer ID: ${id_offer}`);
    } catch (error) {
      handleCreateError(error as AxiosError<ApiErrorResponse>);
    }
  }

  /**
   * Creates a trade by sending a POST request to the server with the specified offer ID.
   *
   * @param {string} id_offer - The ID of the offer to create a trade for.
   * @return {Promise<any>} A promise that resolves to the response data from the server.
   */

  async function createTrade(id_offer: string): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/trade/create`;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const data = new URLSearchParams();
    data.append('id_offer', id_offer);

    const response = await axios.post(url, data, axiosConfig);
    return response.data;
  }

  /**
   * Handles the fetch error when fetching offers.
   *
   * @param {AxiosError<ApiErrorResponse>} error - The error object that occurred during fetching.
   */


  function handleFetchError(error: AxiosError<ApiErrorResponse>) {
    console.error('Error fetching offers:', error);
    toast.error('Failed to fetch offers');
  }

  function handleCreateError(error: AxiosError<ApiErrorResponse>) {
    console.error('Error creating trade:', error);
    toast.error(`Failed to create trade: ${error.response?.data?.message || error.message}`);
  }

  const handleValueChange = (cryptoId: string, value: string) => {
    setBuyValues({ ...buyValues, [cryptoId]: value });
  };

  const handleBuy = (crypto: { name: string; id: string }) => {
    if (buyValues[crypto.id]) {
      handleCreateTrade(crypto.id);
    } else {
      toast.error('Please enter a value to buy');
    }
  };

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
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Trade Offers 🚀</h1>
      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.cryptoName} className="p-4">
            <div className="bg-white rounded shadow-md p-4 flex flex-col justify-between items-center">
              <div>
                <span className="block text-lg font-semibold">{offer.cryptoName} 🥮</span>
                <span className="block text-gray-500">Coin Ammount: {offer.amount}</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <span className="block text-gray-500">Offered by: {offer.pseudo}</span>
                <input
                  className="border border-gray-300 rounded p-2"
                  type="number"
                  value={buyValues[offer.cryptoName] || ''}
                  onChange={(e) => handleValueChange(offer.cryptoName, e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleBuy({ name: offer.cryptoName, id: offer.cryptoName })}
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
};

export default OffersList;