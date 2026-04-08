import { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// =============================================================================
// CONFIG — swap ACTIVE_VARIANT to preview each client interaction model:
//   'timeline'  → scroll-driven vertical timeline (default)
//   'tabs'      → sticky logo rail with synced scrolling sections
//   'grid'      → logo grid with animated expand-on-click panel
// =============================================================================
const ACTIVE_VARIANT = 'timeline'

// =============================================================================
// DATA
// =============================================================================
const CLIENTS = [
  {
    id: 'fis',
    name: 'FIS',
    subtitle: 'TRP / FIS Program',
    period: '2025',
    role: 'Onsite Delivery Lead',
    industry: 'Financial Services',
    brandColor: '#4A9EFF',
    achievements: [
      'Led 26 squads (185 members, 335K budgeted hours) across 3 complete PI planning cycles — 91% on-time delivery',
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
      'Signed 2 RFPs worth $700K — outcompeted AWS in a head-to-head bid by uncovering critical overlooked issues',
      'Led GenAI pods for Market Competitive Intelligence and Pre-Opportunity Identification across multiple LLMs',
      'Tripled client user base across 11 major releases / 16 sprints — named "most visible team in the Pfizer program"',
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
      'Launched ConLog, LillyPlus & Snapshare (iOS & Android) — client called ConLog "the best app they had ever encountered"',
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
    industry: 'Consumer Electronics',
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
    context: '185 members across 3 PI cycles — Onsite Delivery Lead orchestrating 335K budgeted hours.',
    domain: 'Deloitte · TRP/FIS',
  },
  {
    value: '91%',
    label: 'On-Time Delivery',
    context: '91% on-time delivery across all 3 PI planning cycles — securing a $1.75M SOW extension.',
    domain: 'Deloitte · Delivery Excellence',
  },
  {
    value: '319%',
    label: 'User Growth',
    context: 'Led 2 pods delivering 11 major releases across 16 sprints — tripling the client user base.',
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
  const baseText = { fontFamily: "'Helvetica Neue', Arial, sans-serif", fill: color }
  switch (id) {
    case 'fis':
      return (
        <svg viewBox="0 0 72 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="24" style={{ ...baseText, fontSize: '28px', fontWeight: '900', letterSpacing: '-0.5px' }}>FIS</text>
        </svg>
      )
    case 'pfizer':
      return (
        <svg viewBox="0 0 110 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="24" style={{ ...baseText, fontSize: '24px', fontWeight: '700', fontStyle: 'italic' }}>Pfizer</text>
        </svg>
      )
    case 'lilly':
      return (
        <svg viewBox="0 0 88 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="24" style={{ ...baseText, fontSize: '24px', fontWeight: '700' }}>Lilly</text>
        </svg>
      )
    case 'hpe':
      return (
        <svg viewBox="0 0 68 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="24" style={{ ...baseText, fontSize: '24px', fontWeight: '700' }}>hpe</text>
        </svg>
      )
    case 'att':
      return (
        <svg viewBox="0 0 112 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="15" r="11" stroke={color} strokeWidth="1.8" fill="none" />
          <ellipse cx="13" cy="15" rx="5.5" ry="11" stroke={color} strokeWidth="1.8" fill="none" />
          <line x1="2" y1="15" x2="24" y2="15" stroke={color} strokeWidth="1.8" />
          <line x1="4.5" y1="9" x2="21.5" y2="9" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="21" x2="21.5" y2="21" stroke={color} strokeWidth="1.2" />
          <text x="31" y="21" style={{ ...baseText, fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px' }}>AT&amp;T</text>
        </svg>
      )
    case 'chevron':
      return (
        <svg viewBox="0 0 170 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5 L14 22" stroke="#4A7AFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M25 5 L14 22" stroke="#FF6633" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <text x="36" y="21" style={{ ...baseText, fontSize: '15px', fontWeight: '800', letterSpacing: '2px', fill: '#4A7AFF' }}>CHEVRON</text>
        </svg>
      )
    case 'sony':
      return (
        <svg viewBox="0 0 95 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="23" style={{ ...baseText, fontSize: '21px', fontWeight: '700', letterSpacing: '4px' }}>SONY</text>
        </svg>
      )
    default:
      return null
  }
}

// =============================================================================
// VARIANT A — Scroll-driven vertical timeline
// =============================================================================
function TimelineVariant() {
  const rowRefs = useRef([])
  const [visibleRows, setVisibleRows] = useState(new Set())
  const [lineRef, lineVisible] = useScrollAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleRows((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number(entry.target.dataset.rowIndex))
              observer.unobserve(entry.target)
            }
          })
          return next
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    rowRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative" ref={lineRef}>
        <div
          className="absolute left-0 top-8 bottom-4 w-px bg-zinc-800/80"
          style={{
            transformOrigin: 'top',
            transform: lineVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'transform 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {CLIENTS.map((client, i) => (
          <div
            key={client.id}
            ref={(el) => { rowRefs.current[i] = el }}
            data-row-index={i}
            className="pl-10 pb-12 relative"
            style={{
              opacity: visibleRows.has(i) ? 1 : 0,
              transform: visibleRows.has(i) ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${i * 70}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${i * 70}ms`,
            }}
          >
            <div
              className="absolute left-[-5px] top-[22px] w-2.5 h-2.5 rounded-full border-2 bg-black z-10"
              style={{ borderColor: client.brandColor }}
            />

            <div className="flex items-center gap-2.5 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">{client.period}</span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ color: client.brandColor, backgroundColor: `${client.brandColor}18` }}
              >
                {client.industry}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 lg:p-8 hover:border-zinc-700/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <LogoMark id={client.id} color={client.brandColor} className="h-8 w-auto mb-2" />
                  <p className="text-zinc-500 text-sm">{client.subtitle}</p>
                </div>
                <p className="text-sm font-medium text-zinc-300 sm:text-right shrink-0 sm:max-w-[220px]">{client.role}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {client.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: client.brandColor, opacity: 0.6 }}
                    />
                    {a}
                  </li>
                ))}
              </ul>

              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl"
                style={{ color: client.brandColor, backgroundColor: `${client.brandColor}12`, border: `1px solid ${client.brandColor}25` }}
              >
                <span className="text-lg font-bold">{client.metric.value}</span>
                <span className="text-xs font-medium opacity-70">{client.metric.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// VARIANT B — Sticky logo tabs, scroll-synced
// =============================================================================
function TabsVariant() {
  const [activeId, setActiveId] = useState(CLIENTS[0].id)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.dataset.clientId)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToClient = (id) => {
    const idx = CLIENTS.findIndex((c) => c.id === id)
    const el = sectionRefs.current[idx]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="sticky top-14 z-40 bg-black/95 backdrop-blur-md border-b border-zinc-800/60 -mx-6 px-6 lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3 max-w-7xl mx-auto">
          {CLIENTS.map((client) => {
            const isActive = activeId === client.id
            return (
              <button
                key={client.id}
                onClick={() => scrollToClient(client.id)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.35,
                  backgroundColor: isActive ? `${client.brandColor}15` : 'transparent',
                  transform: isActive ? 'scale(1.02)' : 'scale(0.97)',
                }}
                aria-pressed={isActive}
              >
                <LogoMark id={client.id} color={isActive ? client.brandColor : '#71717a'} className="h-6 w-auto" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {CLIENTS.map((client, i) => (
          <div
            key={client.id}
            ref={(el) => { sectionRefs.current[i] = el }}
            data-client-id={client.id}
            className="min-h-[65vh] py-20 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2.5 mb-6 flex-wrap">
              <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">{client.period}</span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ color: client.brandColor, backgroundColor: `${client.brandColor}18` }}
              >{client.industry}</span>
            </div>

            <LogoMark id={client.id} color={client.brandColor} className="h-12 w-auto mb-3" />
            <p className="text-zinc-500 text-sm mb-1">{client.subtitle}</p>
            <p className="text-zinc-300 text-sm font-medium mb-10">{client.role}</p>

            <div className="space-y-5 mb-10">
              {client.achievements.map((a, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: client.brandColor }} />
                  <p className="text-zinc-300 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl self-start"
              style={{ backgroundColor: `${client.brandColor}12`, border: `1px solid ${client.brandColor}30` }}
            >
              <span className="text-3xl font-bold" style={{ color: client.brandColor }}>{client.metric.value}</span>
              <span className="text-sm text-zinc-400">{client.metric.label}</span>
            </div>

            {i < CLIENTS.length - 1 && <div className="mt-20 border-t border-zinc-800/40" />}
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// VARIANT C — Logo grid → expand panel on click
// =============================================================================
function GridVariant() {
  const [selectedId, setSelectedId] = useState(null)
  const panelRef = useRef(null)
  const cardRefs = useRef([])
  const [visibleCards, setVisibleCards] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number(entry.target.dataset.cardIndex))
              observer.unobserve(entry.target)
            }
          })
          return next
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSelect = (id) => {
    if (selectedId === id) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150)
    }
  }

  const selected = CLIENTS.find((c) => c.id === selectedId)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
        {CLIENTS.map((client, i) => {
          const isSelected = selectedId === client.id
          const isVisible = visibleCards.has(i)
          return (
            <button
              key={client.id}
              ref={(el) => { cardRefs.current[i] = el }}
              data-card-index={i}
              onClick={() => handleSelect(client.id)}
              className="flex flex-col items-center justify-center gap-3 aspect-[4/3] rounded-3xl border"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? (isSelected ? 'scale(1.03)' : 'scale(1)') : 'translateY(20px)',
                transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, border-color 0.3s, box-shadow 0.3s, background-color 0.3s`,
                backgroundColor: isSelected ? `${client.brandColor}10` : 'rgb(9,9,11)',
                borderColor: isSelected ? `${client.brandColor}55` : 'rgba(63,63,70,0.5)',
                boxShadow: isSelected ? `0 0 0 1px ${client.brandColor}30, 0 8px 32px ${client.brandColor}18` : 'none',
              }}
              aria-pressed={isSelected}
            >
              <LogoMark id={client.id} color={client.brandColor} className="h-8 w-auto" />
              <span className="text-[11px] text-zinc-500 font-medium">{client.period}</span>
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        className="overflow-hidden"
        style={{ maxHeight: selected ? '900px' : '0px', transition: 'max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {selected && (
          <div
            className="rounded-3xl border p-6 lg:p-8 mt-3"
            style={{ backgroundColor: `${selected.brandColor}08`, borderColor: `${selected.brandColor}28` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <LogoMark id={selected.id} color={selected.brandColor} className="h-10 w-auto mb-2" />
                <p className="text-zinc-500 text-sm">{selected.subtitle}</p>
              </div>
              <div className="flex gap-2 flex-wrap sm:justify-end">
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: selected.brandColor, backgroundColor: `${selected.brandColor}18` }}
                >{selected.industry}</span>
                <span className="text-[11px] font-medium text-zinc-500 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">{selected.period}</span>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-300 mb-6">{selected.role}</p>

            <div className="space-y-3 mb-6">
              {selected.achievements.map((a, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: selected.brandColor }} />
                  <p className="text-zinc-300 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ backgroundColor: `${selected.brandColor}15`, border: `1px solid ${selected.brandColor}25` }}
            >
              <span className="text-2xl font-bold" style={{ color: selected.brandColor }}>{selected.metric.value}</span>
              <span className="text-xs text-zinc-400 font-medium">{selected.metric.label}</span>
            </div>
          </div>
        )}
      </div>
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
              <div key={i} className="flex items-center shrink-0 px-10">
                <LogoMark id={client.id} color={client.brandColor} className="h-7 w-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Active client variant ── */}
        <div className="mb-32">
          {ACTIVE_VARIANT === 'timeline' && <TimelineVariant />}
          {ACTIVE_VARIANT === 'tabs' && <TabsVariant />}
          {ACTIVE_VARIANT === 'grid' && <GridVariant />}
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
