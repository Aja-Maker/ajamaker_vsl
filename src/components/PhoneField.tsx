'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import CustomSelectField from './SelectField'
import InputField from './FormInput'

interface CountryOption {
  code: string
  name: string
  dial: string
}

interface PhoneFieldProps {
  name: string
  label?: string
  value: string
  onChange: (value: string) => void
  prefix: string
  onPrefixChange: (value: string) => void
  options: CountryOption[]
  error?: string
  register: any
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


export default function PhoneField({
  name,
  label = 'Teléfono',
  value,
  onChange,
  prefix,
  onPrefixChange,
  options,
  error,
  register
}: PhoneFieldProps) {
  const selectedCountry = options.find(o => o.dial === prefix)

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 text-left">{label}</label>
      <div className="flex gap-2">
        <div className="w-32">
          <CustomSelectField
            name={`${name}-prefix`}
            label=""
            value={prefix}
            onChange={onPrefixChange}
            options={options.map(({ code, name, dial }) => ({
              value: dial,
              label: `${dial} (${name})`
            }))}
            displayValue={
              selectedCountry ? (
                <Icon
                  icon={`twemoji:flag-${toSlug(selectedCountry.name)}`}
                  className="w-5 h-5"
                />
              ) : (
                prefix
              )
            }            
          />
        </div>
        <div className="flex-1 space-y-1">
          <InputField name={name} label="" register={register} />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  )
}
