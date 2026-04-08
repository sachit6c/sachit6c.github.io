export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 bg-black border-t border-zinc-900 text-zinc-600 text-center">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm mb-3">
          © {currentYear} Sachit Sharma. All rights reserved.
        </p>
        <p className="text-xs text-zinc-700">
          Built with React + Vite + Tailwind + Claude AI
        </p>
      </div>
    </footer>
  );
}