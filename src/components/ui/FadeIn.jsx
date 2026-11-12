import React, { useRef, useEffect, useState } from 'react';
import styles from './FadeIn.module.css';

/**
 * FadeIn — wraps children in a div that becomes visible (opacity 1, translateY 0)
 * when it enters the viewport. Respects prefers-reduced-motion.
 *
 * Props:
 *   delay   — CSS delay string, e.g. '0.3s'
 *   className — extra class applied to wrapper
 *   as      — HTML tag to render (default 'div')
 */
export default function FadeIn({ children, delay = '0s', className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.fadeIn} ${visible ? styles.visible : ''} ${className}`}
      style={{ '--delay': delay }}
    >
      {children}
    </Tag>
  );
}
