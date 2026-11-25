import JourneySignup from "./signup";

const territories = [
  { name: "Despertar el cuerpo", summary: "Comprende los ritmos que sostienen tu energía.", details: "Alimentación, ayuno, movimiento y sueño: aprenderás a reconocer cuándo cooperas con tu cuerpo y cuándo interfieres con él." },
  { name: "Construir una vida que te sostenga", summary: "Mira más allá de la alimentación y el ejercicio.", details: "Dinero, propósito, fuerza física, relaciones y naturaleza también forman parte del entorno en el que intentas mantener tu salud." },
  { name: "Recuperar el equilibrio", summary: "Aprende a hacer espacio para la pausa.", details: "Descanso, ocio, intimidad, emociones y exposición al sol: una vida que solo acelera necesita aprender a regularse." },
  { name: "Habitar y cuidar tu cuerpo", summary: "Descubre el valor de los pequeños gestos.", details: "Salud bucodental, cuidado personal, postura e hidratación: aquello que repites cada día también merece tu atención." },
  { name: "Aprender a dirigirte", summary: "Participa conscientemente en tus decisiones.", details: "Autoestima, identidad, mentalidad, afirmaciones y rituales: observa los hábitos automáticos y aprende a responder de otra manera." },
  { name: "Descubrir qué sostiene el camino", summary: "No tienes que caminar solo.", details: "Sentido, fe, apoyo y comunidad pueden ayudarte a llevar el conocimiento a la vida cotidiana." },
];

const benefits = [
  "Un mapa para reconocer qué áreas de tu salud necesitan atención.",
  "Un recorrido guiado por seis territorios, sin intentar cambiarlo todo a la vez.",
  "Preguntas prácticas para elegir un ajuste pequeño y sostenible.",
];

function Cta({ label = "Comenzar mi viaje gratis" }: { label?: string }) {
  return <a href="#registro" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#e8c68d] px-8 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#173e38] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f5ddb5]">{label}</a>;
}

export default function JourneyPage() {
  return <main className="min-h-screen bg-[#f7f5ed] text-[#243a35]">
    <section className="relative overflow-hidden bg-[#173e38] px-5 pb-14 pt-14 text-white sm:pt-20">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#e8c68d]/20" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.26em] text-[#e8c68d]">Aformativo University presenta</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">El Viaje hacia la Salud</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed sm:text-2xl">Aprende a comprender tu salud antes de tener que recuperarla.</p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#d3e0d8] sm:text-base">Seis territorios. Una manera más clara de mirar tu cuerpo, tus hábitos y la vida que construyes.</p>
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/20">
          <iframe title="Video El Viaje hacia la Salud" src="https://drive.google.com/file/d/1Wvek3JpTFpOIteWc4PbSUnREvtFiyJsF/preview" className="block h-[300px] w-full sm:aspect-video sm:h-auto" allow="autoplay; fullscreen" allowFullScreen />
        </div>
        <div className="mt-8"><Cta /></div>
        <p className="mt-3 text-xs text-[#d3e0d8]">Inscripción gratuita · Recibe la confirmación por correo</p>
      </div>
    </section>

    <section className="px-5 py-16 sm:py-20"><div className="mx-auto max-w-5xl text-center">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9c714a]">El problema</p>
      <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">Más consejos no siempre traen más claridad</h2>
      <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#52645d]">Dietas, rutinas, suplementos, videos y métodos llegan por separado. Es fácil confundirse o esperar a que algo falle antes de prestar atención. Este viaje propone empezar por conocerte: comprender qué necesita tu cuerpo y qué partes de tu vida influyen en tu bienestar.</p>
      <div className="mt-9 grid gap-3 text-left sm:grid-cols-3">{benefits.map((benefit, index) => <div key={benefit} className="rounded-2xl border border-[#dce4d8] bg-white p-5 shadow-sm"><span className="font-serif text-3xl text-[#bc8b58]">0{index + 1}</span><p className="mt-3 font-medium leading-relaxed">{benefit}</p></div>)}</div>
    </div></section>

    <section className="bg-[#e8eee6] px-5 py-16 sm:py-20"><div className="mx-auto max-w-5xl">
      <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#9c714a]">Tu mapa del viaje</p>
      <h2 className="mt-3 text-center font-serif text-3xl sm:text-4xl">Seis territorios. Un paso a la vez.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-[#52645d]">Explorarás cómo se relacionan tu cuerpo, tu entorno, tus emociones, tus decisiones y el apoyo que te rodea.</p>
      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{territories.map((territory, index) => <details key={territory.name} className="group rounded-2xl bg-white p-5 shadow-sm"><summary className="cursor-pointer list-none"><span className="text-xs font-bold uppercase tracking-widest text-[#9c714a]">Territorio {index + 1}</span><h3 className="mt-2 font-serif text-xl leading-snug">{territory.name}</h3><p className="mt-2 text-sm text-[#52645d]">{territory.summary}</p><span className="mt-3 inline-block text-sm font-bold text-[#9c714a] group-open:hidden">Ver detalles +</span><span className="mt-3 hidden text-sm font-bold text-[#9c714a] group-open:inline-block">Cerrar −</span></summary><p className="mt-4 border-t border-[#e8eee6] pt-4 text-sm leading-relaxed text-[#52645d]">{territory.details}</p></details>)}</div>
      <div className="mt-10 text-center"><Cta /></div>
    </div></section>

    <section className="px-5 py-16 sm:py-20"><div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#9c714a]">Para quién es</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">Si quieres cuidarte, pero no sabes por dónde empezar</h2><p className="mt-5 leading-relaxed text-[#52645d]">Quizá recibes muchos consejos, has intentado cambiar tus hábitos o intuyes que la salud incluye más que alimentación y ejercicio. No necesitas convertirte en experto ni hacerlo todo perfectamente. Necesitas una visión que te ayude a decidir qué merece atención hoy.</p></div>
      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#dce4d8]"><p className="font-serif text-2xl">La meta es consciencia, no perfección.</p><p className="mt-4 leading-relaxed text-[#52645d]">Al final tendrás un mapa más completo de tu salud. Podrás reconocer qué haces bien, qué podrías ajustar y cómo llevar lo aprendido a la vida real.</p><p className="mt-5 text-sm text-[#52645d]">Este recorrido nace de 30 años de investigación y reflexión sobre la salud, la inteligencia y las capacidades humanas, organizadas en cinco libros por su creador.</p></div>
    </div></section>

    <section className="bg-[#173e38] px-5 py-16 text-white"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e8c68d]">Empieza gratis</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">Tu viaje puede comenzar hoy</h2><p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#d3e0d8]">No necesitas esperar a enfermar ni cambiar toda tu vida de una vez. Regístrate y recibe por correo la confirmación de tu inscripción gratuita.</p><div className="mt-7"><Cta label="Sí, quiero comenzar mi viaje" /></div></div></section>

    <section id="registro" className="scroll-mt-6 bg-[#e8eee6] px-5 py-16"><div className="mx-auto max-w-xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#9c714a]">Inscripción gratuita</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">¿Tienes las maletas preparadas?</h2><p className="mt-4 text-[#52645d]">Deja tus datos para recibir la confirmación de tu inscripción a El Viaje hacia la Salud.</p><JourneySignup /></div></section>
  </main>;
}
