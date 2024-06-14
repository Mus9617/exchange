import React from 'react'
import { Children } from 'react';

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-10/12 mx-auto flex items-center flex-wrap">
      {children}
    </div>
  )
}