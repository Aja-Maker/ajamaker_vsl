'use client';

import CTAButton from '@/components/vsl/CTAButton';

interface SectionProps {
  onCtaClick: () => void;
}

const sectionBase = 'rounded-3xl border border-[#1F2937] bg-[#0B0E16] text-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]';

export function ClipsHero({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center space-y-4`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#FACC15]">Sólo por diciembre</p>
      <h1 className="text-3xl font-semibold leading-tight">Paquete de más de 100,000 reels virales de estilo de vida de lujo</h1>
      <p className="text-base text-white/80">Descarga instantánea · 75% off</p>
      {/* <CTAButton onClick={onCtaClick} variant="gradient" /> */}
    </section>
  );
}

export function ClipsVideo({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} space-y-4`}>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#F97316]">Ve dentro del paquete</p>
        <h2 className="text-xl font-semibold">¿Que obtengo?</h2>
        <p className="text-sm text-white/70">Galería de más de 100,000 videos virales de estilo de vida de lujo. Ve abajo</p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://player.vimeo.com/video/1148667567?h=ffea09936a&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
      <CTAButton onClick={onCtaClick} variant="gradient" label='OBTENER ACCESO' />
    </section>
  );
}

export function ClipsPricing({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center space-y-3`}>
      <p className="text-xs uppercase tracking-[0.3em] text-[#FACC15]">Oferta por tiempo limitado</p>
      <h2 className="text-2xl font-semibold">Obtén la galería completa por sólo $40</h2>
      <p className="text-sm text-white/70">
        Precio regular <span className="line-through">$160</span> — Sólo por este fin de año <span className="font-semibold">$40</span> (75% off)
      </p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-3xl font-semibold text-white">$40</span>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1 rounded-full">una vez</span>
      </div>
      <CTAButton onClick={onCtaClick} variant="gradient" label='OBTENER ACCESO'/>
    </section>
  );
}

export function ClipsAudience({ onCtaClick }: SectionProps) {
  const items = [
    'Emprendedores e influencers de negocios',
    'Páginas de lujo y motivación',
    'Creadores de marca personal',
    'Gestores de redes sociales',
    'Creadores de Shorts para YouTube',
  ];
  return (
    <section className={sectionBase}>
      <h2 className="text-xl font-semibold mb-3">Perfecto para contenido de estilo de vida de lujo</h2>
      <ul className="space-y-2 text-sm text-white/80">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-[#F97316] mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsBenefits({ onCtaClick }: SectionProps) {
  const benefits = [
    'Publica reels de lujo a diario sin necesidad de edición',
    'Aumenta el engagement y la imagen de tu marca',
    'Perfecto para creadores del nicho motivacional y de dinero',
    'Ahorra horas y sube contenido al instante',
    'Hazte viral con visuales estéticos y con estilo',
  ];
  return (
    <section className={sectionBase}>
      <h2 className="text-xl font-semibold mb-3">Por qué lo amarás</h2>
      <ul className="space-y-2 text-sm text-white/80">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <span className="text-[#FACC15] text-lg">★</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsReviews({ onCtaClick }: SectionProps) {
  const reviews = [
    '¡Genial! Definitivamente vale la pena el dinero',
    'Muchísimas buenas ideas para todos',
    '¡Simplemente amo todos estos reels, son increíbles!',
    'Todo salió muy bien, 10/10',
  ];
  return (
    <section className={`${sectionBase} space-y-4`}>
      <div>
        <p className="uppercase text-xs tracking-[0.3em] text-[#F97316]">Testimonios de nuestros compradores</p>
        <h2 className="text-xl font-semibold">Están obsesionados con nuestra galería.</h2>
      </div>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-1 text-[#FACC15] mb-2">
              {'★★★★★'.split('').map((star, index) => (
                <span key={`${review}-${index}`}>★</span>
              ))}
            </div>
            <p className="text-sm text-white/80">{review}</p>
          </div>
        ))}
      </div>
      {/* <CTAButton onClick={onCtaClick} className="mt-2" /> */}
    </section>
  );
}

export function ClipsBonus({ onCtaClick }: SectionProps) {
  const bonuses = [
    'Consejos de YouTube para aumentar el alcance y los ingresos por anuncios',
    'Dominio de anuncios en TikTok: cómo crear campañas virales que venden',
    'Masterclass de Instagram: construye, conecta y haz crecer tu audiencia',
    'Alcanza 100K visualizaciones en Instagram: la hoja de ruta probada',
    'Cómo usar la galería',
  ];
  return (
    <section className={`${sectionBase} border-[#F97316]`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#F97316]">Bonos incluídos</p>
      <h2 className="text-2xl font-semibold mt-2">¡Recibe nuestros regalos exclusivos solo para ti!</h2>
      <p className="text-sm text-white/70 mt-2">Valorado en más de $200, incluido gratis con tu compra.</p>
      <ul className="space-y-2 text-sm mt-4 text-white/85">
        {bonuses.map((bonus) => (
          <li key={bonus} className="flex items-start gap-2">
            <span className="text-[#F97316] mt-1">+</span>
            <span className="font-semibold text-white">{bonus}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsTerms({ onCtaClick }: SectionProps) {
  const terms = `Última actualización: 15/12/2025

Al comprar, acceder o utilizar este producto, aceptas quedar legalmente vinculado por los siguientes Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos Términos, no compres ni utilices este producto.

1. Naturaleza del producto

Este producto proporciona acceso temporal a una colección de archivos de video digitales (“Contenido”) disponibles a través de una plataforma de almacenamiento en la nube de terceros (por ejemplo, Google Drive).

Reconoces y aceptas que:

Estás comprando acceso, no propiedad.

El acceso se proporciona “tal cual” y “según disponibilidad”.

2. Descargo de responsabilidad sobre la propiedad

El vendedor NO es el propietario, creador ni titular de los derechos de autor del Contenido.

Todos los derechos, propiedad y control del Contenido pertenecen a su(s) propietario(s) original(es).

El vendedor no reclama ningún derecho de propiedad intelectual sobre el Contenido.

El vendedor actúa únicamente como facilitador del acceso.

3. Alojamiento de terceros y disponibilidad

El Contenido está alojado en una plataforma de terceros que no es propiedad, ni está operada o controlada por el vendedor.

Reconoces expresamente que:

El propietario original o el proveedor de alojamiento puede eliminar, restringir, modificar o finalizar el acceso al Contenido en cualquier momento, con o sin previo aviso.

El vendedor no tiene control sobre la disponibilidad, duración o existencia continua del Contenido.

El acceso puede ser temporal, limitado o interrumpido en cualquier momento.

4. Responsabilidad del comprador de descargar el contenido

Una vez que recibes el acceso, es únicamente tu responsabilidad:

Descargar todo el Contenido que desees conservar.

Almacenar de forma segura los archivos descargados en tus propios dispositivos o sistemas de almacenamiento.

Si no descargas el Contenido antes de que el acceso sea revocado, eliminado o restringido por cualquier motivo, el vendedor no tiene obligación ni capacidad de restaurar el acceso o proporcionar archivos de reemplazo.

5. Sin garantías de acceso continuo

El vendedor no ofrece garantías sobre:

La duración del acceso

La cantidad de archivos disponibles en un momento dado

La permanencia del Contenido

Actualizaciones futuras, reemplazos o nuevas cargas

El acceso puede finalizar en cualquier momento, por cualquier motivo y sin compensación.

6. Política de no reembolso (estricta)

TODAS LAS VENTAS SON FINALES.

Aceptas expresamente que:

No hay reembolsos, contracargos ni cambios bajo ninguna circunstancia.

Esto incluye, entre otros casos:

Pérdida de acceso

Eliminación del Contenido

Insatisfacción con el Contenido

No descargar los archivos a tiempo

Problemas técnicos fuera del control del vendedor

Al completar tu compra, renuncias a cualquier derecho de disputar o revertir el pago.

7. Limitación de responsabilidad

En la máxima medida permitida por la ley:

El vendedor no será responsable por daños directos, indirectos, incidentales, consecuentes o especiales derivados de:

El uso o la imposibilidad de usar el Contenido

La pérdida de acceso

La eliminación de archivos

Acciones de terceros

La responsabilidad total del vendedor, si existiera, nunca excederá el monto pagado por el acceso.

8. Sin garantía

El Contenido se proporciona sin garantías de ningún tipo, expresas o implícitas, incluyendo, entre otras:

Comercialización

Idoneidad para un propósito particular

No infracción

Disponibilidad o integridad del Contenido

9. Aceptación del riesgo por parte del usuario

Al comprar este producto, reconoces y aceptas explícitamente que:

Entiendes que el vendedor no es el propietario del Contenido.

Entiendes que el acceso puede finalizar en cualquier momento.

Aceptas total responsabilidad por descargar y almacenar el Contenido.

Aceptas que no se emitirán reembolsos por ningún motivo.

10. Cambios en los términos

El vendedor se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. El uso continuado del producto constituye la aceptación de los Términos actualizados.

11. Legislación aplicable

Estos Términos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción del vendedor, sin considerar principios de conflicto de leyes.`;

  return (
    <section className={`${sectionBase} space-y-4`}>
      <h2 className="text-xl font-semibold">Términos y condiciones</h2>
      <div className="text-xs leading-relaxed text-white/75 whitespace-pre-wrap">{terms}</div>
      {/* <CTAButton onClick={onCtaClick} className="mt-4" /> */}
    </section>
  );
}

export function ClipsFinalAck({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#FACC15]">Aceptación final</p>
      <h2 className="text-2xl font-semibold my-4">Al comprar y acceder a este producto, confirmas que has leído, comprendido y aceptado en su totalidad todos los Términos y Condiciones anteriores.</h2>
      <p className="text-[10px] text-white/70 mt-3">
        Si compraste y no obtuviste tu correo de acceso, escribe a{' '}
        <a href="mailto:dmaditative.state@gmail.com" className="underline text-[#F97316]">
          dmaditative.state@gmail.com
        </a>{' '}
        para recibir tu acceso.
      </p>
      {/* <CTAButton onClick={onCtaClick} variant="gradient" /> */}
    </section>
  );
}
