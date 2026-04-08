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
SACHIT SHARMA - Senior Consultant / Delivery Lead / Product Owner

CONTACT:
Email: sachit.sharma@hotmail.com
LinkedIn: linkedin.com/in/ssachit
GitHub: github.com/sachit6c
Location: New York, NY · Open to Hybrid

PROFESSIONAL SUMMARY:
8 years at Deloitte Consulting LLP serving as Senior Consultant, Delivery Lead, and Product Owner across Fortune 500 clients in financial services, healthcare, and life sciences. Expert in large-scale program delivery, GenAI product ownership, SAFe Agile, and stakeholder management.

KEY ACHIEVEMENTS:
- Onsite Delivery Lead for 26 squads (185 members, 335K budgeted hours) — 91% on-time delivery across 3 PI cycles
- Secured $1.75M SOW extension; instrumental in signing 2 RFPs worth $700K
- Won a competitive bid over AWS vendor by identifying overlooked critical issues
- Led 2 high-performing pods delivering 11 major releases across 16 sprints — tripling the client user base
- Recognized by MD of Consulting as "most visible team in the Pfizer program"
- Implemented Jira automation eliminating 20+ hours/week of manual work
- Built cross-pod integration templates saving 1,200+ person-hours annually
- Increased team velocity 15% at Eli Lilly through Agile coaching and retrospective facilitation
- 319% user growth across 6 mobile releases

GENAI PRODUCT OWNERSHIP (Pfizer):
- Served as PO across multiple Gen AI pods simultaneously
- Managed backlogs for LLM-powered market intelligence and pre-opportunity identification tools
- Defined acceptance criteria for non-deterministic Gen AI outputs
- Aligned cross-geography stakeholders (US and Greece) on AI product priorities and evaluation standards
- Bridged business users and data science teams to translate LLM model capabilities into user-facing features
- Managed backlog across data ingestion, model, and inference layers

DELIVERY LEADERSHIP (TRP/FIS Program):
- Onsite Delivery Lead for 26 squads, 185 members, 335K budgeted hours
- Orchestrated 3 PI planning cycles with 91% on-time delivery
- Designed hours-estimation methodology correcting a 30% underestimation
- Led OKR development, mid-PI reviews, and value stream modeling
- Developed PI mitigation plans — identifying and escalating 4 critical dependencies early
- Facilitated quarterly Product Delivery meetings and client Product Strategy sessions

AGILE COACHING & PRODUCT OWNERSHIP (Eli Lilly):
- Product Owner and Agile coach across 3 concurrent projects
- Increased team velocity by 15% through retrospective facilitation and burndown transparency
- Facilitated bug-bash sessions surfacing 6 defects and 2 change requests pre-release

SIDE PROJECTS:
1. F1 Fantasy League (https://f1-fantasy-v1.vercel.app/)
   - Full-stack fantasy F1 with head-to-head snake drafts
   - Configurable points engine: position, pole, sprint, fastest lap, penalties
   - 27 seasons (2000-2026) of historical race data
   - 80%+ unit test coverage (Vitest) + Playwright E2E suites
   - Offline-first CSV data model with Ergast/OpenF1 API fallback

2. 64Squares — Chess Fantasy League (https://chess-fantasy.vercel.app/)
   - Real-time scoring via 30-second Lichess Broadcasts PGN polling
   - Supabase PostgreSQL with RLS security policies
   - Fuzzy player name matching for 1000+ titled players (Chess.com + FIDE)
   - In-app PGN game viewer (chess.js + cm-chessboard)
   - Python data pipeline for player fetching, seeding, and tournament management

SKILLS & EXPERTISE:
- Program Delivery: PI Planning, OKR Development, Risk Management, Stakeholder Management, Value Stream Mapping
- Product Ownership: Backlog Management, Acceptance Criteria, User Story Writing, Sprint Planning, Roadmapping
- GenAI/AI: LLM Product Ownership, Non-deterministic Output ACs, RAG, Prompt Engineering, AI Product Strategy
- Agile: SAFe Agile, Scrum, Kanban, Agile Coaching, Retrospective Facilitation
- Tools: Jira, Confluence, Figma, Miro, Tableau, Power BI, SQL, Azure DevOps, Salesforce
- Tech (Side Projects): React, TypeScript, Supabase, PostgreSQL, Vitest, Playwright, Python

DOMAIN EXPERIENCE:
Financial Services, Healthcare, Life Sciences, Pharma, Retail, Insurance

CERTIFICATIONS:
- Certified SAFe® 6 Agilist
- Certified Scrum Product Owner (CSPO)

EDUCATION:
Bachelor of Technology, Electronics & Instrumentation Control Engineering
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
              content: `You are a helpful AI assistant representing Shekhar Sharma's portfolio. Answer questions about his professional experience, skills, and achievements based on the following resume information. Be conversational, enthusiastic, and highlight his strengths. Keep responses concise (2-4 sentences) and factual based on the resume. If asked about something not in the resume, politely say you don't have that information but redirect to what you do know.\n\nResume Data:\n${resumeContext}`,
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
          content: "I'm having trouble connecting right now. Check out Shekhar's case studies above, or reach out directly at sharmashekhar992@gmail.com!",
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
      link.href = '/resume.pdf';
      link.download = 'Sachit_Sharma_Resume.pdf';
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
              content: `You are a helpful AI assistant representing Shekhar Sharma's portfolio. Answer questions about his professional experience, skills, and achievements based on the following resume information. Be conversational, enthusiastic, and highlight his strengths. Keep responses concise (2-4 sentences) and factual based on the resume. If asked about something not in the resume, politely say you don't have that information but redirect to what you do know.\n\nResume Data:\n${resumeContext}`,
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
          content: "I'm having trouble connecting right now. Check out Shekhar's case studies above, or reach out directly at sharmashekhar992@gmail.com!",
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
