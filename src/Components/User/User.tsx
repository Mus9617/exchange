"use client";
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getAllCrypto } from '@/Services/crypto'; 
import { CryptoProps } from '@/Utils/type';
/**
 * Renders a TypeWriter component with a customized heading.
 *
 * @return {JSX.Element} The TypeWriter component.
 */
const Charts = () => {
  const [cryptoData, setCryptoData] = useState<CryptoProps[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCrypto();
        setCryptoData(data);
      } catch (error: any) { 
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cryptoData.length) {
    return <div>Loading...</div>;
  }

  const seriesData = cryptoData.map((crypto) => Number(crypto.value));
  const xAxisData = cryptoData.map((crypto) => crypto.name);

  return (
<div className="pt-4 pl-4">
  <h1 className="text-3xl font-bold mb-1">Crypto Current Price Chart</h1>
  <BarChart
    series={[{ data: seriesData }]}
    height={250}
    width={500}
    xAxis={[{ data: xAxisData, scaleType: 'band' }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  />
</div>
  )
}
export default Charts