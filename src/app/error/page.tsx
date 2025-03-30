'use client'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const params = useSearchParams()
  const msg = params.get('msg') ?? 'Algo salió mal'
  const status = params.get('status')

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-red-600">Error en el pago</h1>
      <p className="mt-2">{msg}</p>
      {status && <p className="mt-1 text-sm text-gray-500">Estado: {status}</p>}
    </div>
  )
}
