'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * Creates a promo code with the given name and value by making a POST request to the server.
 *
 * @param {string} name - The name of the promo code.
 * @param {number} value - The value of the promo code.
 * @return {Promise<void>} A Promise that resolves when the promo code is created successfully, or rejects with an error.
 */
const createPromoCode = async (name: string, value: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/promoCode/create`,
            { name, value },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        console.log(response.data);
        toast.success("Promo code created successfully!");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error response:", error.response?.data);
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

/**
 * Fetches promo codes from the server.
 *
 * @return {Promise} A Promise that resolves with the fetched promo codes data or rejects with an error.
 */
const fetchPromoCodes = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/promoCode/all`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error response:", error.response?.data);
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

/**
 * Renders a page for creating and managing promo codes.
 *
 * @return {ReactElement} The rendered promo code page.
 */
const PromoCodePage: React.FC = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState<number>(0);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [promoCodes, setPromoCodes] = useState<{ name: string; value: number }[]>([]);
    const [showPromoCodes, setShowPromoCodes] = useState(false);
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setRole(role);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (value > 10) {
            setError("Contact Bros Coin To Get More Boost");
            return;
        }
        try {
            await createPromoCode(name, value);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleShowPromoCodes = async () => {
        setError("");
        try {
            const data = await fetchPromoCodes();
            setPromoCodes(data);
            setShowPromoCodes(!showPromoCodes); 
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="lily">
          <div className="max-w-md p-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Why you need to join Affiliation Program?</h1>
            <p className="mb-4">
              Creating a promo code is a great way to invite users and offer them a 10% bonus on their registration money. As a user who invites others, you'll also receive a 1% boost per client you invite. This is a fantastic opportunity to grow the Bros Coin community and benefit from it!
            </p>
            {role === 'admin' ? (
              <>
                {showForm ? (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white p-2 rounded mb-4 mr-4"
                  >
                    Hide Form 🥮
                  </button>
                ) : (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white p-2 rounded mb-4 mr-4"
                  >
                    Create Promo Code🎟️
                  </button>
                )}
                {showPromoCodes ? (
                  <button
                    onClick={handleShowPromoCodes}
                    className="bg-green-500 text-white p-2 rounded mb-4"
                  >
                    Hide Promo Codes 🥮
                  </button>
                ) : (
                  <button
                    onClick={handleShowPromoCodes}
                    className="bg-green-500 text-white p-2 rounded mb-4"
                  >
                    Show All Promo Codes🎫
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => toast.info("Please contact us for more information.")}
                className="bg-yellow-500 text-white p-2 rounded mb-4 relative -center"
              >
                Contact Us
              </button>
            )}
            {showForm && (
              <div className="p-4 w-full max-w-sm shadow-md rounded-md bg-white">
                <h2 className="text-xl font-bold text-center mb-4">Create a Promo Code</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block mb-1">Promo Code Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter promo code name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Max Boost 10%:</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter promo code value"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
                    Create Promo Code 
                  </button>
                  {error && <div className="mt-2 text-red-600">{error}</div>}
                </form>
              </div>
            )}
            {showPromoCodes && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">
                Existing Promo Codes</h2>
                <ul className="space-y-2">
                  {promoCodes.map((promo, index) => (
                    <li key={index} className="p-2 border border-gray-300 rounded">
                      <span className="font-bold">{promo.name}</span>: Boost Value  {promo.value}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ToastContainer />
          </div>
        </div>
      );
    };
    
    export default PromoCodePage;
