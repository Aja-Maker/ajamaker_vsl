'use client';

export default function ClipsThankYouPage() {
  return (
    <main className="min-h-screen bg-[#02040A] text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Gracias por tu compra!</h1>
        <p className="text-white/80 text-sm">
          Se enviará un correo electrónico con un archivo descargable. Si no lo recibes, escribe a{' '}
          <a href="mailto:dmaditative.state@gmail.com" className="text-[#F97316] underline">
            dmaditative.state@gmail.com
          </a>{' '}
          para solicitarlo.
        </p>
      </div>
    </main>
  );
}
