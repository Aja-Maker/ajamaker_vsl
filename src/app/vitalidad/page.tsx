const SEMINAR_VIDEO_URL =
  "https://drive.google.com/file/d/1v3CtXQREFJODtZRhZjW1aYt6zJQQCxBK/preview";
const CHECKOUT_URL = process.env.NEXT_PUBLIC_ONVO_CHECKOUT_URL;

export default function VitalidadPage() {
  if (!CHECKOUT_URL) {
    throw new Error("NEXT_PUBLIC_ONVO_CHECKOUT_URL is not configured");
  }

  return (
    <main className="min-h-screen bg-[#F0FAF5] px-6 py-14 sm:py-20">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7CB342]">
          Aformativo University Presenta
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-[#0D47A1] sm:text-5xl">
          Seminario <span className="text-[#F5A623]">Vitalidad</span>
        </h1>
        <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed text-[#1B5E20] sm:text-lg">
          Regálate esta hora para descubrir una nueva manera de comprender tu salud, tu energía y tu vida.
        </p>

        <div className="mt-8 w-full overflow-hidden rounded-2xl border border-[#5BC8F5]/40 bg-black shadow-xl">
          <iframe
            src={SEMINAR_VIDEO_URL}
            title="Seminario Vitalidad"
            className="aspect-video w-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="mt-10 w-full max-w-2xl rounded-3xl border border-[#F5A623]/30 bg-white px-6 py-8 shadow-sm sm:px-10">
          <h2 className="text-2xl font-bold text-[#0D47A1]">Da el siguiente paso hacia una vida con más vitalidad</h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] font-light leading-relaxed text-[#1B5E20]">
            Si estás listo para profundizar en este conocimiento, accede ahora al curso completo.
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#F5A623] to-[#E8940A] px-9 py-5 text-base font-bold tracking-wide text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            QUIERO REGISTRARME AHORA
          </a>
          <p className="mt-4 text-xs font-light text-[#7CB342]">Pago seguro procesado por ONVO Pay</p>
        </div>
      </section>
    </main>
  );
}
