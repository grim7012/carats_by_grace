import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const toggleSearch = useCallback(
    () => setSearchOpen((prev) => !prev),
    []
  );

  const dismissAnnouncement = useCallback(
    () => setAnnouncementVisible(false),
    []
  );

  const value = useMemo(
    () => ({ searchOpen, announcementVisible, toggleSearch, dismissAnnouncement }),
    [searchOpen, announcementVisible, toggleSearch, dismissAnnouncement]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
