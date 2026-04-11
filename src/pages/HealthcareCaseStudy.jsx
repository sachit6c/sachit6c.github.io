import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, Users, Shield, TrendingUp, AlertTriangle, CheckCircle2, Clock, Target, FileText } from 'lucide-react';

export default function HealthcareCaseStudy() {
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Throttle function to limit scroll handler calls
    let throttleTimer;
    const throttle = (callback, delay = 100) => {
      return (...args) => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          callback(...args);
          throttleTimer = null;
        }, delay);
      };
    };

    const handleScroll = () => {
      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setReadingProgress(Math.min(progress, 100));

      // Determine active section
      const sections = document.querySelectorAll('[data-section]');
      let currentSection = '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.getAttribute('data-section');
        }
      });

      setActiveSection(currentSection);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsTOCOpen(false);
  };

  const tableOfContents = [
    { id: 'summary', label: 'Executive Summary', icon: FileText },
    { id: 'context', label: 'Context', icon: Activity },
    { id: 'discovery', label: 'Discovery', icon: Target },
    { id: 'strategy', label: 'Strategy', icon: Shield },
    { id: 'execution', label: 'Execution', icon: Users },
    { id: 'results', label: 'Results', icon: TrendingUp },
    { id: 'challenges', label: 'What Didn\'t Work', icon: AlertTriangle },
    { id: 'takeaways', label: 'Key Takeaways', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setIsTOCOpen(!isTOCOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <FileText className="w-6 h-6" />
      </button>

      {/* Table of Contents - Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-8 top-32 w-64 z-30">
        <nav className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
          <h3 className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">
            Contents
          </h3>
          <ul className="space-y-3">
            {tableOfContents.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 text-sm transition-colors w-full text-left group ${
                      activeSection === item.id
                        ? 'text-emerald-400 font-medium'
                        : 'text-zinc-400 hover:text-emerald-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${
                      activeSection === item.id ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-emerald-500'
                    }`} />
                    <span className="leading-tight">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile TOC */}
      {isTOCOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50 p-6">
          <div className="bg-zinc-900 rounded-xl p-6 max-w-md mx-auto mt-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                Contents
              </h3>
              <button
                onClick={() => setIsTOCOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-4">
              {tableOfContents.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 text-base transition-colors w-full text-left ${
                        activeSection === item.id
                          ? 'text-emerald-400 font-medium'
                          : 'text-zinc-300 hover:text-emerald-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 lg:ml-[28rem]" ref={contentRef}>
        {/* Back Navigation */}
        <Link
          to="/#case-studies"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Case Studies</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-600/20 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-emerald-400 font-medium">Healthcare IoT • SAMD Class II</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-tight">
            Healthcare SAMD: Regulatory PM Excellence
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Redesigning FDA-regulated onboarding under pressure: from 24 screens to 5, delivering 3,000 patients in 8 weeks (3x faster), preventing $2M in penalties, with zero FDA violations
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <div className="text-zinc-500 text-sm mb-1">Client</div>
              <div className="font-semibold text-white">Fortune 500 Pharma</div>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <div className="text-zinc-500 text-sm mb-1">Duration</div>
              <div className="font-semibold text-white">10 months</div>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <div className="text-zinc-500 text-sm mb-1">Role</div>
              <div className="font-semibold text-white">Product Manager</div>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <div className="text-zinc-500 text-sm mb-1">Compliance</div>
              <div className="font-semibold text-emerald-400">FDA 21 CFR Part 11</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <section data-section="summary" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-emerald-400" />
            Executive Summary
          </h2>
          
          <CalloutCard variant="info" className="mb-8">
            <p className="text-lg leading-relaxed">
              When the pharmaceutical company's insulin dose recommendation app faced patient drop-offs during a critical 3,000-patient marketing campaign, the stakes were high: <strong className="text-emerald-400">$2 million in penalties</strong> if the FDA-approved app wasn't ready on time.
            </p>
          </CalloutCard>

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">
              The 24-step onboarding flow was overwhelming patients, especially those already enrolled through marketing with pre-existing data. As Product Manager for this <strong className="text-white">SAMD Class II medical device</strong>, I led a high-stakes redesign under FDA regulatory constraints where every screen change required Human Factor studies and compliance validation.
            </p>

            <p className="text-zinc-300 leading-relaxed text-lg">
              By identifying redundant data collection in the marketing cohort, I reduced 24 screens to 5 for pre-existing patients—though stakeholders initially resisted due to compliance concerns.
            </p>
          </div>

          {/* Impact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ImpactCard
              value="3x"
              label="Faster Onboarding"
              description="8 weeks vs 24 weeks to onboard 3,000 patients"
              icon={Clock}
            />
            <ImpactCard
              value="94%"
              label="Completion Rate"
              description="Up from 72% in original flow"
              icon={TrendingUp}
            />
            <ImpactCard
              value="$2M"
              label="Penalty Avoided"
              description="Delivered before FDA approval deadline"
              icon={Target}
            />
          </div>

          <ComplianceCard className="mt-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Zero FDA Violations</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Across 8 internal compliance audits and 2 FDA on-site inspections over 10 months, 
                  with formal Human Factor studies validating patient understanding of life-critical features.
                </p>
              </div>
            </div>
          </ComplianceCard>
        </section>

        {/* Context */}
        <section data-section="context" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-400" />
            Context: Life-Critical Product Development
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">The Product</h3>
              <p className="text-zinc-300 leading-relaxed">
                The client's SAMD (Software as a Medical Device) platform consisted of two interconnected apps:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-3">
                <li><strong className="text-white">Insulin Dose Recommendation Engine</strong> (SAMD Class II): Bluetooth-enabled glucose monitor + FDA-regulated dose calculator providing life-critical insulin recommendations</li>
                <li><strong className="text-white">Medication Adherence Onboarding</strong>: Mobile app guiding patients through setup, profile creation, device pairing, and treatment plan configuration</li>
              </ul>
            </div>

            <CalloutCard variant="warning">
              <p className="text-sm leading-relaxed">
                Unlike typical consumer apps where bugs are fixable with hotfixes, <strong>every feature change required Human Factor studies</strong>, FDA documentation, and formal validation. A poorly designed flow didn't just hurt metrics—it could compromise patient safety.
              </p>
            </CalloutCard>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">The Business Context</h3>
              <p className="text-zinc-300 leading-relaxed">
                The pharmaceutical company was launching an aggressive marketing campaign targeting <strong className="text-white">3,000 Type 1 Diabetes patients</strong> who had shown interest through pre-enrollment forms, call center interactions, and healthcare provider referrals. These patients had already provided:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-3">
                <li>Medical history and current medications</li>
                <li>Insurance information and provider details</li>
                <li>Contact preferences and communication consent</li>
                <li>Basic demographic and lifestyle data</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Yet the app's standard onboarding flow <strong className="text-emerald-400">asked for all this information again</strong> across 24 separate screens—frustrating patients who'd already shared it and causing significant drop-offs.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                The Regulatory Challenge
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                This wasn't a typical "move fast and break things" product environment:
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">FDA 21 CFR Part 11 Compliance</div>
                    <div className="text-sm text-zinc-400">All software changes required documented validation showing patient safety wasn't compromised</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Human Factor Studies</div>
                    <div className="text-sm text-zinc-400">Every 4 sprints (8 weeks), formal usability testing with Type 1 Diabetes patients to validate screen flows</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Audit Trail Requirements</div>
                    <div className="text-sm text-zinc-400">Every patient interaction, data input, and system calculation logged and traceable for FDA audits</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Change Control Rigor</div>
                    <div className="text-sm text-zinc-400">Screen redesigns required formal review by medical affairs, legal, compliance, and engineering</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                The Stakes
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                Two pressures converged:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
                  <div className="font-semibold text-red-400 mb-2">FDA Approval Timeline</div>
                  <div className="text-sm text-zinc-400">
                    Dose recommendation algorithm's FDA clearance progressing faster than expected: 16 weeks instead of 24
                  </div>
                </div>
                <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
                  <div className="font-semibold text-red-400 mb-2">$2M Penalty Clause</div>
                  <div className="text-sm text-zinc-400">
                    Contract penalty if app wasn't ready to onboard 3,000 pre-enrolled patients when FDA approval came through
                  </div>
                </div>
              </div>
              <CalloutCard variant="danger" className="mt-4">
                <p className="text-sm font-medium">
                  Leadership's message was clear: <strong>Speed up onboarding without violating compliance</strong>—no small ask in a regulated medical device environment.
                </p>
              </CalloutCard>
            </div>
          </div>
        </section>

        {/* Discovery */}
        <section data-section="discovery" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-emerald-400" />
            Discovery: Finding Redundancy in Patient Data Flows
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">The Drop-Off Problem</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                I started by analyzing where patients abandoned the onboarding:
              </p>
              
              <div className="space-y-3">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">Screens 1-8: Profile Setup</div>
                    <div className="text-sm text-zinc-400 mt-1">Re-entering data already provided to marketing</div>
                  </div>
                  <div className="text-amber-400 font-bold text-2xl">15%</div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">Screens 9-16: Medical History</div>
                    <div className="text-sm text-zinc-400 mt-1">Redundant questions about medications, allergies, providers</div>
                  </div>
                  <div className="text-red-400 font-bold text-2xl">28%</div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">Screens 17-24: Device Pairing</div>
                    <div className="text-sm text-zinc-400 mt-1">Confusion over Bluetooth setup and sensor calibration</div>
                  </div>
                  <div className="text-amber-400 font-bold text-2xl">12%</div>
                </div>
              </div>

              <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="font-semibold text-red-400">Total Completion Rate: 72%</div>
                </div>
                <p className="text-sm text-zinc-400">
                  Pre-enrolled marketing patients dropped off earlier (Screens 1-8) compared to cold acquisitions who expected extensive forms.
                </p>
              </div>
            </div>

            <CalloutCard variant="success">
              <p className="leading-relaxed">
                <strong className="text-emerald-400">Key Insight:</strong> Pre-enrolled marketing patients already had 18 of 24 data points validated through marketing—yet we were asking them to re-enter everything.
              </p>
            </CalloutCard>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Validation with Patients</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                I shadowed 6 Type 1 Diabetes patients during onboarding (part of our regular Human Factor study):
              </p>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-3">
                <div className="flex gap-3">
                  <div className="text-emerald-400 font-bold text-lg">5/6</div>
                  <div className="text-zinc-300 text-sm">Expressed frustration when asked to re-enter information they'd "already told someone"</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-400 font-bold text-lg">4/6</div>
                  <div className="text-zinc-300 text-sm">Abandoned mid-flow and later resumed after support calls</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-400 font-bold text-lg">3/6</div>
                  <div className="text-zinc-300 text-sm">Explicitly said, "Why are you asking me this again?"</div>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mt-4 italic">
                The patient experience validated the data: redundancy wasn't just inefficient, it eroded trust.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section data-section="strategy" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            Strategy: Cohort-Specific Redesign
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">The Proposal</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Instead of redesigning the entire 24-screen flow (risky and time-consuming for all patient types), I proposed creating a <strong className="text-white">streamlined 5-screen flow for pre-enrolled marketing patients</strong>:
              </p>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <div>
                    <div className="font-medium text-white">Welcome + Identity Verification</div>
                    <div className="text-sm text-zinc-400">Confirm phone/email</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <div>
                    <div className="font-medium text-white">Data Review & Consent</div>
                    <div className="text-sm text-zinc-400">Show pre-filled profile, let patients edit if needed</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <div>
                    <div className="font-medium text-white">Device Pairing Instructions</div>
                    <div className="text-sm text-zinc-400">Bluetooth sensor setup with visual guides</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">4.</span>
                  <div>
                    <div className="font-medium text-white">Treatment Plan Selection</div>
                    <div className="text-sm text-zinc-400">Choose insulin regimen with doctor's input</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">5.</span>
                  <div>
                    <div className="font-medium text-white">Safety Acknowledgment</div>
                    <div className="text-sm text-zinc-400">Confirm understanding of dose recommendations as guidance</div>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Initial Stakeholder Resistance
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                My first proposal was actually <strong className="text-white">6 screens</strong>, but the client's medical affairs team pushed back hard:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
                  <div className="font-semibold text-red-400 mb-2">Client's Concern</div>
                  <p className="text-sm text-zinc-400">
                    "We need patients to actively confirm medical history—pre-filled data might have errors from marketing's intake process. What if someone's allergy information is wrong?"
                  </p>
                </div>
                <div className="bg-amber-950/20 border border-amber-900/50 rounded-lg p-4">
                  <div className="font-semibold text-amber-400 mb-2">Their Counter-Proposal</div>
                  <p className="text-sm text-zinc-400">
                    "Keep <strong>12 screens minimum</strong>—add confirmation screens for medications, allergies, provider info, and insurance."
                  </p>
                </div>
              </div>

              <CalloutCard variant="info" className="mt-4">
                <p className="text-sm leading-relaxed">
                  This was a pivotal negotiation moment. Compliance teams in regulated environments default to <em>caution over speed</em>, which is understandable when patient safety is at stake.
                </p>
              </CalloutCard>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">The Negotiation</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                I went back to marketing and compliance with a data-driven counter:
              </p>

              <div className="bg-zinc-900/50 border border-emerald-800/50 rounded-xl p-6">
                <h4 className="font-semibold text-emerald-400 mb-4">Evidence I Gathered:</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-white">Marketing's Data Quality Audit</div>
                        <div className="text-sm text-zinc-400 mt-1">Reviewed 100 pre-enrolled patient records—<strong className="text-emerald-400">98% accuracy rate</strong> on medical data (verified against pharmacy records and provider EHRs)</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-white">Regulatory Precedent</div>
                        <div className="text-sm text-zinc-400 mt-1">Found 3 other FDA-approved SAMD apps (competitors) that used pre-filled profiles with single-screen confirmation</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-white">Patient Safety Protocol</div>
                        <div className="text-sm text-zinc-400 mt-1">Proposed adding <strong className="text-white">inline validation</strong> on Screen 2 where patients explicitly check "My allergy information is correct"—creating audit trail without full re-entry</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-800/50 rounded-xl p-6 mt-6">
                <div className="text-emerald-400 font-semibold mb-2">The Winning Argument:</div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "If we trust marketing's data quality (98% accurate), then asking patients to re-enter creates <em>more</em> risk—they might mistype or skip fields out of frustration. Pre-filled data with <strong className="text-emerald-300">explicit confirmation</strong> gives us the same compliance coverage with better UX and faster time-to-value."
                </p>
              </div>

              <div className="mt-6 bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div className="font-semibold text-emerald-400">Success After 3 Rounds of Negotiation</div>
                </div>
                <p className="text-sm text-zinc-400">
                  After <strong>2 weeks</strong>, stakeholders agreed to <strong className="text-white">5 screens</strong> with enhanced inline confirmations on Screen 2. The key was showing that patient safety wasn't compromised—just the <em>method</em> of data validation was more efficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Execution */}
        <section data-section="execution" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            Execution: Building Under Regulatory Constraints
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Cross-Timezone Coordination</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">🇺🇸 US Side (EST)</div>
                  <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                    <li>Product (me)</li>
                    <li>Medical Affairs SMEs</li>
                    <li>Compliance Lead</li>
                    <li>Client Stakeholders</li>
                  </ul>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <div className="font-medium text-teal-400 mb-2">🇮🇳 India Side (IST)</div>
                  <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
                    <li>Engineering (8 developers)</li>
                    <li>QA (4 testers)</li>
                    <li>DevOps (2)</li>
                    <li className="text-zinc-500 italic">10.5-hour time difference</li>
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">Collaboration Rhythm:</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="text-emerald-400 font-bold">•</div>
                    <div>
                      <div className="font-medium text-white">Daily Sync at 8 AM EST / 6:30 PM IST</div>
                      <div className="text-sm text-zinc-400">30-minute standup covering blockers, compliance questions, and design decisions</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-emerald-400 font-bold">•</div>
                    <div>
                      <div className="font-medium text-white">Async Design Reviews</div>
                      <div className="text-sm text-zinc-400">Recorded Loom videos walking through wireframes—engineers watched overnight and flagged concerns via Slack</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-emerald-400 font-bold">•</div>
                    <div>
                      <div className="font-medium text-white">Compliance Check-ins Every Sprint</div>
                      <div className="text-sm text-zinc-400">Medical Affairs SME joined sprint demos to validate new flows met FDA Human Factor guidelines</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Human Factor Studies Every 4 Sprints</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                FDA's Human Factor guidance required us to test with <strong className="text-white">real Type 1 Diabetes patients</strong> at regular intervals:
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600/20 rounded-lg px-3 py-1 text-blue-400 font-bold text-sm">Sprint 2 • Week 4</div>
                  </div>
                  <p className="text-zinc-300 text-sm mb-2"><strong className="text-white">Testing:</strong> Wireframes of 5-screen flow with 8 patients</p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <div className="text-xs text-amber-400 font-semibold mb-1">Finding:</div>
                    <p className="text-zinc-400 text-sm">Patients loved the speed but were confused by "Data Review" screen—too much text, unclear what to confirm</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">Action:</div>
                    <p className="text-zinc-400 text-sm">Redesigned Screen 2 with collapsible sections (Profile, Medical, Insurance) and explicit checkboxes per category</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-950/30 to-teal-900/20 border border-teal-800/50 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-teal-600/20 rounded-lg px-3 py-1 text-teal-400 font-bold text-sm">Sprint 4 • Week 8</div>
                  </div>
                  <p className="text-zinc-300 text-sm mb-2"><strong className="text-white">Testing:</strong> High-fidelity prototype with 10 patients</p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <div className="text-xs text-amber-400 font-semibold mb-1">Finding:</div>
                    <p className="text-zinc-400 text-sm">Bluetooth pairing instructions (Screen 3) had 40% failure rate—patients didn't know which sensor model they had</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">Action:</div>
                    <p className="text-zinc-400 text-sm">Added visual device selector at start of Screen 3 (photos of 3 sensor models) to auto-load correct pairing steps</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/30 to-emerald-900/20 border border-emerald-800/50 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-emerald-600/20 rounded-lg px-3 py-1 text-emerald-400 font-bold text-sm">Sprint 6 • Week 12</div>
                  </div>
                  <p className="text-zinc-300 text-sm mb-2"><strong className="text-white">Testing:</strong> Beta build with 12 patients in production-like environment</p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <div className="text-xs text-amber-400 font-semibold mb-1">Finding:</div>
                    <p className="text-zinc-400 text-sm">Safety Acknowledgment (Screen 5) felt like "legal speak"—patients rushed through without reading</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">Action:</div>
                    <p className="text-zinc-400 text-sm">Broke into 3 sub-screens with scenario-based questions ("If your glucose is 250 mg/dL and the app suggests 4 units, what should you do?") to confirm comprehension</p>
                  </div>
                </div>
              </div>

              <CalloutCard variant="info" className="mt-4">
                <p className="text-sm leading-relaxed">
                  Each study added 1-2 weeks to the timeline, but <strong>skipping them wasn't an option</strong>—FDA audits would scrutinize whether we validated patient understanding of life-critical features.
                </p>
              </CalloutCard>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                The Config Tool (And My Biggest Mistake)
              </h3>
              
              <p className="text-zinc-300 leading-relaxed mb-4">
                To avoid dev bottlenecks, we built a <strong className="text-white">content management system</strong> for non-engineers to update screen copy, translations, tooltips, and visual assets. This let Medical Affairs update safety language without engineering tickets—a huge velocity win.
              </p>

              <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-red-400 text-lg">The Incident</h4>
                    <p className="text-zinc-300 text-sm mt-2 leading-relaxed">
                      During Sprint 5, I was testing the config tool in staging and accidentally <strong className="text-white">refreshed the entire content library</strong> instead of a single screen's copy. The tool had a poorly labeled "Reset All" button next to "Revert Changes," and I clicked the wrong one.
                    </p>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-white mb-2">Impact:</div>
                  <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                    <li>All screens reverted to default placeholder text ("Lorem ipsum")</li>
                    <li>Broke translations across English and Spanish</li>
                    <li>Replaced safety warnings with debug strings</li>
                    <li>Staging build unusable for next day's client demo</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-emerald-400 mb-2">What I Did:</div>
                    <ol className="space-y-2">
                      <li className="flex gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold">1.</span>
                        <span><strong className="text-white">Owned it immediately:</strong> Called engineering lead (11 PM IST) and compliance lead (8 AM EST) to disclose the mistake</span>
                      </li>
                      <li className="flex gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold">2.</span>
                        <span><strong className="text-white">Worked overnight:</strong> Manually restored content from backup (6 hours), re-imported translations (2 hours), validated every screen (3 hours)</span>
                      </li>
                      <li className="flex gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold">3.</span>
                        <span><strong className="text-white">Fixed by morning:</strong> Had working staging build 14 hours later before client saw anything broken</span>
                      </li>
                      <li className="flex gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold">4.</span>
                        <span><strong className="text-white">Disclosed transparently:</strong> Once sorted, informed client about incident, root cause, and process improvements (confirmation modals, better button labels)</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div className="font-semibold text-emerald-400">Client's Reaction</div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Initially uncomfortable ("How did this happen?"), but appreciated the <strong className="text-white">ownership and speed of resolution</strong>. Compliance lead later told me this built trust—many vendors try to hide mistakes, but we showed we could handle crises responsibly.
                </p>
              </div>

              <CalloutCard variant="success" className="mt-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-emerald-400">Lesson:</strong> In regulated environments, <strong>honesty after a mistake matters more than perfection</strong>. Hiding issues can turn minor incidents into audit findings.
                </p>
              </CalloutCard>
            </div>
          </div>
        </section>

        {/* Results */}
        <section data-section="results" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            Results: 3x Faster Onboarding with Zero FDA Violations
          </h2>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">Launch Metrics</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                We deployed the 5-screen flow to the 3,000 pre-enrolled marketing patients in <strong className="text-white">Week 16</strong> (2 weeks before FDA approval):
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <MetricCard
                  value="94%"
                  label="Completion Rate"
                  subtitle="vs 72% in original flow"
                  trend="up"
                />
                <MetricCard
                  value="8 weeks"
                  label="Time to 3,000 Users"
                  subtitle="vs 24 weeks target (3x faster)"
                  trend="up"
                />
                <MetricCard
                  value="$2M"
                  label="Penalty Avoided"
                  subtitle="Delivered 16 weeks early"
                  trend="up"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Patient Satisfaction</h3>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <p className="text-zinc-400 text-sm mb-4">Post-Onboarding Survey (n=450)</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-300">"Easy" or "Very Easy" Onboarding</span>
                      <span className="text-emerald-400 font-bold">89%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '89%' }}></div>
                    </div>
                    <span className="text-xs text-zinc-500">vs 64% for 24-screen flow</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-300">Appreciated Pre-Filled Data</span>
                      <span className="text-emerald-400 font-bold">76%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '76%' }}></div>
                    </div>
                    <span className="text-xs text-zinc-500">"Felt like they already knew me"</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-300">Wanted to Review Data Manually</span>
                      <span className="text-zinc-400 font-bold">12%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-600" style={{ width: '12%' }}></div>
                    </div>
                    <span className="text-xs text-zinc-500">Added "Edit My Profile" option post-launch</span>
                  </div>
                </div>
              </div>
            </div>

            <ComplianceCard>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-emerald-400" />
                Compliance & Audit Performance
              </h3>
              
              <div className="space-y-4">
                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div className="font-semibold text-emerald-400">FDA Audit Trail</div>
                  </div>
                  <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
                    <li><strong className="text-white">8 internal compliance audits</strong> across 10 months: <span className="text-emerald-400 font-semibold">Zero findings</span> related to the redesigned flow</li>
                    <li><strong className="text-white">2 FDA on-site inspections:</strong> Reviewers praised cohort-specific documentation as <em>"well-substantiated alternate path design"</em></li>
                    <li><strong className="text-white">Human Factor Studies:</strong> All 3 studies (Sprints 2, 4, 6) passed FDA's usability guidance criteria</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div className="font-semibold text-emerald-400">Data Quality Validation</div>
                  </div>
                  <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
                    <li>Post-launch audit of 500 pre-enrolled patients: <strong className="text-emerald-400">99.2% accuracy</strong> on pre-filled medical data (higher than 98% pre-launch estimate)</li>
                    <li>3 patients reported allergy mismatches (0.6%)—caught during inline confirmation on Screen 2 <em>before</em> reaching dose recommendations</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div className="font-semibold text-emerald-400 text-lg">The Result</div>
                  </div>
                  <p className="text-zinc-300 font-medium">
                    <strong className="text-white">No patient safety incidents</strong> related to onboarding data across 3,000 users in the first 6 months.
                  </p>
                </div>
              </div>
            </ComplianceCard>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Metrics Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-2 text-zinc-400 font-medium">Metric</th>
                      <th className="text-right py-2 text-zinc-400 font-medium">Before</th>
                      <th className="text-right py-2 text-zinc-400 font-medium">After</th>
                      <th className="text-right py-2 text-emerald-400 font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">Completion Rate</td>
                      <td className="text-right">72%</td>
                      <td className="text-right font-semibold text-white">94%</td>
                      <td className="text-right text-emerald-400 font-semibold">+22 pts</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">Time to 3,000 Patients</td>
                      <td className="text-right">24 weeks</td>
                      <td className="text-right font-semibold text-white">8 weeks</td>
                      <td className="text-right text-emerald-400 font-semibold">3x faster</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">Patient Satisfaction</td>
                      <td className="text-right">64%</td>
                      <td className="text-right font-semibold text-white">89%</td>
                      <td className="text-right text-emerald-400 font-semibold">+25 pts</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">Screen Count</td>
                      <td className="text-right">24 screens</td>
                      <td className="text-right font-semibold text-white">5 screens</td>
                      <td className="text-right text-emerald-400 font-semibold">-79%</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">FDA Audit Findings</td>
                      <td className="text-right">N/A</td>
                      <td className="text-right font-semibold text-white">0 findings</td>
                      <td className="text-right text-emerald-400 font-semibold">Zero violations</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3">Data Quality</td>
                      <td className="text-right">98%</td>
                      <td className="text-right font-semibold text-white">99.2%</td>
                      <td className="text-right text-emerald-400 font-semibold">+1.2 pts</td>
                    </tr>
                    <tr>
                      <td className="py-3">Penalty Avoided</td>
                      <td className="text-right text-red-400">$2M at risk</td>
                      <td className="text-right font-semibold text-white">$0 penalty</td>
                      <td className="text-right text-emerald-400 font-semibold">$2M saved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* What Didn't Work */}
        <section data-section="challenges" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            What Didn't Work: The Messy Middle
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-3">1. The First Redesign Attempt (6 Screens → Rejected)</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What I Proposed:</div>
                  <p className="text-zinc-300 text-sm">
                    Initial redesign included 6 screens with separate "Data Review (Medical)" and "Data Review (Insurance)" screens.
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="font-medium text-red-400 mb-2">Why It Failed:</div>
                  <p className="text-zinc-300 text-sm mb-3">
                    Medical affairs: "Two separate data review screens feel like we're <em>still</em> asking too much. Why not combine them?"
                  </p>
                  <p className="text-zinc-300 text-sm">
                    Meanwhile, compliance wanted <strong className="text-white">12 screens minimum</strong> (keeping half the original flow).
                  </p>
                </div>

                <CalloutCard variant="warning">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-amber-400">The Problem:</strong> I was trying to split the difference between efficiency and caution, but ended up with a design that satisfied <em>nobody</em>—too long for patients who wanted speed, too short for stakeholders who wanted explicit confirmations.
                  </p>
                </CalloutCard>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">What I Learned:</div>
                  <p className="text-zinc-300 text-sm">
                    In stakeholder negotiations, <strong>propose your ideal state first</strong> (5 screens), not a compromise. Let <em>them</em> push you toward middle ground. I wasted 2 weeks negotiating from 6 screens when I should've started at 5 and defended it with data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-3">2. End-Stage Feedback Instead of Continuous Validation</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What Happened:</div>
                  <p className="text-zinc-300 text-sm">
                    I designed the 5-screen flow over 3 weeks, got engineering to build a high-fidelity prototype, then presented it to Medical Affairs SMEs in Sprint 2 for feedback.
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="font-medium text-red-400 mb-2">Why It Was Risky:</div>
                  <p className="text-zinc-300 text-sm">
                    By waiting until a polished prototype, I'd already locked in information architecture, validation patterns, and error messaging. When SMEs flagged concerns (e.g., "Allergies need to be more prominent"), it required <strong className="text-white">rework of entire screen layouts</strong> instead of quick wireframe tweaks.
                  </p>
                </div>

                <div>
                  <div className="font-medium text-white mb-2">What I Should've Done:</div>
                  <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside">
                    <li>Week 1: Low-fidelity wireframes (validate information architecture)</li>
                    <li>Week 2: Content drafts (validate safety language)</li>
                    <li>Week 3: High-fidelity mockups (validate visual hierarchy)</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">Impact:</div>
                  <p className="text-zinc-300 text-sm mb-2">
                    The end-stage feedback approach added <strong className="text-white">2 extra weeks</strong> to Sprint 2 for redesign.
                  </p>
                  <p className="text-zinc-300 text-sm font-medium">
                    Lesson: In regulated environments, <strong className="text-emerald-400">compliance stakeholders should be co-designers, not reviewers</strong>. Embed them in weekly design iterations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-3">3. Underestimating Human Factor Study Iteration</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What I Assumed:</div>
                  <p className="text-zinc-300 text-sm">
                    Human Factor studies would validate our designs with minor tweaks (e.g., button labels, color contrast for accessibility).
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="font-medium text-red-400 mb-2">Reality:</div>
                  <p className="text-zinc-300 text-sm mb-2">Each study uncovered <strong className="text-white">fundamental usability issues</strong>:</p>
                  <ul className="text-zinc-300 text-sm space-y-1 list-disc list-inside">
                    <li>Sprint 2: Screen 2 overwhelmed patients → full redesign with collapsible sections</li>
                    <li>Sprint 4: Screen 3 Bluetooth pairing failed 40% → added device selector</li>
                    <li>Sprint 6: Safety Acknowledgment felt like "legal speak" → broke into 3 sub-screens</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">What I Learned:</div>
                  <p className="text-zinc-300 text-sm">
                    I'd planned 1 week per study for minor polish, but each required <strong className="text-white">2-3 weeks of redesign + re-testing</strong>. This pushed our timeline from 12 weeks to 16 weeks.
                  </p>
                  <p className="text-zinc-300 text-sm mt-3 font-medium">
                    In SAMD product development, <strong className="text-emerald-400">budget 3x time for usability findings</strong>. Patients interacting with life-critical features will surface edge cases you can't predict.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section data-section="takeaways" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            Key Takeaways: Regulatory PM in High-Stakes Environments
          </h2>

          <div className="prose prose-invert max-w-none space-y-8">
            <TakeawayCard
              number="1"
              title="Honesty and Ownership in Crises"
              principle="When things break (and they will), own the mistake immediately, fix it fast, then disclose transparently. Hiding issues in regulated environments turns operational incidents into compliance violations."
            >
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                During the config tool incident, I could've blamed the poor UX, restored from backup without telling the client, or delayed disclosure until the next sprint review.
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                Instead, I called stakeholders immediately (even at 11 PM IST for engineering), worked overnight to fix before it impacted the client demo, and disclosed the incident <em>after</em> it was resolved, along with process improvements.
              </p>
              <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 mt-4">
                <div className="font-medium text-emerald-400 mb-2">Client's Feedback:</div>
                <p className="text-zinc-300 text-sm italic">
                  "We work with a lot of vendors who try to cover up mistakes. You showed us you can handle pressure and prioritize patient safety over looking good. That's the partnership we need."
                </p>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mt-4 font-medium">
                For Other PMs: In healthcare, finance, or any regulated domain—<strong className="text-emerald-400">your response to failure matters more than avoiding failure</strong>. Build trust through crisis management, not perfection.
              </p>
            </TakeawayCard>

            <TakeawayCard
              number="2"
              title="Compliance Stakeholders as Co-Designers, Not Gatekeepers"
              principle="Treating Medical Affairs, Compliance, and Legal as reviewers at the end of design sprints instead of collaborators during design sprints was my biggest mistake."
            >
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What I Should've Done:</div>
                  <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside">
                    <li>Weekly Design Reviews with compliance (not bi-weekly sprint demos)</li>
                    <li>Shared Figma/Miro boards where SMEs could comment on wireframes in real-time</li>
                    <li>Pre-sprint kick-offs to align on regulatory constraints before design started</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">Time Saved:</div>
                  <p className="text-zinc-300 text-sm">
                    When I started inviting the Compliance Lead to weekly design sessions in Sprint 3, we caught issues early—saving <strong className="text-white">~3 weeks of rework</strong> across Sprints 4-6 by validating compliance <em>during</em> design instead of <em>after</em> build.
                  </p>
                </div>

                <p className="text-zinc-300 text-sm font-medium mt-4">
                  For Other PMs: If your domain has regulatory constraints (FDA, HIPAA, SOC 2, GDPR), <strong className="text-emerald-400">embed compliance stakeholders in your design process from Day 1</strong>. Treat them as co-designers who help you navigate constraints, not gatekeepers who slow you down.
                </p>
              </div>
            </TakeawayCard>

            <TakeawayCard
              number="3"
              title="Iterative Validation > Big Bang Launches in Regulated Products"
              principle="In SAMD products, you don't get do-overs. If a patient doesn't understand the Safety Acknowledgment screen and misuses dose recommendations, it's a patient safety incident—not a 'bug we'll fix in the next sprint.'"
            >
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What Worked:</div>
                  <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside">
                    <li><strong>Sprint 2:</strong> Test wireframes with 8 patients (validate information architecture)</li>
                    <li><strong>Sprint 4:</strong> Test high-fidelity prototype with 10 patients (validate interaction patterns)</li>
                    <li><strong>Sprint 6:</strong> Test beta build with 12 patients in production-like environment (validate real-world comprehension)</li>
                  </ul>
                  <p className="text-zinc-400 text-sm mt-3">
                    Each layer of validation added 1-2 weeks, but caught critical usability issues <em>before</em> FDA scrutiny.
                  </p>
                </div>

                <p className="text-zinc-300 text-sm font-medium">
                  For Other PMs: In life-critical products (medical devices, automotive software, industrial IoT), <strong className="text-emerald-400">budget 3x your typical usability testing timeline</strong>. Iterate slowly with real users, not internal stakeholders. Patient safety &gt; speed.
                </p>
              </div>
            </TakeawayCard>

            <TakeawayCard
              number="4"
              title="Data Quality Beats Caution in Stakeholder Negotiations"
              principle="Compliance teams in regulated environments default to maximum caution because the downside of failure (FDA warning letter, patient harm) outweighs the upside of efficiency (faster onboarding)."
            >
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">How to Shift the Conversation:</div>
                  <p className="text-zinc-300 text-sm mb-3">
                    Instead of arguing "Trust me, it'll be fine," I brought:
                  </p>
                  <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside">
                    <li>Marketing's Data Quality Audit: 98% accuracy on pre-filled medical data (later validated at 99.2% post-launch)</li>
                    <li>Regulatory Precedent: 3 competitor SAMD apps with similar pre-filled flows that passed FDA approval</li>
                    <li>Inline Validation Design: Explicit checkboxes on Screen 2 creating audit trails for patient confirmations</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4">
                  <div className="font-medium text-emerald-400 mb-2">What Changed:</div>
                  <p className="text-zinc-300 text-sm">
                    Compliance Lead went from "We need 12 screens minimum" to "If we have 99% data accuracy and explicit confirmations, 5 screens is defensible in an FDA audit."
                  </p>
                </div>

                <p className="text-zinc-300 text-sm font-medium mt-4">
                  For Other PMs: In risk-averse environments, <strong className="text-emerald-400">replace opinion with evidence</strong>. Compliance stakeholders aren't unreasonable—they're protecting against worst-case scenarios. Show them the data that makes those scenarios unlikely.
                </p>
              </div>
            </TakeawayCard>

            <TakeawayCard
              number="5"
              title="Vigilance and Smart Learning in Cross-Functional Chaos"
              principle="Regulatory PM work is constant context-switching between design reviews with Medical Affairs SMEs, sprint planning with India engineering, Human Factor study debriefs, and compliance documentation updates. It's easy to miss details when juggling 8 stakeholder groups."
            >
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-2">What Worked:</div>
                  <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside">
                    <li><strong>Weekly Checklist Review:</strong> Every Friday, reviewed compliance requirements (audit trails, Human Factor docs, safety validations) to catch gaps before they became blockers</li>
                    <li><strong>Delegation to Specialists:</strong> I didn't try to become an FDA expert—leaned on Medical Affairs SMEs for regulatory interpretation and focused on translating their guidance into product decisions</li>
                    <li><strong>Learning in Public:</strong> When I didn't know something (e.g., "What's the CFR Part 11 requirement for electronic signatures?"), I asked in team channels instead of researching solo—faster answers, shared learning</li>
                  </ul>
                </div>

                <p className="text-zinc-300 text-sm font-medium">
                  For Other PMs: In complex domains, <strong className="text-emerald-400">you can't be the expert on everything</strong>. Build a network of specialists, ask questions publicly, and stay vigilant on the details that matter. Learn smartly by leveraging your team's collective knowledge.
                </p>
              </div>
            </TakeawayCard>
          </div>
        </section>

        {/* Reflections */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-800/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-emerald-300">Reflections: What Regulatory PM Taught Me</h2>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-zinc-300 leading-relaxed">
                This project was one of the most stressful and rewarding experiences of my career—handling a <strong className="text-white">$2M penalty risk</strong> while navigating FDA compliance, stakeholder negotiations, cross-timezone coordination, and my own config tool mistake.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What I Loved:</h3>
                <ul className="text-zinc-300 space-y-2 list-disc list-inside">
                  <li><strong className="text-white">High-Stakes Problem-Solving:</strong> Every decision had real consequences (patient safety, business penalties, FDA scrutiny). The pressure forced clarity and discipline.</li>
                  <li><strong className="text-white">Stakeholder Mastery:</strong> Negotiating from 6 screens to 5 with compliance-averse stakeholders taught me how to use data, precedent, and empathy to move risk-averse partners.</li>
                  <li><strong className="text-white">Iterative Rigor:</strong> Human Factor studies every 4 sprints felt slow at first, but catching usability issues early saved us from post-launch patient safety incidents.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What I'd Do Differently:</h3>
                <ul className="text-zinc-300 space-y-2 list-disc list-inside">
                  <li>Embed compliance in design from Week 1 (not Sprint 2)</li>
                  <li>Propose 5 screens initially (not 6 as a compromise)</li>
                  <li>Budget 3x time for Human Factor studies (plan for iteration, not validation)</li>
                </ul>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">The Bigger Lesson:</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Regulatory PM isn't about <em>avoiding</em> constraints—it's about <strong className="text-white">designing within them creatively</strong>. The 5-screen flow wasn't a compromise between speed and compliance; it was a <em>better product</em> because we had to justify every screen's necessity. Constraints forced us to eliminate redundancy, prioritize patient experience, and build with precision.
                </p>
                <p className="text-zinc-300 leading-relaxed mt-4">
                  If you're a PM entering regulated healthcare, fintech, or automotive software: <strong className="text-emerald-400">embrace the constraints</strong>. They'll make you a more disciplined, evidence-driven, and empathetic product leader.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-12">
          <p className="text-zinc-400 mb-6">
            Want to discuss regulated product development, stakeholder negotiation under pressure, or FDA compliance strategies?
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-medium shadow-lg hover:shadow-emerald-900/50"
          >
            Let's Connect
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function MetricCard({ value, label, subtitle }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
      <div className="text-3xl font-bold text-emerald-400 mb-2">{value}</div>
      <div className="font-medium text-white mb-1">{label}</div>
      {subtitle && <div className="text-xs text-zinc-500">{subtitle}</div>}
    </div>
  );
}

function ImpactCard({ value, label, description, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-800/50 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-emerald-600/20 rounded-lg">
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          <div className="font-semibold text-emerald-300 mb-2">{label}</div>
          <div className="text-sm text-zinc-400">{description}</div>
        </div>
      </div>
    </div>
  );
}

function CalloutCard({ variant = 'info', children, className = '' }) {
  const variants = {
    info: 'bg-blue-950/20 border-blue-900/50 text-blue-300',
    success: 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300',
    warning: 'bg-amber-950/20 border-amber-900/50 text-amber-300',
    danger: 'bg-red-950/20 border-red-900/50 text-red-300'
  };

  return (
    <div className={`border rounded-lg p-5 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

function ComplianceCard({ children, className = '' }) {
  return (
    <div className={`bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-800/50 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function TakeawayCard({ number, title, principle, children }) {
  return (
    <div className="bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-800/50 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
          <span className="text-emerald-400 font-bold text-lg">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed italic mb-4">
            {principle}
          </p>
        </div>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </div>
  );
}
