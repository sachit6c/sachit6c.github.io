import { useEffect, useRef, useState } from 'react'

/**
 * Returns a [ref, isVisible] pair.
 * Attach ref to any element — isVisible flips true once it enters the viewport.
 * Once visible it stays visible (no "un-animate on scroll up").
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // fire once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isVisible]
}
