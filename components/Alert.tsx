
import React from 'react';
import { InfoIcon } from './icons.tsx';

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="bg-yellow-100 border-r-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md flex items-center" role="alert">
      <div className="ml-3">
        <InfoIcon />
      </div>
      <div>
        <p className="font-bold">تنبيه هام</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Alert;