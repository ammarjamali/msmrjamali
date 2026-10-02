import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Upload headshots to Supabase Storage → product-images/site-assets/
// then replace these nulls with the real URLs
const HEADSHOTS = {
  hakimuddin: 'https://rqmsfqcbtlipmibukqwk.supabase.co/storage/v1/object/public/product-images/site-assets/headshot-hakimuddin.jpg',
  qutbuddin:  'https://rqmsfqcbtlipmibukqwk.supabase.co/storage/v1/object/public/product-images/site-assets/headshot-qutbuddin.jpg',
  ammar:      'https://rqmsfqcbtlipmibukqwk.supabase.co/storage/v1/object/public/product-images/site-assets/headshot-ammar.jpg',
}

const NAME_PARTS = [
  { letter: 'M', expansion: 'Mulla\u00A0' },
  { letter: 'S', expansion: 'Sajjad\u00A0Hussain\u00A0' },
  { letter: 'M', expansion: 'Mulla\u00A0' },
  { letter: 'R', expansion: 'Rajab\u00A0Ali\u00A0' },
]

const TIMELINE = [
  {
    key: 'hakimuddin',
    name: 'Shk. Hakimuddin Jamali',
    relation: 'Son of MSMR Jamali',
    generation: '2nd Generation',
    note: null,
  },
  {
    key: 'qutbuddin',
    name: 'Qutbuddin Jamali',
    relation: 'Grandson of MSMR Jamali',
    generation: '3rd Generation',
    note: 'Founded this business',
  },
  {
    key: 'ammar',
    name: 'Ammar Jamali',
    relation: 'Great Grandson of MSMR Jamali',
    generation: '4th Generation',
    note: 'Turning this into Legacy — Revolutionising the Business',
  },
]

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    function onScroll() {
      if (!ref.current) return
      const rect   = ref.current.getBoundingClientRect()
      const total  = ref.current.offsetHeight - window.innerHeight
      const p      = Math.min(Math.max(-rect.top / total, 0), 1)
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return progress
}

function useInView(threshold = 0.3) {
  const ref     = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, vis]
}

function NameExpansion({ progress }) {
  const slot = (index) => {
    const start = index * 0.22
    const end   = start + 0.22
    return Math.min(Math.max((progress - start) / (end - start), 0), 1)
  }

  const fadeIn  = Math.min(Math.max((progress - 0) / 0.08, 0), 1)
  const tagline = Math.min(Math.max((progress - 0.9) / 0.1, 0), 1)

  return (
    <div
      className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white"
      style={{ opacity: progress > 0.98 ? 0 : 1, transition: 'opacity 0.4s' }}
    >
      <div
        className="text-center px-6 max-w-5xl"
        style={{ opacity: fadeIn, transform: `translateY(${(1 - fadeIn) * 20}px)`, transition: 'none' }}
      >
        {/* The expanding name line */}
        <div className="flex flex-wrap justify-center items-baseline leading-tight mb-3" style={{ gap: '0 6px' }}>
          {NAME_PARTS.map((part, i) => {
            const p = slot(i)
            return (
              <span key={i} className="inline-flex items-baseline overflow-hidden" style={{ verticalAlign: 'baseline' }}>
                {/* Full word slides in */}
                <span
                  className="font-bold text-brand-blue whitespace-nowrap overflow-hidden"
                  style={{
                    fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
                    maxWidth: p > 0.01 ? `${p * 500}px` : '0px',
                    opacity: p,
                    display: 'inline-block',
                    transition: 'none',
                  }}
                >
                  {part.expansion}
                </span>
                {/* Abbreviated letter fades out */}
                <span
                  className="font-bold text-brand-blue"
                  style={{
                    fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
                    opacity: 1 - p,
                    maxWidth: p > 0.99 ? '0' : '2em',
                    overflow: 'hidden',
                    display: 'inline-block',
                    transition: 'none',
                  }}
                >
                  {part.letter}
                </span>
              </span>
            )
          })}
          {/* JAMALI never changes */}
          <span
            className="font-bold text-brand-red"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3.5rem)' }}
          >
            JAMALI
          </span>
        </div>

        {/* Tagline fades in at the end */}
        <p
          className="text-brand-charcoal text-base md:text-lg italic mt-4"
          style={{ opacity: tagline, transform: `translateY(${(1 - tagline) * 10}px)`, transition: 'none' }}
        >
          A name that carries four generations of trust.
        </p>

        {/* Scroll hint at the start */}
        <div
          className="mt-12 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(1 - progress * 8, 0) }}
        >
          <p className="text-xs text-brand-charcoal/40 uppercase tracking-widest">Scroll to reveal</p>
          <div className="w-0.5 h-8 bg-brand-charcoal/20 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ person, index }) {
  const [ref, vis] = useInView(0.25)
  const isLeft     = index % 2 === 0
  const headshot   = HEADSHOTS[person.key]

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 md:gap-16 mb-20 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis
          ? 'translateY(0)'
          : `translateY(32px) translateX(${isLeft ? '-20px' : '20px'})`,
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Dot on the centre line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue border-4 border-white shadow-md hidden md:block" />

      {/* Photo */}
      <div className={`flex-shrink-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div
          className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-brand-blue bg-brand-grey flex items-center justify-center shadow-lg"
          style={{ boxShadow: '0 0 0 6px rgba(83,111,191,0.12)' }}
        >
          {headshot ? (
            <img src={headshot} alt={person.name} className="w-full h-full object-cover" />
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-brand-charcoal/25">
              <circle cx="12" cy="8" r="4.5" />
              <path d="M3 21c0-5 4-8.5 9-8.5s9 3.5 9 8.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Text */}
      <div className={`flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-full mb-2">
          {person.generation}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-1">
          {person.name}
        </h3>
        <p className="text-sm text-brand-charcoal/60 mb-2">{person.relation}</p>
        {person.note && (
          <p className="text-sm font-semibold text-brand-charcoal italic">
            — {person.note}
          </p>
        )}
      </div>
    </div>
  )
}

function About() {
  const scrollRef = useRef(null)
  const progress  = useScrollProgress(scrollRef)

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-3">About MSMR Jamali</h1>
          <p className="text-lg text-gray-300 italic">Manufacturing Quality, Trading Honestly</p>
        </div>
      </section>

      {/* ─── Scroll-driven name expansion ─── */}
      <section ref={scrollRef} style={{ height: '380vh' }}>
        <NameExpansion progress={progress} />
      </section>

      {/* ─── Family timeline ─── */}
      <section className="bg-gradient-to-b from-white to-brand-grey/20 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-brand-navy mb-3">Four Generations. One Name.</h2>
            <p className="text-brand-charcoal max-w-lg mx-auto">
              The Jamali family legacy — built on trust, carried forward through each generation.
            </p>
          </div>

          <div className="relative">
            {/* Centre vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-blue/15 -translate-x-1/2 hidden md:block" />
            {TIMELINE.map((person, i) => (
              <TimelineItem key={person.key} person={person} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Business story ─── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">From trading to manufacturing</h2>
        <p className="text-brand-charcoal leading-relaxed">
          MSMR Jamali's roots go back to 1953 — decades of trading experience and trust that,
          in 2013, we brought into the manufacturing of commercial-grade steel storage solutions.
          Today, we specialize in engineering heavy-duty furniture built to handle the daily
          wear-and-tear of busy workspaces, record rooms, and industrial facilities.
        </p>
      </section>

      <section className="bg-brand-grey/40">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">Our manufacturing standards</h2>
          <p className="text-brand-charcoal leading-relaxed mb-4">
            We build our products — from Slotted Angle Racks to Supermarket Display Racks — with strict
            attention to structural integrity. Rather than cutting corners to produce a cheaper rack,
            we focus on exact specifications: our slotted angles are formed with accurate L-shape
            geometry and precise punching, ensuring perfect alignment and even load distribution.
          </p>
          <p className="text-brand-charcoal leading-relaxed">
            We categorize our steel strictly by accurate gauges — Light, Medium, and Heavy — so our
            storage units outlast cheaper alternatives.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">Our core promise</h2>
        <p className="text-brand-charcoal leading-relaxed mb-10">
          If you leave with one understanding about MSMR Jamali, it should be our commitment
          to absolute transparency.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white border border-brand-grey rounded-lg p-6">
            <h3 className="text-lg font-bold text-brand-blue mb-2">Fix Rate — "Ek Daam"</h3>
            <p className="text-sm text-brand-charcoal leading-relaxed">
              No time wasted on bargaining — just honest, upfront pricing from the start.
            </p>
          </div>
          <div className="bg-white border border-brand-grey rounded-lg p-6">
            <h3 className="text-lg font-bold text-brand-red mb-2">True Gauge Guarantee</h3>
            <p className="text-sm text-brand-charcoal leading-relaxed">
              We deliver the exact steel thickness we promise. If our gauge isn't exactly what
              we pitched, we offer a 100% money-back refund.
            </p>
          </div>
        </div>

        <p className="text-brand-navy font-semibold mt-10 text-center text-lg">
          You get the exact strength you pay for.
        </p>

        <div className="text-center mt-8">
          <Link
            to="/quote"
            className="inline-block bg-brand-red text-white font-semibold px-8 py-3.5 rounded-md hover:bg-red-600 transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About