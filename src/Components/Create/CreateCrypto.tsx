"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
/**
 * Sends a POST request to create a new crypto asset with the provided name, value, quantity, and image.
 *
 * @param {string} name - The name of the crypto asset.
 * @param {number} value - The value of the crypto asset.
 * @param {number} quantity - The quantity of the crypto asset.
 * @param {string} image - The image URL of the crypto asset.
 * @return {Promise<void>} A Promise that resolves when the crypto asset is created successfully, or rejects with an error.
 */
const createCrypto = async (name: string, value: number, quantity: number, image: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/crypto/create`,
      { name, value, quantity, image },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    alert("Crypto created successfully!");
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
 * A React functional component that renders a form for creating a crypto asset.
 *
 * @return {JSX.Element} The JSX element representing the component.
 */


const CreateCrypto: React.FC = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      await createCrypto(name, value, quantity, image);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="bg-white">
      {isAdmin && (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="show-form-button bg-blue-500 text-white p-2 rounded fixed right-4 bottom-4 z-50">
            {showForm ? "Hide Form 🥮" : "Crypto Create"}
          </button>
          {showForm && (
            <div className="create-crypto-form fixed right-4 bottom-16 p-4 w-80 shadow-md rounded-md bg-white z-40">
              <h1 className="text-xl font-bold text-center mb-4">Create Your Crypto Coin 👇</h1>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block mb-1">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter crypto name"
                  />
                </div>
                <div>
                  <label className="block mb-1">Value of your coin:</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter crypto value"
                  />
                </div>
                <div>
                  <label className="block mb-1">Total Coins you want to trade:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter crypto quantity"
                  />
                </div>
                <div>
                  <label className="block mb-1">Image:</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter crypto image URL"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
                  Create Crypto
                </button>
                {error && <div className="mt-2 text-red-600">{error}</div>}
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateCrypto;
