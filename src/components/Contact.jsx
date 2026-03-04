import { Mail, Linkedin, Github, Download, CheckCircle2, Target } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-zinc-950">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-12 tracking-tight">
          Let's connect
        </h2>
        
        <p className="text-2xl sm:text-3xl text-zinc-400 mb-16 leading-relaxed">
          Open to product leadership roles.
        </p>

        {/* Ideal Next Role Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 mb-20 text-left max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-blue-400" size={28} />
            <h3 className="text-2xl font-semibold text-white">What I'm Looking For</h3>
          </div>

          <div className="space-y-8">
            {/* Role Level */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Role Level</h4>
              <p className="text-zinc-200 text-base">Senior Product Manager, Principal PM, or Group PM roles where I can drive strategy and mentor other PMs.</p>
            </div>

            {/* Domain Focus */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Domain Focus</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">Healthcare/Life Sciences AI:</strong> GenAI platforms, clinical decision support, regulated medical devices (SAMD)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">AI/ML Products:</strong> GenAI applications, LLM-powered tools, AI-assisted workflows</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200"><strong className="text-white">Platform/Infrastructure:</strong> Building products that enable other teams to move faster</span>
                </div>
              </div>
            </div>

            {/* Company Stage */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Company Stage</h4>
              <p className="text-zinc-200 text-base">Enterprise (Fortune 500), Scale-ups (Series B+), or strategic consulting firms building AI/healthcare products.</p>
            </div>

            {/* What Excites Me */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">What Excites Me</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Complex problems requiring regulatory navigation (FDA, HIPAA, etc.)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">0→1 product building or platform transformation initiatives</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Cross-functional leadership across engineering, data science, clinical, regulatory teams</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-200">Leveraging AI to ship products faster (rapid prototyping, AI-assisted development)</span>
                </div>
              </div>
            </div>

            {/* Deal-Breakers */}
            <div className="pt-6 border-t border-zinc-800">
              <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Not a Good Fit</h4>
              <p className="text-zinc-400 text-sm italic">Pure B2C/consumer social, non-technical PM roles, or companies without engineering/product investment.</p>
            </div>
          </div>
        </div>

        {/* Contact Links - All in One Row */}
        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <a
            href="mailto:sharmashekhar992@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-full text-base font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
          >
            <Mail size={18} />
            Email me
          </a>
          
          <a
            href="https://www.linkedin.com/in/sheksharma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-zinc-700 text-white rounded-full text-base font-semibold hover:border-zinc-500 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          
          <a
            href="https://github.com/shekhar992"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-zinc-700 text-white rounded-full text-base font-semibold hover:border-zinc-500 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
          >
            <Github size={18} />
            GitHub
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-zinc-700 text-white rounded-full text-base font-semibold hover:border-zinc-500 hover:bg-zinc-800 transition-smooth hover:scale-[1.02]"
          >
            <Download size={18} />
            Resume
          </a>
        </div>

        <p className="text-zinc-400 text-base font-medium">Mumbai, India · Open to Remote</p>
      </div>
    </section>
  );
}