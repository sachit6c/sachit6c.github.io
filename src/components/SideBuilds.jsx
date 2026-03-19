import { Code2, ExternalLink, Github } from 'lucide-react'

const SideBuilds = () => {
  const builds = [
    {
      id: 'pawan-portfolio',
      title: "Pawan Raj's Portfolio",
      context: 'Personal — Friend (Events & Brand Marketing)',
      description:
        "A career story told as a product — translating 7+ years at Nestlé, Abbott & Hershey's into a compelling, self-sustaining portfolio site.",
      stack: ['React 18', 'Vite', 'Tailwind CSS', 'React Router v7'],
      learnings: [
        "Translating someone else's career story — not your own — forces ruthless content hierarchy decisions. You can't default to 'add everything.'",
        'Scoped for zero post-handoff maintenance: no CMS, no server, static by design. Ship and forget was the feature.',
      ],
      gradient: 'from-violet-500 to-indigo-500',
      links: { live: null, github: null },
      status: 'Live',
    },
    {
      id: 'kdp-website',
      title: 'Kreative Dream Productions',
      context: 'Client — Full-service Event Marketing Agency',
      description:
        'Corporate web presence for a multi-country event agency spanning India, UAE, Thailand, and Canada — with a production-grade contact flow.',
      stack: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Zod', 'Resend'],
      learnings: [
        'Multi-country B2B audience meant four simultaneous primary users — forced explicit stakeholder priority ordering before writing a line of code.',
        'Built contact infrastructure with Zod validation and Resend email early — treating the form as a security boundary, not a design afterthought.',
      ],
      gradient: 'from-orange-500 to-amber-500',
      links: { live: null, github: null },
      status: 'Live',
    },
    {
      id: 'todfod-arena',
      title: 'TodFod Arena',
      context: 'Internal — Company Culture & Games Platform',
      description:
        'Live game show platform for seasonal team competitions — host runs on a laptop projector, teams compete in real time on their phones.',
      stack: ['React 19', 'TypeScript', 'Supabase Realtime', 'Radix UI'],
      learnings: [
        'Two simultaneous user types (host on projector + teams on phones) from one data model forced dual UX surface design from day one.',
        'Supabase Realtime latency constraints directly influenced round timer UX — technical architecture and product decisions were inseparable.',
      ],
      gradient: 'from-rose-500 to-red-500',
      links: { live: null, github: null },
      status: 'In Development',
    },
  ]

  return (
    <section id="builds" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-400">Side Builds</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            I Build to Understand
          </h2>

          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Outside of the day job, I build things for real people with real constraints.
            Each project sharpened a PM instinct I couldn&apos;t get from a backlog.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
