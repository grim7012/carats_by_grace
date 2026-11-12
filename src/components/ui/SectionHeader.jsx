import React from 'react';
import styles from './SectionHeader.module.css';
import FadeIn from './FadeIn';

/**
 * SectionHeader — reusable section heading block.
 *
 * Props:
 *   eyebrow  — small-caps gold label
 *   headline — large serif title
 *   sub      — optional subtitle / supporting copy
 *   center   — boolean, center-aligns everything (default false)
 *   light    — boolean, renders ivory text for dark backgrounds
 */
export default function SectionHeader({ eyebrow, headline, sub, center = false, light = false }) {
  const cls = [styles.header, center ? styles.center : '', light ? styles.light : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls}>
      {eyebrow && (
        <FadeIn delay="0s">
          <p className={styles.eyebrow}>{eyebrow}</p>
        </FadeIn>
      )}
      {headline && (
        <FadeIn delay="0.15s">
          <h2 className={styles.headline}>{headline}</h2>
        </FadeIn>
      )}
      {sub && (
        <FadeIn delay="0.3s">
          <p className={styles.sub}>{sub}</p>
        </FadeIn>
      )}
    </div>
  );
}
