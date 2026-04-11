import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function Hero() {
  const metrics = [
    { value: '8+ yrs', label: 'Deloitte Consulting', sub: 'Financial Services, Healthcare, Pharma' },
    { value: '26 squads', label: 'Program Scale', sub: '185 members, 3 PI cycles' },
    { value: '91%', label: 'On-Time Delivery', sub: 'Across 3 consecutive PI cycles' },
    { value: '$5M+', label: 'SOWs Won', sub: 'RFPs signed & competitive bids' },
  ];

  return (
    <section id="hero" className="relative pt-24 pb-0 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Profile photo */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-zinc-700/60 shadow-2xl">
              <img
                src="/profile-photo.png"
                alt="Sachit Sharma"
                className="w-full h-full object-cover"
                width="144"
                height="144"
                style={{ objectPosition: 'center center' }}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-lg -z-10"></div>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800/50 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-zinc-300">Available for Product Leadership</span>
          </div>
        </div>

        {/* Name label */}
        <p className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Sachit Sharma</p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.07] tracking-tight mb-6">
          <span className="text-white">Delivery Driver.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Systems Thinker.</span>
          <br />
          <span className="text-zinc-500">After-Hours Builder.</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Senior Consultant &amp; Delivery Lead shipping products for Fortune 500 clients at Deloitte. Building F1 fantasy leagues and chess apps after hours.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <a
            href="#product"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-smooth hover:scale-[1.02]"
          >
            View my work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://calendly.com/work-sachitsharma/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-zinc-700 text-white rounded-full text-sm font-semibold hover:border-zinc-400 hover:bg-zinc-900/50 transition-smooth hover:scale-[1.02]"
          >
            <Calendar size={16} />
            Schedule an intro
          </a>
        </div>

        {/* Metrics strip — like reference image */}
        <div className="border-t border-zinc-800/60 -mx-6 sm:-mx-8 lg:-mx-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm">
            {metrics.map((m, i) => (
              <div key={i} className="py-5 px-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{m.value}</p>
                <p className="text-sm font-medium text-zinc-300 mt-0.5">{m.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-tight">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-zinc-600 text-xs py-3 -mx-6 sm:-mx-8 lg:-mx-12 border-b border-zinc-800/40">
          <MapPin size={11} />
          <span>New York, NY · Open to Hybrid</span>
        </div>

      </div>
    </section>
  );
}