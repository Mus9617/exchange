"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../public/style.css';
import login from '@/Services/login';
import { WavyBackground } from '../ui/wavy-background';
import Footer from '../Footer/Footer';
import { Typography } from '@mui/material';

/**
 * Renders a login form with email and password fields and a login button. 
 * On successful login, redirects the user to the home page after a delay.
 * On error, displays an error message.
 *
 * @return {JSX.Element} The login form component.
 */


const LoginUser: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<null | string>(null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const loginProps = { email, password };
            const response = await login(loginProps);
           
           if (!response) {
            return
           }
            if (response.status === 200 ) {
                toast.success('Login successful!');
                setTimeout(() => {
                    router.push('/Home');
                }, 3000);
            }
           
            
        } catch (error) {
            console.log(error,"ici");
            
            if (error instanceof Error) {
                
                setError(error.message);
                toast.error(error.message);
            } else {
                setError('An error occurred');
                toast.error('An error occurred');
            }
        }
    };

    return (
        <WavyBackground className="relative flex items-center justify-center min-h-screen">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <section className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <header className="mb-4">
                    <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Login
                    </h1>
                </header>
                <main>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                         <Typography>
            <a href="/register">Don't Have Account?</a>
          </Typography>
                    </form>
                    {error && (
                        <div className="text-red-500 mt-4">
                            {error}
                        </div>
                    )}
                </main>
                

                <ToastContainer
                    autoClose={3000}

                />
            </section>
            
        </WavyBackground>
        
    );
};

export default LoginUser;
