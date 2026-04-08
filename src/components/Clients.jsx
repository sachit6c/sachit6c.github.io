import { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// =============================================================================
// CONFIG — swap ACTIVE_VARIANT to preview each interaction model:
//   'timeline'  → scroll-driven vertical timeline (default)
//   'tabs'      → sticky logo rail with synced scrolling sections
//   'grid'      → logo grid with animated expand-on-click panel
// =============================================================================
const ACTIVE_VARIANT = 'tabs'

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
    subtitle: 'Connected Logbook & Mobile Platform',
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
      'Built backend modules for Sony\'s SAP Commerce Cloud (Hybris) enterprise e-commerce implementation',
    ],
    metric: { value: 'SAP Hybris', label: 'Commerce Cloud' },
  },
]

// =============================================================================
// LOGO MARKS — inline SVG for consistent scaling via h-X w-auto Tailwind
// =============================================================================
function LogoMark({ id, color, className = '' }) {
  const baseText = {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fill: color,
  }
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
          {/* Globe */}
          <circle cx="13" cy="15" r="11" stroke={color} strokeWidth="1.8" fill="none" />
          <ellipse cx="13" cy="15" rx="5.5" ry="11" stroke={color} strokeWidth="1.8" fill="none" />
          <line x1="2" y1="15" x2="24" y2="15" stroke={color} strokeWidth="1.8" />
          <line x1="4.5" y1="9" x2="21.5" y2="9" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="21" x2="21.5" y2="21" stroke={color} strokeWidth="1.2" />
          {/* Text */}
          <text x="31" y="21" style={{ ...baseText, fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px' }}>AT&amp;T</text>
        </svg>
      )
    case 'chevron':
      return (
        <svg viewBox="0 0 170 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left arm — blue */}
          <path d="M3 5 L14 22" stroke="#4A7AFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Right arm — red-orange */}
          <path d="M25 5 L14 22" stroke="#FF6633" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Wordmark */}
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
// VARIANT A — Horizontal interactive timeline carousel
// =============================================================================
function TimelineVariant() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const swipeStartX = useRef(null)
  const [sectionRef, sectionVisible] = useScrollAnimation()

  const NODE_PX = 152
  const client = CLIENTS[activeIndex]

  const goTo = (idx) => {
    const next = Math.max(0, Math.min(CLIENTS.length - 1, idx))
    if (next === activeIndex) return
    setActiveIndex(next)
  }

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
  }, [activeIndex, sectionVisible])

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
          disabled={activeIndex === CLIENTS.length - 1}
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
            style={{ width: `${CLIENTS.length * NODE_PX}px`, height: '148px' }}
          >
            {/* Base timeline line at y=72 */}
            <div
              className="absolute left-0 right-0 bg-zinc-800"
              style={{ top: '72px', height: '1px' }}
            />

            {CLIENTS.map((c, i) => {
              const isActive = i === activeIndex
              const isPast = i < activeIndex
              return (
                <button
                  key={c.id}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  aria-label={`${c.name} — ${c.period}`}
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
                      opacity: isActive ? 1 : 0.28,
                      transform: isActive ? 'translateY(0)' : 'translateY(3px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                    }}
                  >
                    <span
                      className="text-[11px] font-bold whitespace-nowrap leading-tight"
                      style={{ color: isActive ? c.brandColor : '#a1a1aa' }}
                    >
                      {c.name}
                    </span>
                    <span className="text-[9px] text-zinc-600 whitespace-nowrap mt-[3px] uppercase tracking-wider">
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
                        ? `${c.brandColor}50`
                        : '#27272a',
                      border: `2px solid ${
                        isActive ? c.brandColor : isPast ? `${c.brandColor}80` : '#52525b'
                      }`,
                      boxShadow: isActive
                        ? `0 0 18px ${c.brandColor}90, 0 0 36px ${c.brandColor}40`
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
                      opacity: isActive ? 1 : 0.28,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <span
                      className="text-[10px] font-mono whitespace-nowrap"
                      style={{ color: isActive ? '#d4d4d8' : '#52525b' }}
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
        {CLIENTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${c.name}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: '5px',
              width: i === activeIndex ? '22px' : '5px',
              backgroundColor: i === activeIndex ? client.brandColor : '#3f3f46',
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
              <span className="font-mono tabular-nums">{activeIndex + 1} / {CLIENTS.length}</span>
              <span className="hidden sm:inline opacity-60">· click or use ← → keys</span>
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
// VARIANT B — Sticky logo tabs, scroll-synced
// =============================================================================
function TabsVariant() {
  const [activeId, setActiveId] = useState(CLIENTS[0].id)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.dataset.clientId)
          }
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
      // 56px nav + 56px sticky rail = 112px offset
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Sticky logo rail */}
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
                <LogoMark
                  id={client.id}
                  color={isActive ? client.brandColor : '#71717a'}
                  className="h-6 w-auto"
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Scrollable client sections */}
      <div className="max-w-4xl mx-auto">
        {CLIENTS.map((client, i) => (
          <div
            key={client.id}
            ref={(el) => { sectionRefs.current[i] = el }}
            data-client-id={client.id}
            className="min-h-[65vh] py-20 flex flex-col justify-center"
          >
            {/* Period + industry */}
            <div className="flex items-center gap-2.5 mb-6 flex-wrap">
              <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">
                {client.period}
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ color: client.brandColor, backgroundColor: `${client.brandColor}18` }}
              >
                {client.industry}
              </span>
            </div>

            {/* Logo (large) */}
            <LogoMark id={client.id} color={client.brandColor} className="h-12 w-auto mb-3" />
            <p className="text-zinc-500 text-sm mb-1">{client.subtitle}</p>
            <p className="text-zinc-300 text-sm font-medium mb-10">{client.role}</p>

            {/* Achievements */}
            <div className="space-y-5 mb-10">
              {client.achievements.map((a, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: client.brandColor }}
                  />
                  <p className="text-zinc-300 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* Metric pill */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl self-start"
              style={{
                backgroundColor: `${client.brandColor}12`,
                border: `1px solid ${client.brandColor}30`,
              }}
            >
              <span className="text-3xl font-bold" style={{ color: client.brandColor }}>
                {client.metric.value}
              </span>
              <span className="text-sm text-zinc-400">{client.metric.label}</span>
            </div>

            {/* Divider */}
            {i < CLIENTS.length - 1 && (
              <div className="mt-20 border-t border-zinc-800/40" />
            )}
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
  const rowRefs = useRef([])
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
    rowRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSelect = (id) => {
    if (selectedId === id) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 150)
    }
  }

  const selectedClient = CLIENTS.find((c) => c.id === selectedId)

  return (
    <div>
      {/* Logo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
        {CLIENTS.map((client, i) => {
          const isSelected = selectedId === client.id
          const isVisible = visibleCards.has(i)
          return (
            <button
              key={client.id}
              ref={(el) => { rowRefs.current[i] = el }}
              data-card-index={i}
              onClick={() => handleSelect(client.id)}
              className="flex flex-col items-center justify-center gap-3 aspect-[4/3] rounded-3xl border transition-[border-color,box-shadow,transform,background-color] duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? isSelected ? 'scale(1.03)' : 'scale(1)'
                  : 'translateY(20px)',
                transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, border-color 0.3s, box-shadow 0.3s, background-color 0.3s`,
                backgroundColor: isSelected ? `${client.brandColor}10` : 'rgb(9,9,11)',
                borderColor: isSelected ? `${client.brandColor}55` : 'rgba(63,63,70,0.5)',
                boxShadow: isSelected
                  ? `0 0 0 1px ${client.brandColor}30, 0 8px 32px ${client.brandColor}18`
                  : 'none',
              }}
              aria-pressed={isSelected}
            >
              <LogoMark id={client.id} color={client.brandColor} className="h-8 w-auto" />
              <span className="text-[11px] text-zinc-500 font-medium">{client.period}</span>
            </button>
          )
        })}
      </div>

      {/* Animated expand panel */}
      <div
        ref={panelRef}
        className="overflow-hidden"
        style={{
          maxHeight: selectedClient ? '900px' : '0px',
          transition: 'max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {selectedClient && (
          <div
            className="rounded-3xl border p-6 lg:p-8 mt-3"
            style={{
              backgroundColor: `${selectedClient.brandColor}08`,
              borderColor: `${selectedClient.brandColor}28`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <LogoMark
                  id={selectedClient.id}
                  color={selectedClient.brandColor}
                  className="h-10 w-auto mb-2"
                />
                <p className="text-zinc-500 text-sm">{selectedClient.subtitle}</p>
              </div>
              <div className="flex gap-2 flex-wrap sm:justify-end">
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: selectedClient.brandColor,
                    backgroundColor: `${selectedClient.brandColor}18`,
                  }}
                >
                  {selectedClient.industry}
                </span>
                <span className="text-[11px] font-medium text-zinc-500 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                  {selectedClient.period}
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-300 mb-6">{selectedClient.role}</p>

            {/* Achievements */}
            <div className="space-y-3 mb-6">
              {selectedClient.achievements.map((a, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: selectedClient.brandColor }}
                  />
                  <p className="text-zinc-300 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* Metric */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                backgroundColor: `${selectedClient.brandColor}15`,
                border: `1px solid ${selectedClient.brandColor}25`,
              }}
            >
              <span className="text-2xl font-bold" style={{ color: selectedClient.brandColor }}>
                {selectedClient.metric.value}
              </span>
              <span className="text-xs text-zinc-400 font-medium">{selectedClient.metric.label}</span>
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
export default function Clients() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const [marqueeRef, marqueeVisible] = useScrollAnimation()

  return (
    <section id="clients" className="py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
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

        {/* Logo marquee strip */}
        <div
          ref={marqueeRef}
          className={`relative overflow-hidden mb-20 -mx-6 px-0 lg:-mx-12 scroll-hidden ${marqueeVisible ? 'scroll-visible' : ''}`}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />

          <div className="flex items-center animate-marquee pause-marquee py-2">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={i}
                className="flex items-center shrink-0 px-10"
              >
                <LogoMark id={client.id} color={client.brandColor} className="h-7 w-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Active variant */}
        {ACTIVE_VARIANT === 'timeline' && <TimelineVariant />}
        {ACTIVE_VARIANT === 'tabs' && <TabsVariant />}
        {ACTIVE_VARIANT === 'grid' && <GridVariant />}
      </div>
    </section>
  )
}
