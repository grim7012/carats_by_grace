import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { navLinks } from '../../data/navigation';
import styles from './Header.module.css';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { toggleSearch } = useUI();

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const headerRef = useRef(null);
  const megaCloseTimer = useRef(null);
  const triggerRefs = useRef({});

  // Scroll behaviour
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard: Escape closes menus
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeMega) {
          const label = activeMega;
          setActiveMega(null);
          triggerRefs.current[label]?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeMega, mobileOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMegaEnter = useCallback((label) => {
    clearTimeout(megaCloseTimer.current);
    setActiveMega(label);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaCloseTimer.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const toggleMobileAccordion = (label) => {
    setMobileAccordion((prev) => (prev === label ? null : label));
  };

  const wishlistCount = wishlistItems?.length ?? 0;

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : styles.transparent}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* ── Left nav (desktop) ── */}
        <nav className={styles.navLeft} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {navLinks.slice(0, 4).map((link) => (
              <NavItem
                key={link.label}
                link={link}
                active={activeMega === link.label}
                onEnter={handleMegaEnter}
                onLeave={handleMegaLeave}
                triggerRef={(el) => { triggerRefs.current[link.label] = el; }}
                scrolled={scrolled}
              />
            ))}
          </ul>
        </nav>

        {/* ── Logo ── */}
        <div className={styles.logoWrap}>
          <Link to="/" className={styles.logoLink} aria-label="Carats by Grace — Home">
            <img
              src="/logo.png"
              alt="Carats by Grace"
              className={styles.logoImg}
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
            />
            <span className={styles.logoFallback} aria-hidden="true">CARATS BY GRACE</span>
          </Link>
        </div>

        {/* ── Right nav (desktop) ── */}
        <nav className={styles.navRight} aria-label="Secondary navigation">
          <ul className={styles.navList}>
            {navLinks.slice(4).map((link) => (
              <NavItem
                key={link.label}
                link={link}
                active={activeMega === link.label}
                onEnter={handleMegaEnter}
                onLeave={handleMegaLeave}
                triggerRef={(el) => { triggerRefs.current[link.label] = el; }}
                scrolled={scrolled}
              />
            ))}
          </ul>
        </nav>

        {/* ── Utility icons ── */}
        <div className={styles.utilities}>
          <button
            className={styles.iconBtn}
            onClick={toggleSearch}
            aria-label="Open search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link to="/wishlist" className={styles.iconBtn} aria-label={`Wishlist (${wishlistCount} items)`}>
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className={styles.badge} aria-hidden="true">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/account" className={styles.iconBtn} aria-label="Account">
            <User size={20} strokeWidth={1.5} />
          </Link>

          <button
            className={styles.iconBtn}
            onClick={toggleCart}
            aria-label={`Cart (${totalItems} items)`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className={styles.badge} aria-hidden="true">{totalItems}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`${styles.iconBtn} ${styles.hamburger}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Mega-menu panels ── */}
      {navLinks.map((link) => (
        <MegaMenu
          key={link.label}
          link={link}
          active={activeMega === link.label}
          onEnter={() => handleMegaEnter(link.label)}
          onLeave={handleMegaLeave}
        />
      ))}

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileHeader}>
          <Link to="/" className={styles.logoLink} onClick={() => setMobileOpen(false)}>
            <span className={styles.logoFallback}>CARATS BY GRACE</span>
          </Link>
          <button
            className={styles.iconBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.mobileNavItem}>
                <button
                  className={styles.mobileAccordionTrigger}
                  onClick={() => toggleMobileAccordion(link.label)}
                  aria-expanded={mobileAccordion === link.label}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${mobileAccordion === link.label ? styles.chevronOpen : ''}`}
                  />
                </button>
                {mobileAccordion === link.label && (
                  <ul className={styles.mobileSubList}>
                    {link.mega.byCategory.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`${link.href}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to={link.href} className={`${styles.mobileSubLink} ${styles.viewAll}`} onClick={() => setMobileOpen(false)}>
                        View All {link.label} →
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileUtilities}>
          <Link to="/account" className={styles.mobileUtilLink} onClick={() => setMobileOpen(false)}>My Account</Link>
          <Link to="/wishlist" className={styles.mobileUtilLink} onClick={() => setMobileOpen(false)}>Wishlist</Link>
          <Link to="/collections/bridal" className={styles.mobileUtilLink} onClick={() => setMobileOpen(false)}>Bridal</Link>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

/* ── NavItem component ── */
function NavItem({ link, active, onEnter, onLeave, triggerRef, scrolled }) {
  return (
    <li
      className={styles.navItem}
      onMouseEnter={() => onEnter(link.label)}
      onMouseLeave={onLeave}
    >
      <Link
        to={link.href}
        ref={triggerRef}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
        aria-haspopup={link.mega ? 'true' : undefined}
        aria-expanded={active}
        onFocus={() => onEnter(link.label)}
        onBlur={onLeave}
      >
        {link.label}
        {link.mega && <ChevronDown size={12} className={styles.navChevron} />}
      </Link>
    </li>
  );
}

/* ── MegaMenu component ── */
function MegaMenu({ link, active, onEnter, onLeave }) {
  if (!link.mega) return null;

  return (
    <div
      className={`${styles.mega} ${active ? styles.megaActive : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="region"
      aria-label={`${link.label} menu`}
    >
      <div className={styles.megaInner}>
        {/* Quick links row */}
        <div className={styles.megaQuickRow}>
          <Link to={`${link.href}?sort=latest`} className={styles.megaQuickLink}>Latest</Link>
          <span className={styles.megaDot}>·</span>
          <Link to={`${link.href}?sort=bestsellers`} className={styles.megaQuickLink}>Bestsellers</Link>
        </div>

        <div className={styles.megaGrid}>
          {/* Col 1: By Category */}
          <div className={styles.megaCol}>
            <p className={styles.megaColTitle}>By Category</p>
            <ul className={styles.megaLinkList}>
              {link.mega.byCategory.map((item) => (
                <li key={item}>
                  <Link
                    to={`${link.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.megaLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: By Occasion */}
          <div className={styles.megaCol}>
            <p className={styles.megaColTitle}>By Occasion</p>
            <ul className={styles.megaLinkList}>
              {link.mega.byOccasion.map((item) => (
                <li key={item}>
                  <Link
                    to={`${link.href}?occasion=${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.megaLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: By Price */}
          <div className={styles.megaCol}>
            <p className={styles.megaColTitle}>By Price</p>
            <ul className={styles.megaLinkList}>
              {[
                { label: 'Under ₹50,000', param: 'under-50k' },
                { label: '₹50K – ₹1 Lakh', param: '50k-1l' },
                { label: 'Above ₹1 Lakh', param: 'above-1l' },
              ].map((p) => (
                <li key={p.param}>
                  <Link
                    to={`${link.href}?price=${p.param}`}
                    className={styles.megaLink}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Editorial image */}
          <div className={styles.megaCol}>
            <Link to={link.href} className={styles.megaEditorialLink}>
              <img
                src={`https://placehold.co/300x400/FAF6F1/7B1E3A?text=${encodeURIComponent(link.label)}`}
                alt={`${link.label} editorial`}
                className={styles.megaEditorialImg}
              />
              <span className={styles.megaEditorialLabel}>{link.label} Edit →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
