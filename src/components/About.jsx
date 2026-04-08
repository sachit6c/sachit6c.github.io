import { Briefcase, Award, GraduationCap, ExternalLink, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const [expRef, expVisible] = useScrollAnimation()
  const experience = [
    {
      company: 'Deloitte Consulting LLP',
      role: 'Senior Consultant / Delivery Lead / Product Owner',
      period: 'Jul 2018 – Present',
      location: 'New York, NY',
      problem: 'Leading enterprise technology programs for Fortune 500 clients across financial services, healthcare, and pharma — each with distinct complexity: scale, GenAI product ownership, and Agile coaching.',
      solution: 'Served as Onsite Delivery Lead, Product Owner across Gen AI pods, and Agile coach — simultaneously across 26 squads, 185 members, and 335K budgeted hours.',
      delivery: [
        '🎯 Scale: Orchestrated 3 PI planning cycles with 91% on-time delivery across 26 squads — securing a $1.75M SOW extension',
        '🤖 GenAI: Served as PO across multiple Gen AI pods at Pfizer — managing backlogs for LLM-powered market intelligence tools and defining acceptance criteria for non-deterministic outputs',
        '📈 Growth: Led 2 high-performing pods delivering 11 major releases across 16 sprints, tripling the client user base; recognized by MD of Consulting as the "most visible team in the Pfizer program"',
        '💡 Efficiency: Implemented Jira automation eliminating 20+ hours/week of manual work; built cross-pod integration templates saving 1,200+ person-hours annually',
        '🏆 Business Dev: Instrumental in signing 2 RFPs worth $700K; won a 2-quarter contract in competitive bid over AWS vendor by identifying overlooked critical issues',
        '🧑‍🏫 Coaching: Coached delivery leads and BAs across 3 concurrent Eli Lilly projects; increased team velocity 15% through retrospective facilitation and burndown transparency',
      ],
      impact: '26 squads · 185 members · 91% on-time · $5M+ SOWs · 319% user growth · 15% velocity increase (Eli Lilly)',
    },
  ];

  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-zinc-950 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-24 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight">
            Experience
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            8 years at Deloitte Consulting<br className="hidden sm:block" />
            <span className="text-white">Financial Services • Healthcare • Life Sciences</span>
          </p>
        </div>

        {/* Experience Timeline - Apple Card Style */}
        <div ref={expRef} className={`space-y-8 mb-24 scroll-stagger ${expVisible ? 'scroll-visible' : ''}`}>
          {experience.map((exp, idx) => (
            <div 
              key={idx} 
              className="apple-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                  <span className="text-sm text-zinc-400 whitespace-nowrap font-medium">{exp.period}</span>
                </div>
                <p className="text-zinc-300 font-medium text-lg">{exp.company}</p>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Challenge</p>
                <p className="text-zinc-200 text-base leading-relaxed">{exp.problem}</p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Solution</p>
                <p className="text-zinc-200 text-base leading-relaxed">{exp.solution}</p>
              </div>

              {/* Delivery */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Delivery</p>
                <ul className="space-y-2.5">
                  {exp.delivery.map((item, i) => (
                    <li key={i} className="text-zinc-200 text-base leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="pt-6 border-t border-zinc-800">
                <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Impact</p>
                <p className="text-white font-semibold text-base leading-relaxed">{exp.impact}</p>
              </div>

              {/* Learning / Failure - removed for single-entry Deloitte card */}

              {/* Case Study CTA - removed, case studies are in dedicated section */}
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="apple-card">
            <h3 className="text-2xl font-semibold text-white mb-8">Expertise</h3>
            
            {/* Product Management */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Product Management</p>
              <div className="flex flex-wrap gap-2">
                {['Product Strategy', 'Roadmap Planning', 'Stakeholder Management', 'OKRs & KPIs', 'PI Planning', 'Product-Market Fit', 'User Research', 'A/B Testing', 'Go-to-Market'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-200 font-medium border border-zinc-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical & Platforms */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Technical & Platforms</p>
              <div className="flex flex-wrap gap-2">
                {['GenAI/LLMs', 'Enterprise SaaS', 'Mobile Apps (iOS/Android)', 'API Design', 'Cloud Platforms', 'SAMD Compliance', 'FDA 21 CFR Part 11', 'Data Analytics'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-200 font-medium border border-zinc-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodologies */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Methodologies & Frameworks</p>
              <div className="flex flex-wrap gap-2">
                {['SAFe Agile', 'Scrum', 'Lean Product Development', 'Design Thinking', 'Jobs-to-be-Done', 'Continuous Discovery'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-200 font-medium border border-zinc-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Prototyping */}
            <div>
              <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Tools & Prototyping</p>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'JIRA', 'Confluence', 'SQL', 'Miro', 'Amplitude', 'AI-Powered Prototyping', 'Rapid Development'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-200 font-medium border border-zinc-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="apple-card">
            <h3 className="text-2xl font-semibold text-white mb-8">Certifications</h3>
            <ul className="space-y-4">
              <li className="text-zinc-200 text-base font-medium">Certified SAFe® 6 Agilist</li>
              <li className="text-zinc-200 text-base font-medium">Certified Scrum Product Owner (CSPO)</li>
            </ul>

            {/* Domain Experience */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white mb-6">Domain Experience</h3>
              <div className="flex flex-wrap gap-2">
                {['Financial Services', 'Healthcare', 'Life Sciences', 'Pharma', 'Retail', 'Insurance'].map((domain) => (
                  <span key={domain} className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-200 font-medium border border-zinc-800">
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white mb-6">Education</h3>
              <div>
                <p className="text-zinc-200 font-semibold">Thapar University</p>
                <p className="text-zinc-400 text-sm">Bachelor of Technology, Electronics &amp; Instrumentation Control Engineering &middot; 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}