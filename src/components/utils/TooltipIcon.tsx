// components/TooltipIcon.tsx
'use client'

import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface TooltipIconProps {
  id: string
  content: string
}

export default function TooltipIcon({ id, content }: TooltipIconProps) {
  return (
    <>
      <button
        type="button"
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="ml-1 text-gray-400 hover:text-gray-600"
      >
        <Icon icon="mage:question-mark-circle" className="w-4 h-4" />
      </button>
      <Tooltip id={id} place="right" />
    </>
  )
}
