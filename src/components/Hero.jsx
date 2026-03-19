import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="pt-24 pb-16 px-6 sm:px-8 lg:px-12 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black opacity-60 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

          {/* Left — Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-zinc-800/50 shadow-xl">
                <img
                  src="/profile-photo.jpg"
                  alt="Shekhar Sharma"
                  className="w-full h-full object-cover"
                  width="96"
                  height="96"
                  style={{ objectPosition: 'center center' }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-lg -z-10"></div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 text-center sm:text-left space-y-5">

            {/* Name + status */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800/50 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-zinc-300">Available for Product Leadership</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
                Shekhar Sharma
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-medium text-zinc-200">
                Curious Visionary. Fast Builder. Deep Thinker.
              </p>
              <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
                Product Manager using AI to ship faster — from rapid prototypes to production scale.
                10 years building for Fortune 500 across healthcare, retail, and life sciences.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-1">
              <a
                href="#product"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
              >
                View my work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://calendly.com/sheksharma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-emerald-700 text-emerald-400 rounded-full text-sm font-semibold hover:border-emerald-500 hover:bg-emerald-900/20 transition-smooth hover:scale-[1.02]"
              >
                <Calendar size={16} />
                Book a 30-min intro
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}