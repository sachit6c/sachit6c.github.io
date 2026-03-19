import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: '#product', label: 'Work' },
    { href: '#case-studies', label: 'Case Studies' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (href.startsWith('#') && !isHomePage) {
      // If we're on a case study page and clicking an anchor link, go to home first
      window.location.href = '/' + href;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-14">
          <Link 
            to="/" 
            className="text-lg font-semibold text-white hover:text-zinc-400 transition-smooth"
          >
            Shekhar Sharma
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : '/' + link.href}
                className="text-sm text-zinc-400 hover:text-white transition-smooth font-normal"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800/50 transition-smooth"
          >
            {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-zinc-800/50">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : '/' + link.href}
                onClick={() => handleNavClick(link.href)}
                className="block px-4 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-smooth font-normal"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}