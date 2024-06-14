import { CryptoProps } from '@/Utils/type'
import React from 'react'
import { ModalComponent } from '../Modals/Modal'

type ModalUpdateProps = {
  CryptoProps: CryptoProps
  setIsReloadNeeded: any
}
export const Card = ({ CryptoProps}: ModalUpdateProps) => {
  return (
    <div className="my-4 shadow-xl">
      <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mx-4">
        <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none  h-96 object-contain w-full">
          <img
            src={CryptoProps.image}
            alt="ui/ux review check rounded-t-md"
            className="rounded-t-xl object-cover w-full h-96"
          />
        </div>
        <div className="p-6">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {CryptoProps.name}
          </h4>
          <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
            CryptoMarket Value : {CryptoProps.value}$
          </p>
          <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
            CryptoMarket Volume: {CryptoProps.quantity} {CryptoProps.name}
          </p>{' '}
        </div>
        </div>
      </div>
  )
}