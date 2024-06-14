import { CryptoProps, Roles, AnimalUpdateOrInsertProps } from '@/Utils/type'
import axios from 'axios'



export async function getAllCrypto() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/all`;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await axios.get(url, axiosConfig);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptos:', error);
    throw new Error('Failed to fetch cryptos');
  }
}

export async function insertCrypto(animal: AnimalUpdateOrInsertProps) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/create`
  
    let userRole = 'USER'
  
    if (userRole === Roles.user) {
      console.log('is a user')
    }
    let axiosConfig = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axios
      .post(
        url,
        {
          name: animal.name,
          value: animal.value,
          boxId: animal.boxId,
          quantity: animal.quantity,
          image: animal.image,
        },
  
        axiosConfig
      )
      .then((res) => {
        return res
      })
      .catch((e) => {
        throw new Error(e)
      })
  }
