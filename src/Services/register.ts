import axios from 'axios';

interface RegisterProps {
  firstName: string;
  lastName: string;
  pseudo: string;
  city: string;
  email: string;
  password: string;
  promoCode: string;
  age: number;
}

export async function register(registerProps: RegisterProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}`;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  try {
    return await axios.post(`${url}/auth/signup`, {
      firstName: registerProps.firstName,
      lastName: registerProps.lastName,
      pseudo: registerProps.pseudo,
      city: registerProps.city,
      email: registerProps.email,
      password: registerProps.password,
      promoCode: registerProps.promoCode,
      age: registerProps.age, 
    }, axiosConfig);
  } catch (error) {
   
    throw error;
  }
}
