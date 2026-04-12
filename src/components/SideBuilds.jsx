import { Code2, ExternalLink, Github } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const SideBuilds = () => {
  const [headerRef, headerVisible] = useScrollAnimation()
  const [cardsRef, cardsVisible] = useScrollAnimation()
  const builds = [
    {
      id: '64squares',
      title: '64Squares — Chess Fantasy League',
      context: 'Personal — Chess & Fantasy Sports',
      description:
        'Real-time chess fantasy league with live scoring powered by 30-second Lichess Broadcasts PGN polling. Draft players, track results, compete in leagues.',
      stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'chess.js', 'Python'],
      learnings: [
        'Fuzzy player name matching across 1000+ titled players (Chess.com + FIDE ratings) taught me that data quality is a product problem, not an engineering problem.',
        'Two user types (commissioner managing leagues vs. players tracking scores) from one data model forced explicit permission boundaries from day one — helped me think more carefully about role-based access design.',
      ],
      gradient: 'from-indigo-500 to-violet-500',
      links: { live: 'https://chess-fantasy.vercel.app/', github: null },
      status: 'Live',
    },
    {
      id: 'partner-pomodoro',
      title: 'Partner Pomodoro',
      context: 'Personal — Productivity & Real-Time Collaboration',
      description:
        'A two-user collaborative Pomodoro timer with real-time sync via Supabase WebSocket subscriptions — no accounts required. Partners join by name, stay in sync live, and get completion alerts via synthesized Web Audio API chimes and native OS notifications.',
      stack: ['React', 'Supabase Realtime', 'Web Audio API', 'Notifications API', 'CSS clamp()'],
      learnings: [
        'Designing for zero sign-up friction (name-only onboarding with Supabase RLS row isolation per partner) taught me that the biggest UX barrier is often the first step — every auth field you remove is a reason to stay.',
        'Replacing setInterval with wall-clock diffing (Date.now() at 250ms polls) after discovering background tab throttling showed me that platform behavior is a product constraint, not a dev bug — and that timing bugs are invisible until production.',
      ],
      gradient: 'from-teal-400 to-emerald-500',
      links: { live: 'https://rich-pomodoro.vercel.app/', github: null },
      status: 'Live',
    },
    {
      id: 'f1-fantasy',
      title: 'F1 Fantasy League',
      context: 'Personal — Formula 1 & Fantasy Sports',
      description:
        '27 seasons (2000–2026) of historical race data, head-to-head snake drafts, and a fully configurable points engine for position, pole, sprint, fastest lap, and penalties.',
      stack: ['React', 'TypeScript', 'Vitest', 'Playwright', 'Vercel'],
      learnings: [
        'Building an offline-first CSV data model with dynamic season switching (DataStore.setSeason()) taught me to design for data-access patterns before writing any UI — the schema drove the product.',
        '80%+ unit test coverage with Playwright E2E suites covering draft flow and mobile/tablet/desktop responsiveness showed me how investment in test infrastructure pays off in shipping confidence.',
      ],
      gradient: 'from-red-500 to-orange-500',
      links: { live: 'https://f1-fantasy-v1.vercel.app/', github: null },
      status: 'Live',
    },
  ]

  return (
    <section id="builds" className="py-20 px-6 lg:px-12 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-400">Side Builds</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight">
            I Build to Understand
          </h2>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto">
            Outside of the day job, I build things for real people with real constraints.
            Each project sharpened a PM instinct I couldn&apos;t get from a backlog.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-stagger ${cardsVisible ? 'scroll-visible' : ''}`}>
          {builds.map((build) => (
            <div
              key={build.id}
              className="group relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:scale-[1.02]"
            >
              {/* Gradient accent bar */}
              <div className={`h-2 bg-gradient-to-r ${build.gradient}`} />

              <div className="p-8">
                {/* Context + Status badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-tight">
                    {build.context}
                  </span>
                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      build.status === 'In Development'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {build.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
                  {build.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {build.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {build.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* PM Learnings */}
                <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    PM Learnings
                  </div>
                  {build.learnings.map((learning, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="flex-shrink-0 mt-[7px] w-1 h-1 rounded-full bg-zinc-600" />
                      <p className="text-xs text-zinc-400 leading-relaxed">{learning}</p>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {build.links.live && (
                    <a
                      href={build.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white font-semibold hover:text-zinc-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live site
                    </a>
                  )}
                  {build.links.github && (
                    <a
                      href={build.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 font-semibold hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {!build.links.live && !build.links.github && (
                    <span className="text-sm text-zinc-600 italic">Links coming soon</span>
                  )}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none rounded-3xl bg-gradient-to-br ${build.gradient}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SideBuilds
