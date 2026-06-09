import CTAButton from "@/components/CTAButton";
import Image from "next/image";
import {
  SEMINAR_DATE,
  SEMINAR_DATETIME,
  VIMEO_INTRO_VIDEO_ID,
  VIMEO_WELCOME_VIDEO_ID,
} from "@/lib/seminar-config";

// ── Reusable leaf components ─────────────────────────────────────────────────

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#7CB342] flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-[#1B5E20] text-[15px] leading-snug">{children}</span>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#FFF3E0] text-[#E65100] font-semibold text-[13px] px-3 py-1 rounded-full border border-[#F5A623]/40">
      {children}
    </span>
  );
}

function LearnCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E0F57A]/60 p-5 text-left space-y-2">
      <div className="w-8 h-8 rounded-full bg-[#E0F57A] flex items-center justify-center text-[#1B5E20] font-bold text-sm flex-shrink-0">
        {number}
      </div>
      <p className="text-[#0D47A1] font-semibold text-[15px] leading-snug">{title}</p>
      <p className="text-[#1B5E20] text-[13px] leading-relaxed font-light">{body}</p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white rounded-2xl border border-[#5BC8F5]/40 overflow-hidden">
      <summary className="cursor-pointer flex justify-between items-center px-5 py-4 font-semibold text-[#0D47A1] text-[14px] select-none list-none">
        {q}
        <span className="ml-3 flex-shrink-0 transition-transform duration-200 group-open:rotate-45 text-[#F5A623] text-xl font-light">+</span>
      </summary>
      <p className="px-5 pb-5 text-[#1B5E20] text-[13px] leading-relaxed font-light">{a}</p>
    </details>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center">

      {/* ── SECTION 1: HERO ────────────────────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center text-center space-y-6">
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[#7CB342] uppercase">
          Aformativo University Presenta
        </p>
        <h1 className="text-3xl font-extrabold text-[#0D47A1] leading-tight max-w-sm">
          SEMINARIO VITALIDAD{" "}
          <span className="text-[#F5A623]">100% GRATIS</span>
        </h1>
        <p className="text-[#1B5E20] text-[15px] leading-relaxed max-w-sm font-light">
          Descubre el conocimiento que puede cambiar por completo la manera en que entiendes tu salud, tu energía y tu vida.
        </p>

        {/* Intro video */}
        {VIMEO_INTRO_VIDEO_ID !== "PLACEHOLDER" ? (
          <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[#5BC8F5]/40 shadow-md">
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_INTRO_VIDEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
              className="w-full aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full max-w-sm rounded-2xl border-2 border-dashed border-[#5BC8F5]/60 bg-[#EBF5FB] aspect-video flex flex-col items-center justify-center gap-2 text-[#5BC8F5]">
            <svg className="w-10 h-10 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
            </svg>
            <p className="text-[12px] font-semibold opacity-70">Video de introducción</p>
            <p className="text-[11px] opacity-50">Próximamente</p>
          </div>
        )}

        <div className="bg-white/70 rounded-2xl border border-[#F5A623]/30 px-5 py-3 text-center shadow-sm">
          <p className="text-[#0D47A1] font-bold text-[13px]">📅 Aparta esta fecha:</p>
          <p className="text-[#1B5E20] font-semibold text-[14px] mt-0.5">{SEMINAR_DATETIME}</p>
        </div>

        <CTAButton label="QUIERO VER EL SEMINARIO GRATIS" size="large" />
        <p className="text-[#7CB342] text-[12px] font-light tracking-wide">
          Acceso gratuito &nbsp;·&nbsp; Online &nbsp;·&nbsp; Cupos limitados
        </p>
      </section>

      {/* ── SECTION 2: IMPACT ──────────────────────────────────────────── */}
      <section className="bg-[#EBF5FB] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <p className="text-[#0D47A1] text-[17px] font-semibold leading-snug">
            Puede que hoy te sientas bien…
          </p>
          <p className="text-[#1B5E20] text-[15px] leading-relaxed font-light">
            pero eso no siempre significa que estés viviendo con verdadera vitalidad.
          </p>

          <p className="text-[#0D47A1] font-semibold text-[14px] text-left">
            Muchas personas creen que están bien porque:
          </p>
          <ul className="space-y-3 text-left">
            {[
              "no les duele nada,",
              "hacen ejercicio,",
              'comen "más o menos bien",',
              "duermen lo mejor que pueden,",
              "y tratan de cuidarse.",
            ].map((item) => (
              <Check key={item}>{item}</Check>
            ))}
          </ul>

          <p className="text-[#0D47A1] font-bold text-[16px] pt-2">
            Pero aun así, el desgaste aparece.
          </p>

          <div className="flex flex-wrap gap-2 justify-center pt-1">
            {["Presión alta", "Reflujo", "Inflamación", "Cansancio", "Medicamentos frecuentes", "Malestares que van y vienen", "Una energía que ya no es la misma"].map(
              (tag) => <Tag key={tag}>{tag}</Tag>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#5BC8F5]/40 p-5 text-left space-y-3 shadow-sm">
            <p className="text-[#0D47A1] font-bold text-[15px]">Y lo más fuerte es esto:</p>
            <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
              hemos llegado a normalizar tanto estas señales, que seguimos llamando salud a una condición que muchas veces ya incluye deterioro.
            </p>
            <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
              En este seminario gratuito vas a descubrir una forma completamente distinta de entender la vitalidad, la salud y la vida.
            </p>
          </div>

          <div className="bg-white/70 rounded-2xl border border-[#F5A623]/30 px-5 py-3 text-center shadow-sm w-full">
            <p className="text-[#0D47A1] font-bold text-[13px]">📅 Fecha del seminario:</p>
            <p className="text-[#1B5E20] font-semibold text-[14px] mt-0.5">{SEMINAR_DATETIME}</p>
          </div>
          <CTAButton label="RESERVAR MI LUGAR GRATIS" />
        </div>
      </section>

      {/* ── SECTION 3: WHAT YOU'LL LEARN ───────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-[#0D47A1] text-xl font-bold text-center leading-snug">
            En este seminario{" "}
            <span className="text-[#F5A623]">VITALIDAD 100% GRATIS</span>{" "}
            vas a aprender:
          </h2>
          <div className="space-y-4">
            <LearnCard
              number="1"
              title="Por qué atender tu vitalidad cambia toda tu vida"
              body="Porque cuando una persona entiende su vitalidad, comprende mejor su energía, su bienestar y la forma en que sostiene su vida día a día."
            />
            <LearnCard
              number="2"
              title="Cómo tu inteligencia sostiene automáticamente tu salud y tu energía"
              body="Vas a descubrir que dentro de ti existe una inteligencia que trabaja a favor de la vida, y que el verdadero aprendizaje consiste en comprender cómo dejar de bloquearla."
            />
            <LearnCard
              number="3"
              title='Por qué sentirte "bien" no siempre significa estar viviendo con certeza de bienestar'
              body="Aprenderás a mirar más profundo, más allá de la costumbre, más allá de la información suelta y más allá de lo que hoy se considera normal."
            />
            <LearnCard
              number="4"
              title="Cómo empezar a tener más claridad, más vitalidad y más control sobre tu vida"
              body="Porque cuando entiendes cómo funciona tu inteligencia, dejas de vivir a ciegas y empiezas a vivir con mayor consciencia."
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BREAKING THE HEALTH MYTH ───────────────────────── */}
      <section className="bg-[#EBF5FB] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            La salud no se explica solo por cosas externas
          </h2>

          <div className="space-y-2 text-left">
            {[
              "Sí, alimentarte bien importa.",
              "Sí, moverte importa.",
              "Sí, dormir bien importa.",
            ].map((line) => (
              <p key={line} className="text-[#1B5E20] text-[15px] font-light">{line}</p>
            ))}
          </div>

          <p className="text-[#1B5E20] text-[15px] font-light leading-relaxed">Todo eso ayuda.</p>

          <div className="bg-white rounded-2xl border border-[#5BC8F5]/40 p-5 text-left shadow-sm space-y-3">
            <p className="text-[#0D47A1] font-semibold text-[14px]">Pero quiero que entiendas algo muy importante:</p>
            <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
              nada de eso, por sí solo, te explica cómo se sostiene realmente la salud.
            </p>
            <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
              Por eso hoy muchas personas hacen esfuerzos, siguen consejos, prueban métodos, cambian hábitos… y aun así el deterioro sigue avanzando poco a poco.
            </p>
          </div>

          <div className="bg-[#0D47A1] rounded-2xl p-5 text-white space-y-2">
            <p className="font-bold text-[15px]">El problema no siempre es falta de esfuerzo.</p>
            <p className="font-bold text-[15px]">Muchas veces es falta de conocimiento.</p>
            <p className="text-[#E0F57A] text-[13px] font-light mt-2">
              Y ese conocimiento es precisamente lo que queremos compartir contigo en este seminario.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CÓDIGO VITALISTA ────────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Existe un conocimiento que nadie nos había enseñado
          </h2>

          <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light text-left">
            Después de casi 30 años investigando la inteligencia, las capacidades y el comportamiento humano, y de profundizar en los últimos años en la salud, la vitalidad y la vida, surgió una claridad sorprendente:
          </p>
          <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light text-left">
            la persona no vive sostenida solo por lo que hace por fuera, sino por una inteligencia que trabaja dentro de ella a favor de la vida.
          </p>
          <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light text-left">
            Ese conocimiento, nuevo porque nadie lo había enseñado de esta manera, en Aformativo University lo hemos llamado:
          </p>

          <div className="bg-gradient-to-br from-[#F5A623] to-[#E8940A] rounded-2xl p-6 shadow-lg space-y-2">
            <p className="text-white font-extrabold text-2xl tracking-wide">CÓDIGO VITALISTA</p>
            <p className="text-white/90 text-[13px] font-light leading-snug">
              El conocimiento clave para comprender tu inteligencia, tu bienestar y tu vida.
            </p>
          </div>

          <p className="text-[#0D47A1] font-semibold text-[14px] leading-snug">
            Este aprendizaje puede abrirte los ojos a una manera totalmente distinta de vivir.
          </p>

          <CTAButton label="QUIERO CONOCER EL CÓDIGO VITALISTA" />
        </div>
      </section>

      {/* ── SECTION 6: WHO IT'S FOR ─────────────────────────────────────── */}
      <section className="bg-[#EBF5FB] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5">
          <h2 className="text-[#0D47A1] text-xl font-bold text-center leading-snug">
            Este seminario es para ti si…
          </h2>
          <ul className="space-y-3">
            {[
              "sientes que te cuidas, pero sabes que algo podría estar mejor,",
              "quieres entender tu vida y tu salud con más profundidad,",
              "estás cansado de información suelta y consejos que no transforman de verdad,",
              "quieres más claridad, más energía y más consciencia,",
              "sientes que ha llegado el momento de dejar de vivir a ciegas,",
              "deseas un cambio real en tu bienestar, tu vitalidad y tu vida.",
            ].map((item) => <Check key={item}>{item}</Check>)}
          </ul>

          <div className="bg-white rounded-2xl border border-[#5BC8F5]/40 p-5 shadow-sm">
            <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
              También es para ti si hoy te sientes estancado, atrapado o en una disyuntiva interior, y sabes que necesitas una comprensión distinta para avanzar.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: WHAT MAKES IT DIFFERENT ────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Esto no es una charla más
          </h2>

          <div className="text-left space-y-2">
            {[
              "Aquí no vas a recibir solo motivación momentánea.",
              "No vas a escuchar lo mismo de siempre.",
              "Y no vas a salir con una lista más de cosas por hacer.",
            ].map((line) => (
              <p key={line} className="text-[#1B5E20] text-[14px] font-light leading-snug flex items-start gap-2">
                <span className="text-[#5BC8F5] font-bold mt-0.5">—</span>
                {line}
              </p>
            ))}
          </div>

          <div className="bg-[#0D47A1] rounded-2xl p-5 text-white text-left space-y-2 shadow-md">
            <p className="font-bold text-[15px]">Aquí vas a recibir una comprensión nueva.</p>
            <p className="text-white/80 text-[13px] font-light">Una comprensión que puede convertirse en un antes y un después en la manera en que ves:</p>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {["tu salud,", "tu energía,", "tu vitalidad,", "tus decisiones,", "tu bienestar,", "y tu vida entera."].map((item) => (
                <p key={item} className="text-[#E0F57A] text-[13px] font-light">{item}</p>
              ))}
            </div>
          </div>

          <p className="text-[#1B5E20] text-[14px] leading-relaxed font-light">
            Porque cuando una persona entiende su inteligencia, se conoce por dentro. Y cuando se conoce por dentro, empieza a vivir diferente.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: ABOUT MARVIN ────────────────────────────────────── */}
      <section className="bg-[#0D47A1] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <p className="text-[#5BC8F5] text-[12px] font-semibold tracking-[0.2em] uppercase">
            ¿Quién te va a compartir este conocimiento?
          </p>
          <h2 className="text-white text-2xl font-extrabold">Soy Marvin Solís</h2>

          <div className="mx-auto w-28 h-28 rounded-full border-4 border-[#F5A623] overflow-hidden shadow-lg">
            <Image
              src="/foto-marvin.png"
              alt="Marvin Solís"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-left space-y-4">
            <p className="text-white/80 text-[14px] leading-relaxed font-light">
              Durante 25 años me dediqué al mundo comercial, especialmente a la gastronomía y la atención de eventos. Me encantó servir, crear experiencias y ver a las personas satisfechas.
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed font-light">
              Pero mientras desarrollaba esa carrera, también estudiaba e investigaba algo que fue creciendo dentro de mí con mucha fuerza: la inteligencia, las capacidades y el comportamiento del ser humano.
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed font-light">
              Con el tiempo comprendí que ese interés no era un pasatiempo. Era un llamado.
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed font-light">
              Decidí dar el salto. Convertí mi carrera comercial en un pasatiempo, y mi pasión por el bienestar del ser humano en mi camino principal.
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed font-light">
              En los últimos años profundicé a tiempo completo en la salud, la vitalidad y la vida. Y al recorrer ciencia por ciencia, experto por experto y experiencia de vida, llegué a un descubrimiento que transformó por completo mi manera de entender al ser humano:
            </p>
            <p className="text-[#E0F57A] font-bold text-[15px] leading-snug text-center">
              la inteligencia del ser humano no es algo pequeño. Es extraordinaria.
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed font-light text-center">
              Y cuando una persona conoce esa inteligencia, su vida cambia. Eso es lo que hoy quiero compartir contigo.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: EMOTIONAL BENEFITS ─────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Lo que este aprendizaje puede despertar en tu vida
          </h2>
          <p className="text-[#1B5E20] text-[14px] font-light">
            Cuando empiezas a comprender tu inteligencia y a vivir con una nueva consciencia, comienzan a abrirse posibilidades que antes parecían lejanas:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              "más claridad",
              "más confianza",
              "más consciencia",
              "más amor",
              "mejores límites",
              "más energía",
              "más juventud interior",
              "más sentido",
              "más dirección",
              "una vida mejor sostenida",
            ].map((benefit) => (
              <div
                key={benefit}
                className="bg-[#E0F57A] rounded-2xl px-3 py-3 text-[#1B5E20] font-semibold text-[13px] flex items-center justify-center text-center"
              >
                {benefit}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#5BC8F5]/40 p-5 shadow-sm text-left">
            <p className="text-[#0D47A1] font-bold text-[14px]">No se trata solo de &ldquo;saber algo más&rdquo;.</p>
            <p className="text-[#1B5E20] text-[13px] font-light leading-relaxed mt-1">
              Se trata de descubrir una nueva manera de vivir.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: DIRECT INVITATION ──────────────────────────────── */}
      <section className="bg-[#EBF5FB] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Quiero invitarte a que no te pierdas este seminario
          </h2>

          <div className="bg-gradient-to-r from-[#F5A623] to-[#E8940A] rounded-2xl py-5 px-6 shadow-md">
            <p className="text-white font-extrabold text-3xl">Es 100% GRATIS.</p>
          </div>

          <p className="text-[#1B5E20] text-[14px] font-light">
            Y me daría muchísimo gusto que este aprendizaje se quede contigo.
          </p>
          <p className="text-[#1B5E20] text-[14px] font-light">
            La salud, la vitalidad y la vida son demasiado importantes como para seguir viviéndolas a ciegas.
          </p>

          <div className="space-y-2 text-left">
            {[
              "Tú mereces tener acceso a este conocimiento.",
              "Tú mereces comprender mejor tu inteligencia, tu bienestar y tu vida.",
              "Tú mereces descubrir que existe una forma distinta de vivir.",
            ].map((line) => (
              <p key={line} className="text-[#0D47A1] font-semibold text-[14px] flex items-start gap-2">
                <span className="text-[#F5A623]">✦</span>
                {line}
              </p>
            ))}
          </div>

          <div className="bg-white/70 rounded-2xl border border-[#F5A623]/30 px-5 py-3 text-center shadow-sm w-full">
            <p className="text-[#0D47A1] font-bold text-[13px]">📅 El seminario es el {SEMINAR_DATE}</p>
            <p className="text-[#1B5E20] text-[13px] font-light mt-0.5">No te lo pierdas — reserva tu lugar ahora.</p>
          </div>
          <CTAButton label="SÍ, QUIERO ENTRAR GRATIS AL SEMINARIO" size="large" />
          <p className="text-[#7CB342] text-[12px] font-light">
            Accede ahora y empieza este recorrido con nosotros.
          </p>
        </div>
      </section>

      {/* ── SECTION 11: VIDEO ──────────────────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Mira este mensaje especial de Marvin Solís
          </h2>
          <p className="text-[#1B5E20] text-[14px] font-light leading-relaxed">
            Antes de entrar, quiero darte la bienvenida personalmente y contarte por qué este conocimiento puede significar un antes y un después en tu vida.
          </p>
          <div className="w-full rounded-2xl overflow-hidden border border-[#5BC8F5]/40 shadow-md">
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_WELCOME_VIDEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
              className="w-full aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 12: POST-VIDEO ─────────────────────────────────────── */}
      <section className="bg-[#EBF5FB] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5 text-center">
          <h2 className="text-[#0D47A1] text-xl font-bold leading-snug">
            Si este mensaje resonó contigo, estás en el lugar correcto
          </h2>
          <p className="text-[#1B5E20] text-[14px] font-light">
            No llegaste aquí por casualidad.
          </p>
          <div className="text-left space-y-2">
            {[
              "Tal vez llevas tiempo sintiendo que algo en tu vida necesita cambiar.",
              "Tal vez has querido más claridad, más bienestar, más control, más paz o una vida mejor.",
              "Tal vez no sabías exactamente qué te faltaba.",
            ].map((line) => (
              <p key={line} className="text-[#1B5E20] text-[14px] font-light leading-snug flex items-start gap-2">
                <span className="text-[#5BC8F5] font-bold mt-0.5">—</span>
                {line}
              </p>
            ))}
          </div>
          <p className="text-[#0D47A1] font-semibold text-[14px]">
            Este seminario puede abrirte una puerta que no sabías que existía.
          </p>
          <CTAButton label="QUIERO ACCEDER AHORA" />
        </div>
      </section>

      {/* ── SECTION 13: FAQ ────────────────────────────────────────────── */}
      <section className="bg-[#F0FAF5] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-5">
          <h2 className="text-[#0D47A1] text-xl font-bold text-center leading-snug">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            <FAQItem
              q="¿El seminario realmente es gratis?"
              a="Sí. El acceso al seminario VITALIDAD es 100% gratis."
            />
            <FAQItem
              q="¿Es para mí aunque no tenga conocimientos previos?"
              a="Sí. Este seminario está pensado para cualquier persona que quiera comprender mejor su salud, su vitalidad y su vida."
            />
            <FAQItem
              q="¿Qué voy a encontrar dentro?"
              a="Un aprendizaje profundo, claro y transformador sobre la inteligencia, la vitalidad y la forma en que puedes empezar a vivir con más consciencia."
            />
            <FAQItem
              q="¿Necesito hacer algo especial para entrar?"
              a="No. Solo da clic en el botón, regístrate y sigue las instrucciones para acceder."
            />
            <FAQItem
              q="¿Qué hace diferente este seminario?"
              a="Que no se enfoca solo en consejos externos, sino en ayudarte a comprender algo más profundo sobre tu inteligencia, tu bienestar y tu vida."
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 14: FINAL CLOSE ────────────────────────────────────── */}
      <section className="bg-[#1B5E20] w-full py-16 px-6 flex flex-col items-center space-y-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-white text-xl font-bold leading-snug">
            Este puede ser el comienzo de una manera totalmente distinta de vivir
          </h2>

          <p className="text-white/80 text-[14px] font-light leading-relaxed">
            A veces una sola comprensión cambia la manera entera de ver la vida. Eso es lo que deseo para ti con este seminario.
          </p>

          <div className="space-y-1">
            {[
              "Que puedas verte mejor.",
              "Comprenderte mejor.",
              "Y empezar a vivir con más salud, más vitalidad y más consciencia.",
            ].map((line) => (
              <p key={line} className="text-[#E0F57A] text-[15px] font-light">{line}</p>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6 space-y-1">
            <p className="text-white/60 text-[12px] font-light tracking-wide">Con mucho gusto,</p>
            <p className="text-white font-bold text-lg">Marvin Solís</p>
            <p className="text-[#5BC8F5] text-[12px] font-light">Aformativo University</p>
          </div>

          <CTAButton label="ENTRAR GRATIS AL SEMINARIO VITALIDAD" size="large" />
        </div>
      </section>

    </main>
  );
}
