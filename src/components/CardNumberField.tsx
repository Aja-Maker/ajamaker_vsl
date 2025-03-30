'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

interface CardInputProps {
  name: string
  value?: string
  onChange: (value: string) => void
  error?: string
}

type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown'

const detectCardType = (number: string): CardType => {
  if (/^4[0-9]{0,}$/.test(number)) return 'visa'
  if (/^5[1-5][0-9]{0,}$/.test(number)) return 'mastercard'
  if (/^3[47][0-9]{0,}$/.test(number)) return 'amex'
  return 'unknown'
}

const formatCardNumber = (value: string, type: CardType) => {
  const cleaned = (value || '').replace(/\D/g, '')
  if (type === 'amex') {
    return cleaned.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => {
      return [a, b, c].filter(Boolean).join(' ')
    })
  }
  return cleaned.replace(/(.{4})/g, '$1 ').trim()
}

export default function CardNumberField({ name, value, onChange, error }: CardInputProps) {
  const [cardType, setCardType] = useState<CardType>('unknown')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const type = detectCardType(raw)
    setCardType(type)

    const maxLength = type === 'amex' ? 15 : 16
    onChange(raw.slice(0, maxLength))
  }

  return (
    <div className="relative w-full">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        Número de tarjeta
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          name={name}
          value={formatCardNumber(value || '', cardType)}
          onChange={handleInput}
          className={`
            w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm transition
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          placeholder="1234 1234 1234 1234"
        />
        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
          {(cardType === 'unknown' || cardType === 'visa') && (
            <Icon icon="logos:visa" className="w-5 h-5" />
          )}
          {(cardType === 'unknown' || cardType === 'mastercard') && (
            <Icon icon="logos:mastercard" className="w-5 h-5" />
          )}
          {(cardType === 'unknown' || cardType === 'amex') && (
            <Icon icon="fontisto:american-express" className="w-5 h-5" />
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
