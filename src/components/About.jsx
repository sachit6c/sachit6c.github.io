import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const [headerRef, headerVisible] = useScrollAnimation()

  return (
    <section id="about" className="py-20 px-6 lg:px-12 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight">
            Under the hood.
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            The craft, the tools, the certs.
          </p>
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
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-200 font-semibold">Thapar University</p>
                  <p className="text-zinc-400 text-sm">Bachelor of Technology, Electronics &amp; Instrumentation Control Engineering &middot; 2018</p>
                  <p className="text-zinc-500 text-xs mt-1">Scholarship Student</p>
                </div>
                <div>
                  <p className="text-zinc-200 font-semibold">DRDO — Defence Research &amp; Development Organisation</p>
                  <p className="text-zinc-400 text-sm">Engineering Intern &middot; 2017</p>
                  <p className="text-zinc-500 text-xs mt-1">Automated wheelchair controlled by eye-tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}