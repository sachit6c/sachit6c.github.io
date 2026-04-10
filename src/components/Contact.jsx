import { Calendar, Linkedin, Github, Download, CheckCircle2, Target } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-zinc-950 scroll-mt-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-12 tracking-tight">
          Let's connect
        </h2>

        <p className="text-xl sm:text-2xl text-zinc-400 mb-16 leading-relaxed">
          Open to product leadership roles.
        </p>

        {/* Ideal Next Role Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 mb-20 text-left max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-blue-400" size={28} />
            <h3 className="text-2xl font-semibold text-white">What I'm Looking For</h3>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Role Level</h4>
              <p className="text-zinc-200 text-base">Senior Product Manager, Delivery Lead, or Senior Product Owner roles where I can drive strategy across cross-functional programs.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Domain Focus</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">Financial Services / FinTech:</strong> Complex enterprise platforms, digital transformation, compliance-heavy environments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">AI/ML Products:</strong> GenAI applications, LLM-powered tools, AI-assisted enterprise workflows</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">Platform/Delivery:</strong> Large-scale program delivery, cross-functional leadership across 10+ squads</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Company Stage</h4>
              <p className="text-zinc-200 text-base">Enterprise (Fortune 500), Scale-ups (Series B+), or consulting firms where delivery complexity and cross-functional leadership matter.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">What Excites Me</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Large-scale program delivery with real complexity and stakeholder pressure</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">GenAI / LLM product ownership — defining ACs for non-deterministic systems</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Cross-functional leadership across engineering, data science, and business</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Building and coaching high-performing Agile teams</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Not a Good Fit</h4>
              <p className="text-zinc-400 text-sm italic">Pure B2C/consumer social, non-technical PM roles, or companies without engineering/product investment.</p>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <a
            href="https://calendly.com/work-sachitsharma/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
          >
            <Calendar size={18} />
            Schedule an intro
          </a>

          <a
            href="https://www.linkedin.com/in/ssachit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-zinc-700 text-white rounded-full text-sm font-semibold hover:border-zinc-400 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

          <a
            href="https://github.com/sachit6c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-zinc-700 text-white rounded-full text-sm font-semibold hover:border-zinc-400 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
          >
            <Github size={18} />
            GitHub
          </a>

          <a
            href="/Sachit-Sharma-AI-PM-Resume.pdf"
            download="Sachit-Sharma-AI-PM-Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-zinc-700 text-white rounded-full text-sm font-semibold hover:border-zinc-400 hover:bg-zinc-800 transition-smooth hover:scale-[1.02]"
          >
            <Download size={18} />
            Resume
          </a>
        </div>

        <p className="text-zinc-400 text-base font-medium">New York, NY · Open to Hybrid</p>
      </div>
    </section>
  );
}