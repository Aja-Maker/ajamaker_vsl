// app/error/page.tsx
'use client'

import { Suspense } from 'react'
import ErrorPage from '@/components/ErrorPage'

export default function ErrorPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando error...</div>}>
      <ErrorPage />
    </Suspense>
  )
}
