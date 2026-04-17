import { ExternalLink, ArrowRight, Zap, BarChart3, Database, FlaskConical, TestTube, GitBranch } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  {
    icon: GitBranch,
    label: 'Snake Draft Engine',
    desc: 'Head-to-head snake drafts with configurable pick order and live draft state.',
    isNew: false,
    accent: 'text-red-400',
    bg: 'bg-zinc-900 border-zinc-800',
  },
  {
    icon: BarChart3,
    label: 'Configurable Points Engine',
    desc: 'Position, pole, sprint, fastest lap, penalties, all tunable per league rules.',
    isNew: false,
    accent: 'text-blue-400',
    bg: 'bg-zinc-900 border-zinc-800',
  },
  {
    icon: Database,
    label: '27 Seasons of History',
    desc: 'Full race data from 2000–2026. CSV-based offline-first with Ergast/OpenF1 API fallback.',
    isNew: true,
    accent: 'text-violet-400',
    bg: 'bg-violet-950/30 border-violet-800/40',
  },
  {
    icon: FlaskConical,
    label: '80%+ Test Coverage',
    desc: 'Vitest unit tests + Playwright E2E covering draft flow, race views, and responsive layouts.',
    isNew: false,
    accent: 'text-emerald-400',
    bg: 'bg-zinc-900 border-zinc-800',
  },
];

export default function Product() {
  const [identityRef, identityVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  return (
    <section id="product" className="py-20 px-6 lg:px-12 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Day job / side builder identity */}
        <div
          ref={identityRef}
          className="flex justify-center mb-12"
        >
          <div className="inline-grid grid-cols-2 rounded-2xl border border-zinc-800 overflow-hidden text-sm font-medium divide-x divide-zinc-800">
            <a
              href="#experience"
              className="flex items-center gap-3 px-6 py-4 bg-zinc-900/60 hover:bg-zinc-800/80 transition-colors cursor-pointer group"
              title="See my work experience"
            >
              <span className="text-base group-hover:scale-110 transition-transform inline-block">☀️</span>
              <div>
                <p className="text-zinc-200 font-semibold leading-tight group-hover:text-white transition-colors">Senior Consultant · Deloitte</p>
                <p className="text-zinc-500 text-xs mt-0.5 group-hover:text-zinc-400 transition-colors">26 squads, Fortune 500 clients ↗</p>
              </div>
            </a>
            <a
              href="https://github.com/sachit6c"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-zinc-950 hover:bg-violet-950/30 transition-colors cursor-pointer group"
              title="See my code on GitHub"
            >
              <span className="text-base group-hover:scale-110 transition-transform inline-block">🌙</span>
              <div>
                <p className="text-violet-300 font-semibold leading-tight group-hover:text-violet-200 transition-colors">Builder · after hours</p>
                <p className="text-zinc-500 text-xs mt-0.5 group-hover:text-zinc-400 transition-colors">Shipping what I wish existed ↗</p>
              </div>
            </a>
          </div>
        </div>

        {/* 2-column content */}
        <div
          ref={contentRef}
          className={`lg:grid lg:grid-cols-2 lg:gap-20 lg:items-start scroll-hidden ${contentVisible ? 'scroll-visible' : ''}`}
        >
          {/* Left: problem + outcomes + CTAs */}
          <div>
            <p className="text-sm text-zinc-400 mb-3">Every F1 fantasy app I tried was either too simple or paywalled. So I built one.</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-4 tracking-tight">
              F1 Fantasy League
            </h2>
            <p className="text-zinc-400 text-xl mb-8 leading-relaxed">
              Full-stack fantasy F1 with head-to-head snake drafts, a configurable points engine, and 27 seasons of race data, deployed with no build step.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                '27 seasons (2000–2026) of historical race data',
                'Configurable scoring: position, pole, sprint, fastest lap, penalties',
                '80%+ unit test coverage + Playwright E2E suites',
              ].map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-zinc-300">
                  <span className="text-red-400 mt-1 shrink-0">→</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://f1-fantasy-v1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
              >
                Try it live
                <ExternalLink size={18} />
              </a>
              <a
                href="https://github.com/sachit6c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-zinc-200 transition-smooth text-sm"
              >
                GitHub
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="mt-12 lg:mt-0 space-y-3">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">What it does</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-700/40 text-red-300 text-xs font-semibold">
                <Zap size={11} />
                Live, free, no signup
              </span>
            </div>
            {features.map(({ icon: Icon, label, desc, isNew, accent, bg }) => (
              <div
                key={label}
                className={`flex items-start gap-4 p-4 rounded-2xl border ${bg} transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="shrink-0 mt-0.5">
                  <Icon size={18} className={accent} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{label}</span>
                    {isNew && (
                      <span className="px-1.5 py-0.5 rounded bg-violet-900/60 border border-violet-600/50 text-violet-300 text-[10px] font-bold uppercase tracking-wide">
                        2026
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            {/* Stack chips */}
            <div className="pt-4 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Vitest', 'Playwright', 'Vercel'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs rounded-full border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
