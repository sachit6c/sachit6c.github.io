import { Download } from 'lucide-react';

export default function AppFloater() {
  return (
    <a
      href="/Sachit-Sharma-AI-PM-Resume.pdf"
      download="Sachit-Sharma-AI-PM-Resume.pdf"
      className="hidden sm:flex fixed bottom-8 right-8 z-50 group"
      aria-label="Download Resume"
    >
      {/* Main floater button - Apple style */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-full shadow-2xl hover:scale-105 transition-smooth">
        <Download size={22} />
        <span className="font-semibold whitespace-nowrap">
          Download Resume
        </span>
      </div>
    </a>
  );
}
