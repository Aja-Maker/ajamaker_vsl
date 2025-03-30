'use client'

import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';
import { Icon } from '@iconify/react';
import TooltipIcon from './utils/TooltipIcon'

interface InputFieldProps<T extends Record<string, any>> {
  name: Path<T>;
  label: React.ReactNode | string;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  infoText?: string;
}

const InputField = <T extends Record<string, any>>({
  name,
  label,
  register,
  type = 'text',
  placeholder,
  disabled = false,
  infoText,
}: InputFieldProps<T>) => {
  return (
    <div className="relative w-full">
      <label htmlFor={name} className="mb-1 flex items-center text-sm font-medium text-gray-700">
        {label}
        {infoText && (
          <TooltipIcon id={`tooltip-${name}`} content={infoText} />
        )}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder ?? ''}
        disabled={disabled}
        {...register(name)}
        className={`
          mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 
          placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60
        `}
      />
    </div>
  );
};

export default InputField;
