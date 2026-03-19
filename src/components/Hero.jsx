import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 relative pt-24">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black opacity-60"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-12">
          {/* Profile Photo - Circular with subtle border */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-zinc-800/50 shadow-2xl">
                <img 
                  src="/profile-photo.jpg" 
                  alt="Shekhar Sharma" 
                  className="w-full h-full object-cover"
                  width="160"
                  height="160"
                  style={{ objectPosition: 'center center' }}
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
            </div>
          </div>

          {/* Status Badge - Apple style */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 border border-zinc-800/50 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <Sparkles size={15} className="text-zinc-400" />
            <span className="text-zinc-300">Available for Product Leadership</span>
          </div>

          {/* Massive Headline - Apple style */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold leading-[0.95] tracking-tight text-white">
            Curious Visionary.
            <br />
            Fast Builder.
            <br />
            <span className="text-zinc-500">Deep Thinker.</span>
          </h1>

          {/* Clean Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto font-normal leading-relaxed">
            Product Manager using AI to ship faster—from rapid prototypes to production scale.<br className="hidden sm:block" />
            <span className="text-white">10 years building for Fortune 500 across healthcare, retail, and life sciences.</span>
          </p>

          {/* CTAs - primary + Calendly */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
            >
              View my work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://calendly.com/sheksharma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-emerald-700 text-emerald-400 rounded-full text-lg font-semibold hover:border-emerald-500 hover:bg-emerald-900/20 transition-smooth hover:scale-[1.02]"
            >
              <Calendar size={20} />
              Book a 30-min intro
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-zinc-700 text-white rounded-full text-lg font-semibold hover:border-zinc-500 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}