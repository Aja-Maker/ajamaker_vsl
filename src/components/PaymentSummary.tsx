'use client'

interface PaymentSummaryProps {
  amount: number
  currency?: string
  label?: string
}

export default function PaymentSummary({
  amount,
  currency = 'USD',
  label = 'Membresía Anual'
}: PaymentSummaryProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)

  return (
    <section className="mb-6 border rounded-xl bg-white shadow-sm p-4 text-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="text-gray-600 font-medium min-w-0 truncate">
          {label}
        </div>
        <div className="text-gray-900 font-bold text-lg whitespace-nowrap">
          {formatted}
          <span className="ml-1 text-sm font-normal text-gray-400">{currency}</span>
        </div>
      </div>
    </section>
  )
}
