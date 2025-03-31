'use client'

import { UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<any>
  error?: string
}

export default function ContractCheckbox({ register, error }: Props) {
  return (
    <div className="flex items-start space-x-2 mt-4">
      <input
        id="contractAccepted"
        type="checkbox"
        {...register('contractAccepted')}
        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="contractAccepted" className="text-sm text-gray-700">
        Acepto el{' '}
        <a
          href="https://ajamaker.com/member-contract"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          contrato de membresía
        </a>
        .
      </label>
      {error && <p className="text-xs text-red-500 ml-6">{error}</p>}
    </div>
  )
}
