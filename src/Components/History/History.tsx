"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../public/Research.css"
import {
  Container,
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface CryptoHistoryProps {
  cryptoId: string;
}

interface HistoryData {
  updated_at: string;
  created_at: string
  value: number;
}
/**
 * Renders a component that displays the historical data of a cryptocurrency.
 *
 * @param {CryptoHistoryProps} props - The props object containing the cryptoId.
 * @param {string} props.cryptoId - The ID of the cryptocurrency.
 * @return {JSX.Element} The component that displays the historical data.
 */
const CryptoHistory: React.FC<CryptoHistoryProps> = ({ cryptoId }) => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [showChart, setShowChart] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/history/${cryptoId}`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, config);
        setHistoryData(response.data);
      } catch (err) {
        setError('Failed to fetch historical data');
      } finally {
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, [cryptoId]);

  /**
   * Toggles the showChart state by flipping its boolean value.
   *
   * @return {void} This function does not return anything.
   */
  const toggleShowChart = () => {
    setShowChart(!showChart);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', mt: 4 }}>{error}</Box>;
  }

  const chartData = {
    labels: historyData.map((data) =>
      new Date(data.updated_at).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Price',
        data: historyData.map((data) => data.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }} className='micro2'>
      <Button variant="outlined" onClick={toggleShowChart} >
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </Button>
      {showChart && (
        <>
          <Line data={chartData} options={options} className='crypto-chart' /> 
          <Button variant="outlined" onClick={toggleShowChart}>
            Close Chart
          </Button>
        </>
      )}
    </Container>
  );
};

export default CryptoHistory;
