export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') console.log(...args)
}

type CardDetails = {
  brand?: string
  last4?: string
}

export function formatFriendlyError(error: any, card?: CardDetails): string {
  const brand = card?.brand ?? 'Desconocida'
  const last4 = card?.last4 ?? '****'

  const code = error?.code || error?.failureCode || error?.message || error?.error

  // ✅ If the message is a plain user-friendly string, return directly
  if (typeof error?.message === 'string' && !code?.includes('cards.') && !code?.includes('declined')) {
    return error.message
  }

  switch (code) {
    case 'declined':
      return `Pago declinado\nMarca: ${brand}\nNúmero: ****${last4}`
    case 'cards.invalid_card_info':
      return `Creación fallida por verificación inválida\nMarca: ${brand}\nNúmero: ****${last4}`
    case 'processor_error':
      return `Error en procesador de pagos con tarjeta externo\nMarca: ${brand}\nNúmero: ****${last4}`
    case '3DS2 authentication incomplete':
      return 'Cancelaste o no completaste la autenticación de tu banco.'
    default:
      return 'No se pudo procesar el pago. Intentalo más tarde.'
  }
}
