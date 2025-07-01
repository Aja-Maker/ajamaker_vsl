'use client';

import { useState, useRef, useEffect } from 'react';

export default function LeftContent() {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      const isMobile = window.innerWidth < 1024;
      if (!expanded && isMobile && contentRef.current) {
        setShowFade(contentRef.current.scrollHeight > contentRef.current.clientHeight);
      } else {
        setShowFade(false);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [expanded]);

  return (
    <section className="w-full max-w-xl mx-auto px-2 relative">
      <div
        ref={contentRef}
        className={`
          space-y-5 text-left pr-2 custom-scroll
          ${expanded ? '' : 'max-h-[350px] overflow-hidden lg:max-h-none lg:overflow-visible'}
        `}
      >
        {/* Title */}
        <h1 className="text-base md:text-lg font-medium text-[#0F172A] leading-snug">
          Fidelizá más, vendé más y hacé que tu negocio esté en boca de todos — sin descuentos ni mensualidades.
        </h1>

        {/* Host details */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="uppercase font-semibold tracking-wide">Marvin Solís · MAKERCASH</p>
          <p>30-40 min</p>
          <p>Detalles del webinar se dan después de registrarse</p>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-[#1E293B] leading-relaxed">
          Conocé cómo MakerCash transforma cada compra en una oportunidad de recompra y recomendación orgánica, sin descuentos agresivos ni suscripciones mensuales.
        </p>

        <p className="text-sm text-[#1E293B] leading-relaxed">
          En este encuentro en vivo vas a descubrir un sistema validado, diseñado para negocios con buen producto y atención al cliente, que desean generar crecimiento sostenido a través de quienes ya los conocen y valoran.
        </p>

        {/* Webinar points */}
        <div className="space-y-3 pt-2">
          <p className="text-sm font-semibold text-[#0F172A]">
            ¿QUÉ VAS A VER EN ESTE WEBINAR?
          </p>
          <ul className="list-disc list-inside text-sm text-[#1E293B] space-y-1">
            <li>Cómo motivar la recompra de tus clientes sin necesidad de promociones.</li>
            <li>Cómo activar recomendaciones de tu negocio sin comisiones ni intermediarios.</li>
            <li>Por qué MakerCash da más control y mejores márgenes que los modelos tradicionales de fidelización.</li>
            <li>Cómo podés formar parte del grupo inicial de negocios que activan este sistema en agosto.</li>
          </ul>
        </div>

        <p className="text-sm text-[#1E293B] leading-relaxed">
          Si tenés un negocio con buen producto y atención al cliente, esto podría ser lo que estabas buscando para crecer de forma sostenible.
        </p>

        <p className="text-sm font-medium text-[#0F172A] leading-relaxed">
          Agenda tu espacio y conocé el modelo que está generando resultados donde otros solo prometen.
        </p>
      </div>

      {/* Fade effect (mobile only) */}
      {!expanded && showFade && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent lg:hidden pointer-events-none" />
          <div className="absolute bottom-2 left-0 right-0 flex justify-center lg:hidden">
            <button
              onClick={() => setExpanded(true)}
              className="text-xs font-semibold text-[#0F172A] uppercase"
            >
              VER MÁS
            </button>
          </div>
        </>
      )}
    </section>
  );
}
