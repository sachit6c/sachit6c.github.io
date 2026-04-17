import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Impact() {
  const [titleRef, titleVisible] = useScrollAnimation()
  const [gridRef, gridVisible] = useScrollAnimation()
  const metrics = [
    {
      value: '26 squads',
      label: 'Program Scale',
      context: '185 members across multiple PI cycles, serving as Onsite Delivery Lead and orchestrating 335K budgeted hours.',
      domain: 'Deloitte · TRP / FIS Global Program',
    },
    {
      value: '91%',
      label: 'On-Time Delivery',
      context: '91% on-time delivery year-over-year across PI planning cycles, securing a $1.75M SOW extension.',
      domain: 'Deloitte · Delivery Excellence',
    },
    {
      value: '319%',
      label: 'User Growth',
      context: 'Led 2 high-performing pods delivering 11 major releases across 16 sprints, tripling the client user base.',
      domain: 'Deloitte · Pfizer Program',
    },
    {
      value: '$5M+',
      label: 'SOWs Signed',
      context: 'Instrumental in signing 2 RFPs worth $700K and securing long-term contract extensions across multiple programs.',
      domain: 'Deloitte · Business Development',
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight">
            The numbers I move
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto">
            8 years. Fortune 500. From GenAI pods to 26-squad delivery programs.
          </p>
        </div>

        <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger ${gridVisible ? 'scroll-visible' : ''}`}>
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 flex flex-col gap-3"
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