import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const clickLock = useRef(false);
  const computeActiveRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: '#product', label: 'Work', id: 'product' },
    { href: '#case-studies', label: 'Case Studies', id: 'case-studies' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  // Scroll-position approach: whichever section's top is at or above the
  // trigger line (nav height + buffer) is the current active section.
  // We pick the LAST one that satisfies this — i.e. the one furthest down
  // the page that the user has already scrolled past.
  useEffect(() => {
    if (!isHomePage) return;

    const NAV_H = 56; // matches h-14
    const BUFFER = 120; // generous buffer to absorb scroll-margin-top (96px) + inertia

    const computeActive = () => {
      // Near-bottom guard: when scrolled to the bottom of the page the last
      // section's heading may never cross the trigger — force it active.
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0 && window.scrollY >= scrollableHeight - 50) {
        setActiveSection(navLinks[navLinks.length - 1].id);
        return;
      }

      const trigger = window.scrollY + NAV_H + BUFFER;
      let current = '';

      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= trigger) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    // Expose so click handlers can trigger a re-evaluation after scroll ends.
    computeActiveRef.current = computeActive;

    const onScroll = () => {
      if (clickLock.current) return; // don't fight the click-set active
      computeActive();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    computeActive(); // run once on mount
    return () => {
      window.removeEventListener('scroll', onScroll);
      computeActiveRef.current = null;
    };
  }, [isHomePage]);

  const handleNavClick = (href, id) => {
    setIsOpen(false);
    setActiveSection(id);

    // Lock scroll-based detection until smooth scroll actually finishes.
    // scrollend fires when the animation completes; the timeout is a fallback
    // for browsers that dispatch a scroll event mid-animation after the lock
    // would otherwise have expired with the old fixed 1.2 s approach.
    clickLock.current = true;

    const release = () => {
      clickLock.current = false;
      window.removeEventListener('scrollend', release);
      // Re-evaluate at the final resting scroll position so any inertia/bounce
      // that shifted the viewport after scrollend is corrected immediately.
      requestAnimationFrame(() => {
        if (computeActiveRef.current) computeActiveRef.current();
      });
    };

    window.addEventListener('scrollend', release, { once: true });
    // Fallback: 2.5 s covers even very long smooth-scroll distances
    setTimeout(release, 2500);

    if (href.startsWith('#') && !isHomePage) {
      window.location.href = '/' + href;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center h-14">
          {/* Logo — left */}
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-zinc-400 transition-smooth shrink-0"
          >
            Shekhar Sharma
          </Link>

          {/* Desktop nav — centered absolutely so it's truly middle */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : '/' + link.href}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                    ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full bg-white transition-all duration-300 origin-center
                      ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile menu button — pushed to far right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-zinc-800/50 transition-smooth"
          >
            {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-zinc-800/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : '/' + link.href}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`block px-4 py-2.5 rounded-lg transition-smooth font-normal
                    ${isActive ? 'text-white bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}