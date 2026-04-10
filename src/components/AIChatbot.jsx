import { MessageCircle, X, Send, Loader2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Sachit's AI assistant. Ask me anything about his experience, projects, or skills!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreQuestions, setShowMoreQuestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const initialMessages = [
    {
      role: 'assistant',
      content: "👋 Hi! I'm Sachit's AI assistant. Ask me anything about his experience, projects, or skills!",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const resumeContext = `
SACHIT SHARMA - Onsite Delivery Lead / Senior Product Manager / Product Owner

CONTACT:
Email: work.sachitsharma@gmail.com
LinkedIn: linkedin.com/in/ssachit
GitHub: github.com/sachit6c
Location: New York, NY · Open to Hybrid

PROFESSIONAL SUMMARY:
Hybrid Technology Product & Program Manager with 8+ years at Deloitte Consulting LLP delivering large-scale digital transformation programs in financial services and enterprise tech. Combines hands-on Scrum team leadership — managing 26+ squads, facilitating PI planning, and serving as Scrum Master — with strategic product ownership across roadmapping, OKRs, backlog management, and release strategy. PMP, CSPO, and SAFe certified. Proven track record across fintech (FIS Global (Fidelity National Information Services) / T. Rowe Price), pharma, and healthcare clients.

KEY METRICS:
- 26 squads / 185 members managed simultaneously
- 335,000-hour resource budget managed (PlanView)
- 91% on-time PI delivery rate across 3 PI cycles
- 8,966+ story points delivered across 73 deployments
- $2.45M+ revenue influenced (SOW extensions + RFP wins)
- 175% process efficiency gain; meetings cut to <9 min
- 20+ hours/week manual work eliminated via Jira automation
- 319% user growth (Eli Lilly mobile) · 3x user growth (Pfizer)

EXPERIENCE:

Onsite Delivery Lead / Senior Product Manager — T. Rowe Price & FIS Global
Deloitte Consulting LLP | New York, NY | 2025 – Present
- Orchestrated 3 complete PI planning cycles for 26 agile squads (185 members), achieving 91% on-time story completion across 8,966+ story points and 73 production deployments
- Facilitated quarterly Product Delivery meetings and Product Strategy sessions between TRP and FIS Global, establishing a prioritized 3–12 month roadmap aligned to business priorities
- Led OKR development and mid-PI reviews, creating a value stream model mapping all 26 squads to journey, platform, and ops teams
- Finalized 2026 team structure for 185 members with a 335,000-hour resource budget in PlanView; designed hours-estimation methodology correcting a 30% underestimation
- Developed PI mitigation plans — identifying and escalating 4 critical dependencies early
- Implemented Jira automation eliminating 20+ hours/week of manual PM/PO work; improved data accuracy by 40%
- Contributed to a $1.75M SOW extension for 2026

Product Owner / Delivery Lead — Pfizer Inc. (Generative AI Program)
Deloitte Consulting LLP | New Delhi, India | Nov 2023 – Jun 2024
- Served as PO across multiple Gen AI pods simultaneously; managed backlogs for LLM-powered Market Competitive Intelligence and Pre-Opportunity Identification tools
- Defined acceptance criteria for non-deterministic LLM outputs, enabling reliable release cycles in an ambiguous AI environment
- Coordinated cross-geography stakeholders (POs in Greece; business users and data scientists in the US)
- Bridged business users and data science teams across data ingestion, model, and inference layers

Product Owner / Delivery Lead — Pfizer Inc. (Enterprise Digital Program)
Deloitte Consulting LLP | New Delhi, India | 2023 – 2024
- Signed 2 RFPs worth $700K, securing 3 quarters of pipeline; won a 2-quarter engagement over a competing AWS vendor
- Led 2 cross-functional pods through 11 major releases across 16 sprints, tripling the client user base
- Recognized by the MD of Consulting as the "most visible team in the Pfizer program"
- Received 2 Applause Awards for strategic excellence and proactive identification of scope creep

Scrum Master / Functional Team Lead / Product Owner — Eli Lilly & Co.
Deloitte Consulting LLP | India | Nov 2019 – Nov 2023
- Increased team velocity by 15% through Agile coaching, retrospective facilitation, and burndown transparency
- Orchestrated 15 sprints across iOS and Android, culminating in the launches of ConLog, LillyPlus & Snapshare — client called ConLog 'the best app they had ever encountered'
- Drove 319% user growth across 6 releases on multiple mobile platforms, including a client-record two-week release cycle
- Received Applause Award for before-time simultaneous release of 2 MVPs

Business Analyst — HPE, AT&T, Chevron
Deloitte Consulting LLP | Bengaluru, India | Aug 2018 – Nov 2019

SIDE PROJECTS:
1. Partner Pomodoro (https://rich-pomodoro.vercel.app/)
   - Two-user collaborative Pomodoro timer with real-time sync via Supabase WebSocket subscriptions
   - No login required; partners identified by name; Supabase RLS governing data access
   - Wall-clock-based timer (Date.now() diffing at 250ms polls) to eliminate setInterval drift
   - Completion chimes synthesized with Web Audio API; native OS notifications

2. F1 Fantasy League (https://f1-fantasy-v1.vercel.app/)
   - Full-stack fantasy F1 with head-to-head snake drafts
   - Configurable points engine: position, pole, sprint, fastest lap, penalties
   - 27 seasons (2000-2026) of historical race data
   - 80%+ unit test coverage (Vitest) + Playwright E2E suites

3. 64Squares — Chess Fantasy League (https://chess-fantasy.vercel.app/)
   - Real-time scoring via 30-second Lichess Broadcasts PGN polling
   - Supabase PostgreSQL with RLS security policies
   - Fuzzy player name matching for 1000+ titled players (Chess.com + FIDE)
   - Python data pipeline for player fetching, seeding, and tournament management

SKILLS & EXPERTISE:
- Program & Project Management: SAFe / PI Planning, Agile at Scale, Scrum Team Leadership, Risk & Dependency Management, Capacity Planning, Resource Allocation (PlanView), OKR Facilitation, Release Management
- Product Management: Product Roadmapping, Backlog Management, User Stories & Acceptance Criteria, Stakeholder Alignment, Go-to-Market, Value Stream Mapping, KPI Definition, Business Case Development
- Tools: Jira, Confluence, Aha!, Figma, Miro, Azure DevOps, SQL, Tableau, Power BI, Salesforce, ServiceNow
- Domains: Financial Services, Fintech, Enterprise Digital Transformation, Healthcare & Life Sciences, Generative AI / LLM Products, Mobile (iOS / Android), SaaS / Platform Products
- Leadership: Cross-functional Team Management, Executive Communication, Scrum Coaching, Vendor Management, Change Management, Budget & P&L Oversight

CERTIFICATIONS:
- Claude 101 — Anthropic (2026)
- AI Fluency: Framework & Foundations — Anthropic (2026)
- SAFe 5 Agilist (SA) — Scaled Agile (2021)
- Certified Scrum Product Owner (CSPO) — Scrum Alliance (2020)
- Project Management Professional (PMP) — PMI (2019)

EDUCATION:
Bachelor of Technology — Electronics & Instrumentation Control Engineering
Thapar University, 2018
`;

  const quickQuestions = [
    "Download resume",
    "Tell me about your biggest program",
    "What's your GenAI experience?",
    "What tools and tech do you use?",
    "Tell me about your side projects",
  ];

  const moreQuestions = [
    "What companies have you worked for?",
    "Tell me about the F1 Fantasy League",
    "What's your Agile coaching experience?",
    "How do you approach stakeholder management?",
    "What certifications do you have?",
    "What's your leadership style?",
  ];

  const handleClearChat = () => {
    setMessages(initialMessages);
    setShowMoreQuestions(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI assistant representing Sachit Sharma's portfolio. Answer questions about his professional experience, skills, and achievements based on the following resume information. Be conversational, enthusiastic, and highlight his strengths. Keep responses concise (2-4 sentences) and factual based on the resume. If asked about something not in the resume, politely say you don't have that information but redirect to what you do know.\n\nResume Data:\n${resumeContext}`,
            },
            ...messages.filter((m) => m.role !== 'assistant' || m.content !== initialMessages[0].content),
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Check out Sachit's case studies above, or reach out directly at work.sachitsharma@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question) => {
    setInput('');
    
    // Handle download resume action
    if (question === "Download resume") {
      const link = document.createElement('a');
      link.href = '/Sachit-Sharma-AI-PM-Resume.pdf';
      link.download = 'Sachit-Sharma-AI-PM-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      const userMessage = { role: 'user', content: question };
      const assistantMessage = { role: 'assistant', content: '✅ Resume download started! Check your downloads folder.' };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      return;
    }
    
    const userMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI assistant representing Sachit Sharma's portfolio. Answer questions about his professional experience, skills, and achievements based on the following resume information. Be conversational, enthusiastic, and highlight his strengths. Keep responses concise (2-4 sentences) and factual based on the resume. If asked about something not in the resume, politely say you don't have that information but redirect to what you do know.\n\nResume Data:\n${resumeContext}`,
            },
            ...messages.filter((m) => m.role !== 'assistant' || m.content !== initialMessages[0].content),
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Check out Sachit's case studies above, or reach out directly at work.sachitsharma@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 left-8 z-50 group"
          aria-label="Open AI Chat"
        >
          {/* Main button - Apple style */}
          <div className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-full shadow-2xl hover:scale-105 transition-smooth">
            <MessageCircle size={22} />
            <span className="hidden sm:block font-semibold whitespace-nowrap">
              Ask AI about me
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 z-50 w-[400px] max-w-[calc(100vw-4rem)] animate-fadeInUp">
          <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
            {/* Header */}
            <div className="bg-zinc-950 p-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <MessageCircle className="text-white" size={22} />
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-zinc-400">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="text-zinc-400 hover:text-white" size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-zinc-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl px-4 py-2.5">
                    <Loader2 className="animate-spin text-zinc-400" size={20} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-zinc-500">
                  {messages.length <= 1 ? 'Quick questions:' : 'Follow-up questions:'}
                </p>
                {messages.length > 1 && (
                  <button
                    onClick={handleClearChat}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                    title="Clear chat"
                  >
                    <RotateCcw size={12} />
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
                {showMoreQuestions && moreQuestions.map((q, idx) => (
                  <button
                    key={`more-${idx}`}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowMoreQuestions(!showMoreQuestions)}
                className="flex items-center gap-1 text-xs mt-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all mx-auto"
              >
                {showMoreQuestions ? (
                  <>
                    <ChevronUp size={14} />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    Show more questions
                  </>
                )}
              </button>
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
