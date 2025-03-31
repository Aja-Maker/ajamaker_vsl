'use client'

interface PaymentConfirmedPageProps {
  userCreationError?: string | null
}

export default function PaymentConfirmedPage({ userCreationError }: PaymentConfirmedPageProps) {
  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-3">
      <h2 className="text-xl font-semibold text-green-700">¡Pago realizado con éxito!</h2>

      {!userCreationError ? (
        <>
          <p className="text-sm">Tu cuenta fue creada correctamente.</p>
          <p className="text-sm">
            Enviamos un correo de verificación a tu email. Revisá también tu carpeta de spam.
          </p>
          <p className="text-sm">
            Si tenés problemas para verificar tu correo, contactá por WhatsApp al{' '}
            <strong>+506 8404 0433</strong> o escribí a{' '}
            <strong>manager@ajamaker.com</strong>
          </p>
        </>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded text-sm space-y-1">
          <p>Tu pago fue exitoso, pero no se pudo crear tu cuenta automáticamente.</p>
          <p>
            Contactá por WhatsApp al <strong>+506 8404 0433</strong> o escribí a{' '}
            <strong>manager@ajamaker.com</strong> con tu comprobante de pago.
          </p>
        </div>
      )}
    </div>
  )
}
