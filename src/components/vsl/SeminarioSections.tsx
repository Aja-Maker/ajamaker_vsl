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

const DATE = 'Viernes 13 de marzo'
const TIME = '5:30pm hora de Costa Rica, 6:30pm hora de Colombia'

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
      <p className="text-xs uppercase tracking-[0.4em] text-[#F97316] mb-3">salud familiar</p>
      <h1 className="text-3xl font-semibold leading-tight mb-4">TU SALUD HOY DEFINE LA SALUD DE TUS HIJOS Y NIETOS</h1>
      <p className="text-base text-white/80 leading-relaxed mb-6">
        Este seminario te muestra cómo tus hábitos diarios están moldeando el futuro de tu familia, y cómo empezar a cambiar desde hoy con pasos claros, reales y sostenibles.
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
      <SectionHeading title="Esto no son consejos sueltos: es una guía para proteger a tu familia" />
      <p className="text-sm leading-relaxed">
        El {DATE} | Online | 100% Gratis. Una clase transformadora para padres, madres y abuelos que quieren liderar con el ejemplo.
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
      <SectionHeading eyebrow="🎬 Mirá esto antes de decidir" title="Lo que hacés por tu salud hoy, tus hijos y nietos lo aprenden mañana" />
      <p className="text-sm leading-relaxed mb-4">
        En estos 3 minutos vas a entender por qué tus hábitos diarios están marcando el bienestar de tu familia, y cómo empezar a corregir el rumbo sin extremos ni culpas.
      </p>
      <div className="rounded-3xl overflow-hidden border border-[#FCD9BD] shadow-inner">
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://player.vimeo.com/video/1164216980?h=ffea09936a&title=0&byline=0&portrait=0"
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
      <SectionHeading eyebrow="✨ Un espacio para transformar tu casa desde tu ejemplo" title="No es otra charla de salud." />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>Es una guía clara para entender cómo tus hábitos impactan directamente en tus hijos y nietos.</p>
        <p>
          Vas a aprender a ordenar tu salud física, mental y espiritual para vivir con más energía y construir un entorno familiar
          más fuerte.
        </p>
        <p className="italic font-semibold">💬 "No fallaste: nadie te enseñó el mapa correcto para cuidar tu salud y la de tu familia."</p>
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
      <SectionHeading eyebrow="🔥 ¿Qué vas a vivir?" title="De hábitos inconscientes a un hogar con salud y ejemplo" />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          Te vamos a mostrar por qué, aunque “intentes cuidarte”, seguís repitiendo rutinas que afectan tu energía y también el
          bienestar de tus hijos o nietos.
        </p>
        <p>Vas a descubrir cómo recuperar tu equilibrio y convertir tu día a día en un modelo saludable para tu familia.</p>
        <p>
          Este seminario no es solo información: es formación práctica para pasar de sobrevivir cansado a vivir con claridad, fuerza
          y dirección.
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
        <p>Vamos a recorrer un mapa práctico de 20 pilares que sostienen tu salud y la cultura de salud en tu hogar.</p>
        <p>
          Desde alimentación, descanso y manejo emocional, hasta propósito, espiritualidad y hábitos que tus hijos y nietos aprenden
          al verte.
        </p>
        <p>
          En el seminario vas a recibir herramientas simples para aplicar en tu rutina y empezar cambios reales desde el primer día.
        </p>
        <p>
          Lo que no te enseñaron en la escuela ni en consultas rápidas, acá lo vas a entender con claridad para prevenir antes de
          lamentar.
        </p>
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
      <SectionHeading eyebrow="📅 ¿Cuándo y cómo?" title="Reservá tu lugar y participá en familia" />
      <ul className="text-sm leading-relaxed space-y-2">
        <li>🗓️ El {DATE} a las {TIME}</li>
        <li>📍 100% Online por Zoom</li>
        <li>💰 Totalmente Gratis (contenido de alto valor práctico)</li>
        <li>👨‍👩‍👧‍👦 Especial para padres, madres, abuelos y abuelas que quieren guiar con el ejemplo</li>
        <li>🧠 No necesitás conocimientos previos: solo decisión de cuidar mejor tu salud y la de los tuyos</li>
        <li>*Auspiciado por Aformativo University</li>
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
      <SectionHeading title="🙌 ¿Para quién es este seminario?" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>Para padres y madres que quieren criar hijos saludables desde el ejemplo diario.</li>
        <li>Para abuelos y abuelas que desean dejar un legado de salud, energía y buenos hábitos.</li>
        <li>Para familias que quieren prevenir enfermedad antes de que aparezca el problema.</li>
        <li>Para quienes están cansados de vivir “más o menos bien” y quieren una guía clara para mejorar en casa.</li>
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
      <SectionHeading eyebrow="💡 Lo que te vas a llevar" title="Resultados concretos para aplicar en tu casa" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>✅ Un mapa simple para identificar qué hábitos están afectando tu salud y la de tu familia</li>
        <li>✅ Acciones prácticas para mejorar energía, descanso y alimentación desde esta semana</li>
        <li>✅ Claridad para cortar patrones que tus hijos y nietos podrían repetir</li>
        <li>✅ Una forma de liderar con ejemplo, no con discurso</li>
        <li>✅ Un plan realista para sostener cambios sin extremos ni culpa</li>
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
      <SectionHeading eyebrow="🎁 BONUS" title="Para que puedas aplicar todo con tu familia" />
      <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
        <li>✔️ Acceso al replay para volver a verlo y reforzar lo aprendido en casa</li>
        <li>✔️ Comunidad privada opcional para acompañarte en la implementación de nuevos hábitos</li>
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
      <SectionHeading title="🙏 Tu familia merece la mejor versión de vos" />
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          Tu casa aprende de lo que hacés, no solo de lo que decís. Hoy podés tomar una decisión que impacte tu salud y el futuro
          de tus hijos y nietos.
        </p>
        <p className="font-semibold text-white">
          Reservá tu lugar gratis ahora y empezá a construir una familia más sana, fuerte y consciente desde tu ejemplo.
        </p>
      </div>
      {cta && (
        <CTAButton onClick={onCtaClick} className="mt-6" variant="light" />
      )}
    </SectionWrapper>
  );
}
