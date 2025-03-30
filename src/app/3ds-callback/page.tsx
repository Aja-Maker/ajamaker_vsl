// app/3ds-callback/page.tsx
'use client'
import { useEffect } from 'react'

export default function ThreeDSCallback() {
  useEffect(() => {
    window.parent.postMessage({ type: '3ds-complete' }, '*')
  }, [])

  return (
    <div className="p-4 text-center text-sm">
      <p>Verificando tu pago, por favor no cierres esta ventana...</p>
    </div>
  )
}
