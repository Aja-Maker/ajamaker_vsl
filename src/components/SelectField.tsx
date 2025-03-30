'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface Option {
  value: string
  label: string
  key?: string
  icon?: string // new!
}

interface CustomSelectProps {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  error?: string
  disabled?: boolean
  displayValue?: React.ReactNode // new!
}

export default function CustomSelectField({
  name,
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  displayValue
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open && containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const dropdownHeight = dropdownRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const roomBelow = viewportHeight - containerRect.bottom
      const roomAbove = containerRect.top

      setDropUp(dropdownHeight > roomBelow && roomAbove > dropdownHeight)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`
          flex w-full items-center justify-between rounded-md border 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition 
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        <span className={`flex items-center gap-2 ${value ? '' : 'text-gray-400'}`}>
        {displayValue
          ? displayValue
          : value
            ? options.find(o => o.value === value)?.label
            : name === 'expMonth'
              ? 'MM'
              : name === 'expYear'
                ? 'YYYY'
                : 'Selecciona una opción'}
        </span>
        <Icon icon="mdi:chevron-down" className="w-5 h-5 text-gray-500" />
      </button>

      {open && (
        <ul
          ref={dropdownRef}
          className={`
            absolute z-10 ${dropUp ? 'bottom-full mb-1' : 'mt-1'} 
            max-h-56 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg
          `}
        >
          {options.map(option => (
            <li
              key={`${option.value}-${option.label}`}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`
                px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 
                ${option.value === value ? 'bg-gray-100 font-medium' : ''}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
