'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../public/style.css';
import { register as registerService } from '@/Services/register';
import { WavyBackground } from '../ui/wavy-background';
import Footer from '../Footer/Footer';
import { Typography } from '@mui/material';
import { SignUpFormProps } from '@/Services/uthprops';
import * as yup from 'yup';


// Here we gonna pass the Schema for yup to used in the useform.

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  pseudo: yup.string()
    .min(6, 'Pseudo must be at least 6 characters')
    .matches(/^[a-z]+$/, 'Pseudo must be all lowercase letters')
    .required('Pseudo is required'),
  city: yup.string().required('City is required'),
  email: yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup.string()
    .min(10, 'Password must be at least 10 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  promoCode: yup.string().notRequired(),
  age: yup.number()
    .required('Age is required')
    .typeError('Age must be a number'),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignUpFormProps>();
  const [error, setErrorState] = useState<null | string>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
    try {
      await validationSchema.validate(data, { abortEarly: false });

      const registerProps = {
        ...data,
        promoCode: data.promoCode || '', 
        age: Number(data.age),
      };

      console.log('Registering with props:', JSON.stringify(registerProps));

      const response = await registerService(registerProps);
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Registration successful!');
      setTimeout(() => {
        router.push('/Home');
      }, 3000);
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          setError(error.path as keyof SignUpFormProps, {
            type: 'manual',
            message: error.message,
          });
        });
      } else if (validationErrors instanceof Error) {
        setErrorState(validationErrors.message);
        toast.error(validationErrors.message);
      } else {
        setErrorState('An error occurred');
        toast.error('An error occurred');
      }
    }
  };

  return (
    <WavyBackground className="h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Create an account
        </h1>
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              errors={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors.lastName}
            />
            <InputField
              label="Pseudo"
              name="pseudo"
              register={register}
              errors={errors.pseudo}
            />
            <InputField
              label="City"
              name="city"
              register={register}
              errors={errors.city}
            />
            <InputField
              label="Your email"
              name="email"
              register={register}
              errors={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
              errors={errors.password}
            />
            <InputField
              label="Promo Code 🎉"
              name="promoCode"
              register={register}
              errors={errors.promoCode}
            />
            <InputField
              label="Age"
              name="age"
              type="number"
              register={register}
              errors={errors.age}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create Account
          </button>
          <Typography>
            <a href="/login" className='relative top-2'>Already Have Account?</a>
          </Typography>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
      <Footer />
    </WavyBackground>
  );
};

const InputField = ({
  label,
  name,
  register,
  errors,
  type = 'text',
}: {
  label: string;
  name: keyof SignUpFormProps;
  register: any;
  errors: any;
  type?: string;
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`bg-gray-50 border ${errors ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={label}
      />
      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </div>
  );
};

export default SignUp;
