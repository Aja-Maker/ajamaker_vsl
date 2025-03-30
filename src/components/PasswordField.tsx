'use client'

import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Icon } from '@iconify/react'

interface PasswordFieldProps {
  name: string
  label?: string
  register: UseFormRegister<any>
  error?: string
}

export default function PasswordField({
  name,
  label = 'Contraseña nueva',
  register,
  error
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-1 relative">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={show ? 'text' : 'password'}
          {...register(name)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <Icon icon={show ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
