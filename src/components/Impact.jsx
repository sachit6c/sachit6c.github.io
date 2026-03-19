export default function Impact() {
  const metrics = [
    {
      value: '12h → 6h',
      label: 'Research Time Cut',
      context: 'Researchers could run twice as many experiments per day — a half-day task became a morning activity.',
      domain: 'GenAI Platform · Life Sciences',
    },
    {
      value: '3x faster',
      label: 'Patient Onboarding',
      context: '3,000 patients onboarded in 8 weeks vs. a 24-week target — avoiding a $2M contract penalty.',
      domain: 'Healthcare SAMD · FDA Regulated',
    },
    {
      value: '40x',
      label: 'Platform Adoption',
      context: 'Grew from 5 to 200 active researchers in 18 months across 3 divisions — without a single marketing campaign.',
      domain: 'GenAI Platform · Organic Growth',
    },
    {
      value: '3 weeks',
      label: 'Zero-to-SaaS',
      context: 'Shipped a working SaaS product independently using AI as a co-developer — no PRDs, no agency, no team.',
      domain: 'Smart Release Planner · Side Project',
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight">
            The numbers I move
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto">
            10 years. Fortune 500. From GenAI platforms to healthcare devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800/60 rounded-2xl p-6 flex flex-col gap-3"
            >
              <p className="text-4xl lg:text-5xl font-semibold text-white leading-none">{metric.value}</p>
              <p className="text-base font-semibold text-zinc-200">{metric.label}</p>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">{metric.context}</p>
              <p className="text-xs text-zinc-600 font-medium uppercase tracking-wider pt-2 border-t border-zinc-800/60">
                {metric.domain}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}