import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Sparkles, Zap, Users, BarChart3, Calendar, AlertTriangle, FileSpreadsheet, Brain, Code2, Figma, Rocket, CheckCircle } from 'lucide-react'

const screenshots = [
  {
    num: 1,
    title: 'Choose your starting point',
    caption: 'The app opens with two paths — guided 6-step onboarding with your own data, or instant demo access with pre-built data. No account needed, no friction.',
  },
  {
    num: 2,
    title: 'Your release portfolio at a glance',
    caption: 'Multi-product dashboard. See all your products, active/upcoming releases, live status (% complete, days left), and health at a glance. The single source of truth your PI Planning spreadsheet was never going to be.',
  },
  {
    num: 3,
    title: 'Drill into a release',
    caption: 'Click any product to see its release roadmap — timeline, version, status, and priority all in one view. No more asking "which version are we on?"',
  },
  {
    num: 4,
    title: 'Smart Release — AI-powered planning',
    caption: 'Drop in your team details and release goals. The engine calculates confidence scores, flags over-allocation, and surfaces risks before you promise a date to stakeholders.',
  },
  {
    num: 5,
    title: 'Plan from PRD — spec in, sprint plan out',
    caption: 'Upload a PRD or paste a product brief. The AI reads it, extracts scope, and maps stories to sprints based on your team\'s actual capacity. The feature that made me most uncomfortable about what PMs will become.',
  },
  {
    num: 6,
    title: 'Team capacity management',
    caption: 'Define your squads, set velocity, add PTO and holidays. The capacity engine propagates this across all releases automatically — no more manually nudging formulas in a spreadsheet.',
  },
  {
    num: 7,
    title: "What's Next — your release radar",
    caption: 'A prioritised view of what\'s coming up across all products. Keeps your whole team aligned on sequencing without a 2-hour PI Planning ceremony every quarter.',
  },
  {
    num: 8,
    title: 'Guided onboarding — zero to planning in 10 minutes',
    caption: 'The 6-step guided flow walks you through creating a product, building a team, importing a PRD, and running your first smart release. Designed for PMs who\'ve never touched a planning tool this opinionated.',
  },
]

const journey = [
  {
    phase: '01',
    emoji: '🎨',
    title: 'The Figma phase',
    duration: 'Week 1',
    color: 'text-purple-400',
    border: 'border-purple-800/50',
    bg: 'bg-purple-950/20',
    body: `My mentor kept saying "it's not scary anymore." I nodded. Opened Figma Make instead.

Because I'm a PM. We prototype. We don't voluntarily open terminal windows.

Version 1. Version 14. Version 35.

It looked amazing. It was going nowhere.`,
  },
  {
    phase: '02',
    emoji: '🤔',
    title: 'The uncomfortable realisation',
    duration: 'Week 1 → Week 2',
    color: 'text-amber-400',
    border: 'border-amber-800/50',
    bg: 'bg-amber-950/20',
    body: `Then I started meta-prompting. Dumping messy thoughts into ChatGPT:
"Turn this into a proper Figma prompt."

Copy. Paste. Generate.

That's when it hit me — AI was building exactly what I asked. Not what I meant.

I was thinking in vague feature blocks. "Build X." What is X? Edge cases? State? Dependencies? Failure conditions?`,
  },
  {
    phase: '03',
    emoji: '💻',
    title: 'Opening VS Code',
    duration: 'Week 2',
    color: 'text-blue-400',
    border: 'border-blue-800/50',
    bg: 'bg-blue-950/20',
    body: `Eventually I hit a wall. Downloaded the ZIP. Opened VS Code.

The first few days were chaos.

Restore. Revert. Console error. Repeat.

But something was shifting.`,
  },
  {
    phase: '04',
    emoji: '⚡',
    title: 'The breakthrough',
    duration: 'Week 2 → Week 3',
    color: 'text-emerald-400',
    border: 'border-emerald-800/50',
    bg: 'bg-emerald-950/20',
    body: `I stopped saying "Build this feature."

And started saying:
"Create this component."
"When X happens, only do Y."
"Here's the exact error. Fix just this."

I broke problems into surgical pieces. And that's when AI became less like a tool — and more like a team.

I literally prompted: "Act as a senior UI/UX designer and a full-stack developer." The way it challenged assumptions felt like working with a squad that never sleeps.`,
  },
  {
    phase: '05',
    emoji: '🚀',
    title: 'Shipped',
    duration: 'Week 3',
    color: 'text-white',
    border: 'border-zinc-600/50',
    bg: 'bg-zinc-900/40',
    body: `Three weeks. Zero PRDs. Live in production.

The portfolio happened on the side — a Friday shower thought turned into a full build by end of day.

If you can think clearly, break problems into small pieces, and accept that AI is extremely literal — you can build.

You don't need to become a developer. But building once will permanently change how you think as a PM.`,
  },
]

const stats = [
  { value: '3', label: 'Weeks to ship', sub: 'From idea to production' },
  { value: '0', label: 'PRDs written', sub: 'Built what felt right' },
  { value: '500+', label: 'Hours of capacity analyzed', sub: 'In simulated load tests' },
  { value: '85%', label: 'Release confidence accuracy', sub: 'Predicting delivery feasibility' },
]

const features = [
  { icon: BarChart3, title: 'Visual Release Timeline', desc: 'Gantt-style planning across multiple products and sprints' },
  { icon: Users, title: 'Capacity Engine', desc: 'Auto-calculates bandwidth with PTO, holidays, and velocity' },
  { icon: AlertTriangle, title: 'Conflict Detection', desc: 'Spots over-allocation and dependency clashes before they happen' },
  { icon: FileSpreadsheet, title: 'CSV / PRD Import', desc: 'PMs live in docs — the tool meets them there' },
  { icon: Brain, title: 'Smart Release AI', desc: 'Confidence scoring: input goals, get a go/no-go read' },
  { icon: Calendar, title: "What's Next Radar", desc: 'Cross-product pipeline visibility without a meeting' },
]

export default function SmartReleasePlannerPage() {
  const [activeShot, setActiveShot] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Sticky back nav */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/#product"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <div className="flex gap-3">
            <a
              href="https://smart-release-planner1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              Try it live
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* ── Hero ── */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-400">Side Project · Built in 3 Weeks</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Smart Release Planner
          </h1>

          <p className="text-2xl text-zinc-400 mb-4 font-light">
            Pre-JIRA clarity for chaotic PI Planning.
          </p>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            A full-stack SaaS tool I built solo — as a PM with no engineering background — after years of managing Fortune 500 releases in Excel spreadsheets. 
            This is the story of building it.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 rounded-2xl overflow-hidden mb-12">
            {stats.map((s, i) => (
              <div key={i} className="bg-zinc-950 px-6 py-6 text-center">
                <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-sm font-semibold text-zinc-300 mb-1">{s.label}</p>
                <p className="text-xs text-zinc-500">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://smart-release-planner1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-100 transition-colors hover:scale-[1.02] transition-transform"
            >
              Try it live
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* ── The Problem ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">The problem I was solving</h2>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-6">
            <p className="text-xl text-zinc-300 leading-relaxed mb-6">
              For years, I ran PI Planning for Fortune 500 clients using Excel. Not by choice — by inertia.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: FileSpreadsheet, label: '12 spreadsheets', sub: 'One per squad, all out of sync' },
                { icon: Users, label: '5 squads', sub: 'Different velocities, overlapping PTO' },
                { icon: Calendar, label: '200+ tickets', sub: 'Manual sprint assignment, zero visibility' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-6 bg-zinc-900 rounded-xl">
                  <Icon size={28} className="mx-auto mb-3 text-zinc-500" />
                  <p className="font-semibold text-white mb-1">{label}</p>
                  <p className="text-sm text-zinc-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
          <blockquote className="border-l-4 border-white pl-6 py-2">
            <p className="text-2xl font-semibold text-white italic">
              "Why am I gatekeeping a Google Sheet?"
            </p>
            <p className="text-zinc-400 mt-2">After the 3rd "can you share the latest version?" Slack message, I decided to build it instead.</p>
          </blockquote>
        </section>

        {/* ── Build Journey ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How a PM learned to ship</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
            Three weeks. Five phases. One uncomfortable truth about AI and what it means to be a builder.{' '}
            <a href="https://www.linkedin.com/posts/sheksharma_productmanagement-buildinpublic-aiassisted-activity-7434082867678445568-XH61" target="_blank" rel="noopener noreferrer" className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300 transition-colors">Read the original post ↗</a>
          </p>

          <div className="space-y-6">
            {journey.map((phase) => (
              <div key={phase.phase} className={`rounded-2xl border ${phase.border} ${phase.bg} p-8`}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="text-3xl mb-1">{phase.emoji}</div>
                    <div className={`text-xs font-mono font-bold ${phase.color}`}>{phase.phase}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                      <span className="text-xs px-3 py-1 bg-zinc-800 rounded-full text-zinc-400 font-medium">{phase.duration}</span>
                    </div>
                    <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-base">
                      {phase.body}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div className="mt-12 text-center py-12 border-t border-b border-zinc-800">
            <p className="text-2xl sm:text-3xl font-semibold text-white max-w-3xl mx-auto leading-snug">
              "If you can think clearly, break problems into small pieces, and accept that AI is extremely literal — you can build."
            </p>
            <p className="text-zinc-500 mt-4 text-sm">— From my{' '}<a href="https://www.linkedin.com/posts/sheksharma_productmanagement-buildinpublic-aiassisted-activity-7434082867678445568-XH61" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-300 transition-colors">LinkedIn post</a>{' '}· March 6, 2026</p>
          </div>
        </section>

        {/* ── What It Does ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What it actually does</h2>
          <p className="text-zinc-400 text-lg mb-12">Six capabilities that replace the spreadsheet stack.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-colors">
                <Icon size={24} className="text-purple-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Screenshots ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product walkthrough</h2>
          <p className="text-zinc-400 text-lg mb-12">8 views. Every feature. Click any screenshot to expand.</p>

          <div className="space-y-16">
            {screenshots.map((s) => (
              <div key={s.num}>
                {/* Screenshot label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                    {s.num}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                </div>

                {/* Image */}
                <div
                  className="relative rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer group"
                  onClick={() => setActiveShot(activeShot === s.num ? null : s.num)}
                >
                  <img
                    src={`/screenshots/srp-${s.num}.png`}
                    alt={s.title}
                    className="w-full block"
                    loading="lazy"
                    decoding="async"
                    width="1400"
                    height="900"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Caption */}
                <p className="mt-4 text-zinc-400 text-base leading-relaxed max-w-3xl">
                  {s.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">How it's built</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Figma, label: 'Figma', desc: '10 years of PI Planning experience → wireframes. 35+ iterations before I accepted it wasn\'t enough.', color: 'text-pink-400' },
              { icon: Code2, label: 'React + TypeScript', desc: 'Component-by-component. No scaffolding shortcuts. Written with GitHub Copilot as co-pilot — emphasis on co.', color: 'text-blue-400' },
              { icon: Sparkles, label: 'Claude + Copilot', desc: 'Used for code generation, debugging, and "Act as a senior full-stack developer" sessions at 11pm.', color: 'text-purple-400' },
              { icon: Rocket, label: 'Vercel', desc: 'Deployed on push. Live within seconds. The developer experience that makes solo shipping feel possible.', color: 'text-white' },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={22} className={color} />
                  <h3 className="font-semibold text-white">{label}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What I'd do differently ── */}
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">What I'd do differently</h2>
          <div className="space-y-4">
            {[
              { point: 'Start in VS Code, not Figma', why: '35 Figma iterations taught me nothing about the product. The first real commit taught me more.' },
              { point: 'Fix the prompt before the code', why: 'Vague prompts = technically correct but completely wrong output. Precision in language is the actual skill.' },
              { point: 'Ship ugly sooner', why: 'I spent a week on animations nobody asked for. Version 1 users don\'t care. They care if it works.' },
            ].map(({ point, why }) => (
              <div key={point} className="flex gap-4 p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
                <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">{point}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="text-center py-16 border-t border-zinc-800">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Try it — no account needed</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Load the demo data and you're in the planner in 10 seconds. The guided flow takes about 10 minutes with your own data.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://smart-release-planner1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-100 transition-colors"
            >
              Try Smart Release Planner
              <ExternalLink size={20} />
            </a>
          </div>
          <Link
            to="/#product"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>
        </section>

      </div>
    </div>
  )
}
