import { Clock, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const CaseStudies = () => {
  const [headerRef, headerVisible] = useScrollAnimation()
  const [whyRef, whyVisible] = useScrollAnimation()
  const [cardsRef, cardsVisible] = useScrollAnimation()
  const caseStudies = [
    {
      id: 'pfizer-genai',
      title: 'GenAI Product Owner: LLM-Powered Market Intelligence',
      company: 'Deloitte (Life Sciences)',
      hook: 'Serving as PO across multiple Gen AI pods simultaneously, managing backlogs for LLM-powered market intelligence and pre-opportunity identification tools used across Pfizer.',
      metrics: [
        { value: 'Multi-pod', label: 'Concurrent PO' },
        { value: 'LLMs', label: 'Non-deterministic ACs' },
        { value: '2 geos', label: 'US + Greece' }
      ],
      skills: ['GenAI/LLMs', 'Backlog Management', 'Stakeholder Alignment', 'AI Product Strategy'],
      readTime: '10 min',
      gradient: 'from-purple-500 to-pink-500',
      published: false
    },
    {
      id: 'trpfis-delivery',
      title: '26-Squad Program: Delivery Leadership at Scale',
      company: 'Deloitte (Financial Services)',
      hook: 'Onsite Delivery Lead for 26 squads and 185 members across 335K budgeted hours, orchestrating year-over-year PI planning at 91% on-time delivery and securing a $1.75M SOW extension.',
      metrics: [
        { value: '26 squads', label: '185 members' },
        { value: '91%', label: 'On-time delivery' },
        { value: '$1.75M', label: 'SOW extension' }
      ],
      skills: ['Program Delivery', 'PI Planning', 'Stakeholder Management', 'Risk Mitigation'],
      readTime: '8 min',
      gradient: 'from-blue-500 to-cyan-500',
      published: false
    },
    {
      id: 'eli-lilly-po',
      title: 'Agile Product Ownership: Coaching & Velocity at Eli Lilly',
      company: 'Deloitte (Healthcare)',
      hook: 'Product Owner and Agile coach across 3 concurrent Eli Lilly projects, driving 15% velocity increase through retrospective facilitation, burndown transparency, and pre-release bug-bash sessions.',
      metrics: [
        { value: '+15%', label: 'Sprint velocity' },
        { value: '3 projects', label: 'Concurrent' },
        { value: '8 defects', label: 'Pre-release' }
      ],
      skills: ['Product Ownership', 'Agile Coaching', 'Scrum', 'SAFe'],
      readTime: '6 min',
      gradient: 'from-emerald-500 to-teal-500',
      published: false
    }
  ]

  return (
    <section id="case-studies" className="py-20 px-6 lg:px-12 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-400">Deep Dive Case Studies</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight">
            How I Think & Build
          </h2>
          
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto">
            Beyond bullet points and metrics. These case studies reveal my strategic thinking, 
            decision-making process, failures, and what I learned from each project.
          </p>
        </div>

        {/* Why Three Deloitte Stories */}
        <div ref={whyRef} className={`mb-16 max-w-4xl mx-auto scroll-hidden ${whyVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Why Three Deloitte Stories?</h3>
            <p className="text-zinc-300 leading-relaxed mb-4">
              At Deloitte I've had the rare opportunity to work across three distinct delivery challenges that most PMs never encounter in one career:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">AI Product Ownership (Life Sciences)</div>
                  <div className="text-sm text-zinc-400">PO across multiple Gen AI pods, handling backlog management for LLM tools, acceptance criteria for non-deterministic outputs</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Scale Delivery (Financial Services)</div>
                  <div className="text-sm text-zinc-400">26-squad program lead: PI planning, risk mitigation, $5M+ SOW portfolio, 91% on-time delivery</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold">3</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Agile PO + Coaching (Healthcare)</div>
                  <div className="text-sm text-zinc-400">Product Owner across 3 concurrent Eli Lilly projects: Agile coaching, retrospectives, 15% velocity increase</div>
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-6 italic">
              These stories showcase versatility: I can ship AI products (GenAI PO), lead at scale (26 squads), and coach teams to deliver, all essential for a senior PM or delivery leader role.
            </p>
          </div>
        </div>

        {/* Case Study Cards */}
        <div ref={cardsRef} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-stagger ${cardsVisible ? 'scroll-visible' : ''}`}>
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className={`group relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:scale-[1.02]`}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
              
              <div className="p-8">
                {/* Company Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {study.company}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{study.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
                  {study.title}
                </h3>

                {/* Hook */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {study.hook}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-zinc-800">
                  {study.metrics.map((metric, index) => (
                    <div key={index}>
                      <div className={`text-lg font-semibold ${
                        study.published ? 'text-white' : 'text-zinc-500'
                      }`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-zinc-400 font-medium">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-zinc-500 font-medium text-sm">
                  Full story coming soon
                </div>
              </div>

              {/* Hover Glow Effect */}
              {study.published && (
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${study.gradient} pointer-events-none`} />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-zinc-400 text-sm font-medium">
            More case studies coming soon. Each project taught me something different.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
