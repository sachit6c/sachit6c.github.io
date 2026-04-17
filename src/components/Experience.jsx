import { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

import attLogo from '../assets/logos/att.svg?raw'
import chevronLogo from '../assets/logos/chevron.svg?raw'
import lillyLogo from '../assets/logos/elililly.svg?raw'
import fisLogo from '../assets/logos/fis.svg?raw'
import hpeLogo from '../assets/logos/hewlettpackardenterprise.svg?raw'
import pfizerLogo from '../assets/logos/pfizer.svg?raw'
import sonyLogo from '../assets/logos/sony2.svg?raw'

const LOGO_MAP = {
  fis: fisLogo,
  pfizer: pfizerLogo,
  lilly: lillyLogo,
  hpe: hpeLogo,
  att: attLogo,
  chevron: chevronLogo,
  sony: sonyLogo,
}

// =============================================================================
// DATA
// =============================================================================
const CLIENTS = [
  {
    id: 'fis',
    name: 'FIS Global',
    subtitle: 'TRP / FIS Global Program',
    period: '2025',
    role: 'Onsite Delivery Lead',
    industry: 'Financial Services',
    brandColor: '#3DB54A',
    achievements: [
      'Led 26 squads (185 members, 335K budgeted hours) across year-over-year PI planning cycles with 91% on-time delivery',
      'Secured a $1.75M SOW extension into 2026 through demonstrated program excellence and client satisfaction',
      'Implemented Jira automation saving 20+ hours/week per PM/PO; corrected a 30% hours-estimation gap improving margin predictability',
    ],
    metric: { value: '$1.75M', label: 'SOW Extension' },
  },
  {
    id: 'pfizer',
    name: 'Pfizer',
    subtitle: 'Enterprise Digital & GenAI',
    period: '2023 – 2024',
    role: 'Product Owner / GenAI Lead',
    industry: 'Life Sciences',
    brandColor: '#00AAFF',
    achievements: [
      'Signed 2 RFPs worth $700K, outcompeting AWS in a head-to-head bid by uncovering critical overlooked issues',
      'Led GenAI pods for Market Competitive Intelligence and Pre-Opportunity Identification across multiple LLMs',
      'Tripled client user base across 11 major releases / 16 sprints, named "most visible team in the Pfizer program"',
    ],
    metric: { value: '3×', label: 'User Base Growth' },
  },
  {
    id: 'lilly',
    name: 'Eli Lilly',
    subtitle: 'ConLog, LillyPlus & Snapshare Mobile Apps',
    period: '2019 – 2023',
    role: 'Scrum Master → Delivery Lead → Team Lead',
    industry: 'Healthcare',
    brandColor: '#FF4B4B',
    achievements: [
      'Launched ConLog, LillyPlus & Snapshare (iOS & Android); client called ConLog "the best app they had ever encountered"',
      '319% user growth across 6 releases, including a client-record 2-week release cycle',
      'Won 3 Applause Awards for demo innovation, strategic excellence, and simultaneous MVP delivery',
    ],
    metric: { value: '319%', label: 'User Growth' },
  },
  {
    id: 'hpe',
    name: 'HPE',
    subtitle: 'GreenLake R1',
    period: '2019',
    role: 'Business Analyst',
    industry: 'Technology',
    brandColor: '#00CC88',
    achievements: [
      'Simplified complex cloud-services pricing models for the GreenLake R1 enterprise platform launch',
      'Produced output documentation, presentations, and written deliverables for key product stakeholders',
    ],
    metric: { value: 'GreenLake', label: 'R1 Platform' },
  },
  {
    id: 'att',
    name: 'AT&T',
    subtitle: 'AMP 2.0',
    period: '2019',
    role: 'Business Analyst',
    industry: 'Telecom',
    brandColor: '#00BBEE',
    achievements: [
      'Performed requirement grooming for AMP 2.0, an internal asset-sharing platform serving thousands of enterprise employees',
    ],
    metric: { value: 'AMP 2.0', label: 'Asset Platform' },
  },
  {
    id: 'chevron',
    name: 'Chevron',
    subtitle: 'Chevron 2.0',
    period: '2018 – 2019',
    role: 'Business Analyst',
    industry: 'Energy',
    brandColor: '#5588FF',
    achievements: [
      'Performed requirement grooming for the Chevron 2.0 enterprise web platform modernization initiative',
    ],
    metric: { value: 'Chevron 2.0', label: 'Platform Launch' },
  },
  {
    id: 'sony',
    name: 'Sony',
    subtitle: 'SAP Commerce (Hybris)',
    period: '2018',
    role: 'Hybris Backend Developer',
    industry: 'Gaming',
    brandColor: '#CCCCDD',
    achievements: [
      "Built backend modules for Sony's SAP Commerce Cloud (Hybris) enterprise e-commerce implementation",
    ],
    metric: { value: 'SAP Hybris', label: 'Commerce Cloud' },
  },
]

const METRICS = [
  {
    value: '26 squads',
    label: 'Program Scale',
    context: '185 members across multiple PI cycles as Onsite Delivery Lead, orchestrating 335K budgeted hours.',
    domain: 'Deloitte · TRP / FIS Global',
  },
  {
    value: '91%',
    label: 'On-Time Delivery',
    context: '91% on-time delivery year-over-year across PI planning cycles, securing a $1.75M SOW extension.',
    domain: 'Deloitte · Delivery Excellence',
  },
  {
    value: '319%',
    label: 'User Growth',
    context: 'Led 2 pods delivering 11 major releases across 16 sprints, tripling the client user base.',
    domain: 'Deloitte · Pfizer',
  },
  {
    value: '$5M+',
    label: 'Revenue Influenced',
    context: 'Signed 2 RFPs worth $700K and secured long-term contract extensions across multiple programs.',
    domain: 'Deloitte · Business Development',
  },
]

// =============================================================================
// LOGO MARKS
// =============================================================================
function LogoMark({ id, color, className = '' }) {
  const raw = LOGO_MAP[id]
  if (!raw) return null
  let svg = raw
  // If SVG has width/height but no viewBox, create viewBox from width/height
  if (!svg.includes('viewBox')) {
    const w = svg.match(/width="([^"]+)"/)
    const h = svg.match(/height="([^"]+)"/)
    if (w && h) {
      svg = svg.replace(/<svg\b/, `<svg viewBox="0 0 ${parseFloat(w[1])} ${parseFloat(h[1])}"`)
    }
  }
  // Replace currentColor with explicit white for dark backgrounds (all forms)
  svg = svg.replaceAll('currentColor', '#FFFFFF')
  // FIS: override to FIS green
  if (id === 'fis') {
    svg = svg.replaceAll('fill:#FFFFFF', 'fill:#3DB54A')
    svg = svg.replaceAll('fill="#FFFFFF"', 'fill="#3DB54A"')
  }
  // Pfizer: use Pfizer blue for currentColor-derived fills instead of white
  if (id === 'pfizer') {
    svg = svg.replaceAll('fill:#FFFFFF', 'fill:#00AAFF')
    svg = svg.replaceAll('fill="#FFFFFF"', 'fill="#00AAFF"')
  }
  // AT&T: path "letters" has no fill (inherits black) — set SVG root fill to white
  if (id === 'att') {
    svg = svg.replace(/<svg\b/, '<svg fill="#FFFFFF"')
  }
  // Remove explicit width/height and add responsive sizing
  svg = svg
    .replace(/\bwidth="[^"]*"/, '')
    .replace(/\bheight="[^"]*"/, '')
    .replace(/<svg\b/, '<svg style="height:100%;width:100%;display:block"')
  return (
    <span
      className={className}
      style={{ color: color || '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}


// =============================================================================
// TIMELINE — Horizontal interactive timeline carousel
// =============================================================================
function TimelineVariant() {
  const displayClients = [...CLIENTS].reverse()
  const [activeIndex, setActiveIndex] = useState(displayClients.length - 1)
  const trackRef = useRef(null)
  const swipeStartX = useRef(null)
  const wheelAccRef = useRef(0)
  const wheelLockRef = useRef(false)
  const [sectionRef, sectionVisible] = useScrollAnimation()

  const NODE_PX = 152
  const client = displayClients[activeIndex]

  const goTo = (idx) => {
    const next = Math.max(0, Math.min(displayClients.length - 1, idx))
    if (next === activeIndex) return
    setActiveIndex(next)
  }

  // Trackpad horizontal-swipe navigation
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onWheel = (e) => {
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)
      // Only intercept when horizontal scroll is the dominant axis
      if (absX < 12 || absX < absY) return
      e.preventDefault()
      if (wheelLockRef.current) return
      wheelAccRef.current += e.deltaX
      if (Math.abs(wheelAccRef.current) > 40) {
        const dir = wheelAccRef.current > 0 ? 1 : -1
        setActiveIndex(prev => Math.max(0, Math.min(displayClients.length - 1, prev + dir)))
        wheelAccRef.current = 0
        wheelLockRef.current = true
        setTimeout(() => { wheelLockRef.current = false }, 550)
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep active node centered in the scrollable track
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const center = activeIndex * NODE_PX + NODE_PX / 2 - el.clientWidth / 2
    el.scrollTo({ left: Math.max(0, center), behavior: 'smooth' })
  }, [activeIndex])

  // Keyboard navigation (active when section is visible)
  useEffect(() => {
    if (!sectionVisible) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
      if (e.key === 'ArrowRight') goTo(activeIndex + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, sectionVisible]) // eslint-disable-line react-hooks/exhaustive-deps

  // Touch / pointer swipe
  const onPointerDown = (e) => { swipeStartX.current = e.clientX }
  const onPointerUp = (e) => {
    if (swipeStartX.current === null) return
    const delta = swipeStartX.current - e.clientX
    if (Math.abs(delta) > 48) goTo(delta > 0 ? activeIndex + 1 : activeIndex - 1)
    swipeStartX.current = null
  }

  return (
    <div
      ref={sectionRef}
      className={`scroll-hidden ${sectionVisible ? 'scroll-visible' : ''}`}
    >
      {/* ── Horizontal timeline track ── */}
      <div className="relative mb-8" style={{ userSelect: 'none' }}>

        {/* Left arrow */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous client"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === displayClients.length - 1}
          aria-label="Next client"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          className="overflow-x-auto no-scrollbar mx-12 relative"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ cursor: 'grab' }}
        >
          {/* Edge fade masks */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
          />

          {/* Node row — fixed height so we can position elements relative to the line */}
          <div
            className="relative flex"
            style={{ width: `${displayClients.length * NODE_PX}px`, height: '148px' }}
          >
            {/* Base timeline line at y=72 */}
            <div
              className="absolute left-0 right-0"
              style={{ top: '72px', height: '2px', backgroundColor: '#3f3f46' }}
            />
            {/* Colored progress fill — from first node center to active node center */}
            <div
              style={{
                position: 'absolute',
                top: '71px',
                height: '4px',
                left: `${NODE_PX / 2}px`,
                width: `${Math.max(0, activeIndex) * NODE_PX}px`,
                background: `linear-gradient(to right, ${displayClients[0].brandColor}90, ${displayClients[activeIndex].brandColor})`,
                borderRadius: '2px',
                transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
                zIndex: 1,
              }}
            />

            {displayClients.map((c, i) => {
              const isActive = i === activeIndex
              const isPast = i < activeIndex
              return (
                <button
                  key={c.id}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  aria-label={`${c.name}, ${c.period}`}
                  className="relative flex-shrink-0 focus:outline-none group"
                  style={{ width: `${NODE_PX}px`, height: '148px' }}
                >
                  {/* Name + industry — sits in upper half, pinned to bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '58px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingBottom: '12px',
                      opacity: isActive ? 1 : 0.75,
                      transform: isActive ? 'translateY(0)' : 'translateY(3px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                    }}
                  >
                    <span
                      className="text-[11px] font-bold whitespace-nowrap leading-tight"
                      style={{ color: isActive ? c.brandColor : `${c.brandColor}cc` }}
                    >
                      {c.name}
                    </span>
                    <span className="text-[9px] whitespace-nowrap mt-[3px] uppercase tracking-wider" style={{ color: isActive ? '#a1a1aa' : '#71717a' }}>
                      {c.industry}
                    </span>
                  </div>

                  {/* Dot — centered on the line (y=72) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '72px',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      width: isActive ? '20px' : '10px',
                      height: isActive ? '20px' : '10px',
                      backgroundColor: isActive
                        ? c.brandColor
                        : isPast
                        ? `${c.brandColor}70`
                        : `${c.brandColor}22`,
                      border: `2px solid ${
                        isActive ? c.brandColor : isPast ? c.brandColor : `${c.brandColor}80`
                      }`,
                      boxShadow: isActive
                        ? `0 0 24px ${c.brandColor}cc, 0 0 48px ${c.brandColor}55`
                        : isPast
                        ? `0 0 8px ${c.brandColor}55`
                        : 'none',
                      zIndex: 10,
                      transition:
                        'width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                    }}
                  />

                  {/* Hover ring for inactive nodes */}
                  {!isActive && (
                    <div
                      className="opacity-0 group-hover:opacity-100 rounded-full"
                      style={{
                        position: 'absolute',
                        top: '72px',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '26px',
                        height: '26px',
                        border: `1px solid ${c.brandColor}45`,
                        transition: 'opacity 0.2s ease',
                        zIndex: 9,
                      }}
                    />
                  )}

                  {/* Period — sits in lower half, pinned to top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '82px',
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      opacity: isActive ? 1 : 0.85,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <span
                      className="text-[10px] font-mono whitespace-nowrap"
                      style={{ color: isActive ? '#e4e4e7' : '#a1a1aa' }}
                    >
                      {c.period}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Pill progress indicator ── */}
      <div className="flex items-center justify-center gap-1.5 mb-10">
        {displayClients.map((c, i) => (
          <button
            key={c.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${c.name}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: '5px',
              width: i === activeIndex ? '22px' : '5px',
              backgroundColor: i === activeIndex ? client.brandColor : `${displayClients[i].brandColor}55`,
            }}
          />
        ))}
      </div>

      {/* ── Detail card ── */}
      <div
        key={activeIndex}
        className="rounded-3xl overflow-hidden border"
        style={{
          backgroundColor: '#0a0a0a',
          borderColor: `${client.brandColor}22`,
          animation: 'htCarouselIn 0.42s cubic-bezier(0.4,0,0.2,1) forwards',
        }}
      >
        {/* Brand accent top bar */}
        <div style={{ height: '3px', backgroundColor: client.brandColor, opacity: 0.75 }} />

        <div className="p-6 lg:p-8">
          {/* Header: logo + badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <LogoMark id={client.id} color={client.brandColor} className="h-9 w-auto mb-2" />
              <p className="text-zinc-500 text-sm">{client.subtitle}</p>
            </div>
            <div className="flex gap-2 flex-wrap sm:justify-end items-start">
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ color: client.brandColor, backgroundColor: `${client.brandColor}18` }}
              >
                {client.industry}
              </span>
              <span className="text-[11px] font-medium text-zinc-500 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                {client.period}
              </span>
            </div>
          </div>

          {/* Role */}
          <p className="text-sm font-semibold text-zinc-300 mb-6">{client.role}</p>

          {/* Achievements */}
          <ul className="space-y-3 mb-7">
            {client.achievements.map((a, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                <span
                  className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: client.brandColor, opacity: 0.75 }}
                />
                {a}
              </li>
            ))}
          </ul>

          {/* Footer row: metric + position counter */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl"
              style={{
                color: client.brandColor,
                backgroundColor: `${client.brandColor}12`,
                border: `1px solid ${client.brandColor}25`,
              }}
            >
              <span className="text-lg font-bold">{client.metric.value}</span>
              <span className="text-xs font-medium opacity-70">{client.metric.label}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <span className="font-mono tabular-nums">{activeIndex + 1} / {displayClients.length}</span>
              <span className="hidden sm:inline opacity-60 text-zinc-400">· swipe, trackpad, or ← → keys</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes htCarouselIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}


// =============================================================================
// MAIN EXPORT
// =============================================================================
export default function Experience() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const [marqueeRef, marqueeVisible] = useScrollAnimation()
  const [metricsHeaderRef, metricsHeaderVisible] = useScrollAnimation()
  const [metricsGridRef, metricsGridVisible] = useScrollAnimation()

  return (
    <section id="experience" className="py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">
            8 years at Deloitte Consulting
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            The clients I moved.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Financial Services · Healthcare · Life Sciences · Energy · Technology
          </p>
        </div>

        {/* ── Logo marquee strip ── */}
        <div
          ref={marqueeRef}
          className={`relative overflow-hidden mb-20 -mx-6 lg:-mx-12 scroll-hidden ${marqueeVisible ? 'scroll-visible' : ''}`}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />
          <div className="flex items-center animate-marquee pause-marquee py-2">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div key={i} className="flex items-center justify-center shrink-0 w-44">
                <LogoMark id={client.id} color={client.brandColor} className="h-8 max-w-[120px]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Client timeline ── */}
        <div className="mb-32">
          <TimelineVariant />
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-zinc-800/50 mb-24" />

        {/* ── Impact metrics ── */}
        <div
          ref={metricsHeaderRef}
          className={`text-center mb-12 scroll-hidden ${metricsHeaderVisible ? 'scroll-visible' : ''}`}
        >
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            The numbers I move
          </h3>
          <p className="text-zinc-500 text-lg">From GenAI pods to 26-squad delivery programs.</p>
        </div>

        <div
          ref={metricsGridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger ${metricsGridVisible ? 'scroll-visible' : ''}`}
        >
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 flex flex-col gap-3"
            >
              <p className="text-4xl lg:text-5xl font-semibold text-white leading-none">{metric.value}</p>
              <p className="text-base font-semibold text-zinc-200">{metric.label}</p>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">{metric.context}</p>
              <p className="text-xs text-zinc-600 font-medium uppercase tracking-wider pt-2 border-t border-zinc-800/60">
                {metric.domain}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
