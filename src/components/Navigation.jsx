import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const clickLockRef = useRef(false);
  const visibleSectionsRef = useRef(new Set());
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: '#product', label: 'Projects', id: 'product' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#case-studies', label: 'Case Studies', id: 'case-studies' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const sectionOrder = navLinks.map((l) => l.id);

  // Derive the "active" section from the current visible set:
  // the last section in document order that is currently intersecting
  // the observation zone. This is reliable for all section sizes,
  // including short last sections (Contact) where scroll-position math
  // can fail because the page can't scroll far enough for the section
  // top to cross an arbitrary trigger line.
  const getActiveFromVisible = () => {
    const visible = sectionOrder.filter((id) => visibleSectionsRef.current.has(id));
    if (visible.length === 0) return '';
    if (visible.length === 1) return visible[0];
    // When multiple sections are simultaneously in the observation window (most common
    // when two adjacent short sections overlap at the bottom), pick the one whose top
    // is closest to the nav bar — meaning we're most "in" that section.
    const NAV_H = 56;
    return visible.reduce((best, id) => {
      const el = document.getElementById(id);
      const bestEl = document.getElementById(best);
      if (!el) return best;
      if (!bestEl) return id;
      const top = el.getBoundingClientRect().top;
      const bestTop = bestEl.getBoundingClientRect().top;
      const pastNav = top < NAV_H;       // true = section top has scrolled above nav
      const bestPastNav = bestTop < NAV_H;
      // Prefer whichever section's top has most recently crossed (or is closest to) the nav
      if (pastNav && !bestPastNav) return id;
      if (!pastNav && bestPastNav) return best;
      if (pastNav && bestPastNav) {
        // Both above nav: pick the one closer to nav (most recently crossed = least negative)
        return (top - NAV_H) > (bestTop - NAV_H) ? id : best;
      }
      // Neither above nav yet: pick the closer one (soonest to enter)
      return Math.abs(top - NAV_H) < Math.abs(bestTop - NAV_H) ? id : best;
    });
  };

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(entry.target.id);
          } else {
            visibleSectionsRef.current.delete(entry.target.id);
          }
        });

        // Don't override the click-set active while smooth-scroll is in flight.
        // The Set is still updated above so it stays in sync for post-scroll use.
        if (!clickLockRef.current) {
          const active = getActiveFromVisible();
          if (active) setActiveSection(active);
        }
      },
      // The observation zone starts just below the nav bar (56 px = h-14) and
      // ends 20 % from the bottom of the viewport. A section is "visible" when
      // any part of it occupies this zone.
      { rootMargin: '-56px 0px -20% 0px', threshold: 0 },
    );

    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavClick = (href, id) => {
    setIsOpen(false);
    setActiveSection(id); // immediate visual feedback

    clickLockRef.current = true;
    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      clickLockRef.current = false;
      window.removeEventListener('scrollend', release);
      // After scroll settles, prefer the clicked section if it's visible
      // in the observation zone. Fall back to heuristic only if the target
      // section scrolled out of view (shouldn't happen with scroll-mt).
      if (visibleSectionsRef.current.has(id)) {
        setActiveSection(id);
      } else {
        const active = getActiveFromVisible();
        if (active) setActiveSection(active);
      }
    };

    window.addEventListener('scrollend', release, { once: true });
    setTimeout(release, 2000); // fallback for browsers without scrollend

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
            Sachit Sharma
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