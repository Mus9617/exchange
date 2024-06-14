import axios from 'axios';

interface LoginProps {
  email: string;
  password: string;
}

export async function login(loginProps: LoginProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
  const axiosConfig = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  const response = await axios.post(url, {
    email: loginProps.email,
    password: loginProps.password,
  }, axiosConfig);
  
  const token = response.data.access_token;
  const roleName = response.data.user.Role.name;


  localStorage.setItem('token', token);
  localStorage.setItem('userRole', roleName);

  return response;
}

export default login;
