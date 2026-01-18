'use client';

import CTAButton from './CTAButton';
import type { ReactNode } from 'react';

interface SectionProps {
  onCtaClick: () => void;
  cta: boolean;
}

type Tone = 'light' | 'accent' | 'night';

interface WrapperProps {
  tone?: Tone;
  children: ReactNode;
}

const DATE = 'Miércoles 21 de enero'
const TIME = '7pm hora de Costa Rica'

function SectionWrapper({ tone = 'light', children }: WrapperProps) {
  const tones: Record<Tone, string> = {
    light: 'bg-white text-[#0F172A] border border-[#E2E8F0]',
    accent: 'bg-[#FFF9F0] text-[#7F3A17] border border-[#FCD9BD]',
    night: 'bg-[#0F172A] text-white border border-[#1E293B]',
  };

  return (
    <section className="w-full">
      <div className={`rounded-[32px] px-6 py-7 shadow-sm ${tones[tone]}`}>{children}</div>
    </section>
  );
}

const SectionHeading = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="space-y-1 mb-4">
    {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">{eyebrow}</p>}
    <h2 className="text-xl font-semibold leading-snug">{title}</h2>
  </div>
);

export function SeminarHero({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="night">
      <p className="text-xs uppercase tracking-[0.4em] text-[#F97316] mb-3">salud integral</p>
      <h1 className="text-3xl font-semibold leading-tight mb-4">SEMINARIO SALUD PARA TODOS ONLINE</h1>
      <p className="text-base text-white/80 leading-relaxed mb-6">
        Un viaje íntimo para recordar que tu cuerpo, tu mente y tu espíritu fueron creados para vivir en armonía.
      </p>
      {cta && (
        <CTAButton onClick={onCtaClick} variant="light" />
      )}
    </SectionWrapper>
  );
}

export function OpeningSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper>
      <SectionHeading title="Aquí no recibirás tips sueltos" />
      <p className="text-sm leading-relaxed">
        El {DATE} | Online | 100% Gratis. Organizado por Aformativo University.
      </p>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function SeminarVideoSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="accent">
      <SectionHeading eyebrow="🎬 Mirá el mensaje" title="Sumergite en esta visión de salud total" />
      <p className="text-sm leading-relaxed mb-4">
        Tomate 3 minutos para escuchar cómo se ve una vida con tu cuerpo, tu mente y tu espíritu alineados. Este video fue grabado
        para ayudarte a decidir desde la calma y la convicción.
      </p>
      <div className="rounded-3xl overflow-hidden border border-[#FCD9BD] shadow-inner">
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://player.vimeo.com/video/1146076012?h=ffea09936a&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function SacredSpaceSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="accent">
      <SectionHeading eyebrow="✨ Bienvenido a este espacio sagrado..." title="No es una charla más." />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>No es una clase de salud como las que ya conocés.</p>
        <p>
          Regalate un espacio para conocer de salud de la persona: cuerpo sano, tu mente en paz y tu espíritu libre y sobre todo
          que lo vivas con tu cuerpo saludable y con energía.
        </p>
        <p className="italic font-semibold">💬 "Está bien que no lo supieras porque te faltaba el mapa correcto."</p>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function ExperienceSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper>
      <SectionHeading eyebrow="🔥 ¿Qué vas a vivir?" title="Seminario desde 0 hasta salud total. Te acompañamos paso a paso" />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          Te vamos a guiar para que entiendas por qué no te sentís al 100%, aunque “comas bien” “hagas ejercicio” y
          “duermas bien”.
        </p>
        <p>Y lo más importante: vas a descubrir cómo volver a tu equilibrio natural.</p>
        <p>
          Este seminario no es información, es Aformación. Y está diseñado para que pases de sentirte "más o menos bien"
          o de “creer que estas bien de salud” a sentirte pleno, fuerte y lleno de energía.
        </p>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function MethodSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="accent">
      <SectionHeading title="¿Cómo lo vamos a lograr?" />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>Vamos a recorrer juntos un mapa de 20 pilares esenciales:</p>
        <p>
          Desde la alimentación y el sueño, hasta el propósito, la espiritualidad, tu sexualidad y tu poder interior.
        </p>
        <p>
          En el SEMINARIO vas a tener toda la información, vivirás la
          transformación hasta salud total. Cada momento vas a recibir herramientas prácticas, sabiduría y principios
          eternos para sanar, ordenar y fortalecer tu vida, alejado de las enfermedades.
        </p>
        <p>Esto no lo enseñan ni en la escuela, ni en la medicina tradicional, por eso es que no tenemos a quien preguntarle de salud.</p>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function DetailsSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper>
      <SectionHeading eyebrow="📅 ¿Cuándo y cómo?" title="Los detalles logísticos" />
      <ul className="text-sm leading-relaxed space-y-2">
        <li>🗓️ El {DATE} a las {TIME}</li>
        <li>📍 100% Online por Zoom</li>
        <li>💰 Totalmente Gratis (pero lo que recibes vale oro)</li>
        <li>*Auspiciado por Aformativo University</li>
        <li>🧘🏻‍♂️ Accesible para todos: sin importar tu edad, estado de salud o conocimientos previos</li>
      </ul>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function AudienceSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="accent">
      <SectionHeading title="🙌 ¿Para quién es esto?" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>Para quienes quieren prevenir antes de enfermarse.</li>
        <li>Para quienes ya están enfrentando retos físicos, emocionales o espirituales.</li>
        <li>Para quienes sienten que “algo falta” en su bienestar y están listos para reconectar.</li>
        <li>Para quienes quieren comprender su cuerpo como Dios lo diseñó: con inteligencia, propósito y poder.</li>
      </ul>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function TakeawaysSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper>
      <SectionHeading eyebrow="💡 Lo que te vas a llevar" title="Resultados claros y aplicables" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>✅ Un mapa claro de tu salud integral</li>
        <li>✅ Herramientas prácticas para aplicar desde el día 1</li>
        <li>✅ Claridad sobre tus emociones, tus hábitos y tu energía</li>
        <li>✅ Conexión profunda con tu propósito y tu fe</li>
        <li>✅ El conocimiento que puede marcar un antes y un después en tu vida</li>
      </ul>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function BonusSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="accent">
      <SectionHeading eyebrow="🎁 BONUS" title="Queremos que no te pierdas nada" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>✔️ Acceso al replay si no podés estar en vivo</li>
        <li>✔️ Comunidad privada de apoyo (opcional)</li>
      </ul>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" />
      )}
    </SectionWrapper>
  );
}

export function InvitationSection({ onCtaClick, cta = true }: SectionProps) {
  return (
    <SectionWrapper tone="night">
      <SectionHeading title="🙏 Tu vida merece este regalo." />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>“Dios ya te dio la fuerza. Aformativo te da el conocimiento. Ahora vos solo necesitás poner la decisión.”</p>
        <p className="font-semibold text-white">
          ¿Estás listo para vivir con salud total? <br /> ____________ <br /> 👇 Inscribite para reservar tu espacio 👇
        </p>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" variant="light" />
      )}
    </SectionWrapper>
  );
}
