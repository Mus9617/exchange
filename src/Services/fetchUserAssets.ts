
import axios from 'axios';

export async function fetchUserAssets() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/users-assets`;
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(url, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
}
