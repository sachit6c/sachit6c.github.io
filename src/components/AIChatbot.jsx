import { MessageCircle, X, Send, Loader2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Shekhar's AI assistant. Ask me anything about his experience, projects, or skills!",
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
      content: "👋 Hi! I'm Shekhar's AI assistant. Ask me anything about his experience, projects, or skills!",
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
SHEKHAR SHARMA - Senior Product Manager

CONTACT:
Email: sharmashekhar992@gmail.com
LinkedIn: linkedin.com/in/sheksharma
Website: https://shekhar-sharma-portfolio.vercel.app/
Location: Mumbai, India · Open to Remote

PROFESSIONAL SUMMARY:
10 years of product management experience with 7 years at Deloitte building products for Fortune 500 clients across life sciences, retail, and healthcare sectors. Expert in GenAI/LLMs, Enterprise SaaS, Mobile Applications, and Regulated Healthcare (SAMD).

KEY ACHIEVEMENTS:
- Led GenAI platform serving 500+ medical researchers, reducing insight time from 12 hours to 6 hours
- Secured $200K incremental funding through rapid MVP prototyping
- Scaled SAMD patient app to 3,000 users in 8 weeks (3x faster than 24-week target)
- Built and shipped PI Planner SaaS tool independently in 3 weeks, leveraging AI as development partner

CURRENT ROLE - Senior Product Manager at Deloitte (Life Sciences GenAI Platform) - 2023-Present:
- Delivered 10+ major features across 4 quarterly releases
- Reduced researcher query-to-insight time from 12 hours to 6 hours
- Drove 40% increase in daily active users (500+ researchers)
- Orchestrated 15-person cross-functional team with 95% on-time delivery rate
- Platform retention improved from 60% to 85%
- Enabled $1.2M contract expansion

PREVIOUS ROLES:
1. Platform Product Manager - Retail Mobile Platform (2022-2023):
   - Managed requirements from app teams and prioritized based on business needs
   - Accelerated feature rollout by 30% through strategic prioritization
   - Reduced mobile crash rate from 4.2% to 1.1% (preventing $500K lost productivity)
   - Improved frontline efficiency by 20% across 15,000 devices
   - Doubled deployment velocity (monthly to bi-weekly sprints)

2. Product Owner - Healthcare SAMD Applications (2019-2022):
   - Delivered 3 regulated patient-facing mobile apps with zero FDA violations
   - Redesigned onboarding from 24 steps to 12 steps (completion rate 72% → 94%)
   - Prevented $2M delay penalty through accelerated user onboarding
   - Maintained 92% sprint velocity consistency across 3 time zones

3. Product Manager - CRMNEXT SaaS Platform (2017-2019):
   - Owned end-to-end lead conversion cycle: RFPs, demos, SDLC, cloud deployment for SMB clients (<100 users)
   - Managed Services, Media & Insurance domain clients
   - Promoted to enterprise accounts—re-imagined customer service journey for India's largest insurance provider
   - Led 20+ product demos and requirement workshops

4. Associate Product Owner - Financial Exchange (2016-2017):
   - 98% defect-free deployment rate across 5 releases
   - Reduced requirement clarification time by 30%

SIDE PROJECT:
Smart Release Planner - Built and deployed full-stack release planning SaaS in 3 weeks using React, TypeScript, and AI-assisted development. Features release confidence scoring algorithm with 85% accuracy, achieving 500+ hours of simulated capacity analysis.

SKILLS & EXPERTISE:
- Product Management: Product Strategy, Roadmap Planning, Stakeholder Management, OKRs & KPIs, PI Planning, Product-Market Fit, User Research, A/B Testing, Go-to-Market, Cross-Functional Leadership
- Technical & Platforms: GenAI/LLMs, Enterprise SaaS, Mobile Apps (iOS/Android), API Design, Cloud Platforms, SAMD Compliance, FDA 21 CFR Part 11, Data Analytics
- Methodologies & Frameworks: SAFe Agile, Scrum, Lean Product Development, Design Thinking, Jobs-to-be-Done, Continuous Discovery
- Tools & Prototyping: Figma, JIRA, Confluence, SQL, Miro, Amplitude, AI-Powered Prototyping, Rapid Development

DOMAIN EXPERIENCE:
Healthcare, Life Sciences, Retail, Financial Services, Insurance, Media

KEY STRENGTHS:
- 0→1 Product Launches
- Rapid Prototyping & MVPs
- Data-Driven Decision Making
- Cross-Functional Leadership
- Regulated Product Delivery

CERTIFICATIONS:
- Certified SAFe® 6 Agilist (2025)
- Certified Scrum Product Owner (CSPO) (2025)

EDUCATION:
Bachelor of Engineering - Information Technology, Mumbai
`;

  const quickQuestions = [
    "Download resume",
    "What's your GenAI experience?",
    "Tell me about your biggest impact",
    "What tools and tech do you use?",
    "How do you ship products fast?",
  ];

  const moreQuestions = [
    "What companies have you worked for?",
    "Tell me about the Smart Release Planner",
    "What's your experience with regulated healthcare?",
    "How do you approach product strategy?",
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
      link.download = 'Shekhar_Sharma_Resume.pdf';
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
