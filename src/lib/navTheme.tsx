"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Lets the Son Rullan gallery slide-out (which sits behind the sticky
 * Header, see SlideOutPanel's z-index) tell Header to switch its text to
 * beige while open, so the wordmark/nav stay legible against the panel's
 * brown background instead of disappearing (brown-on-brown).
 */
const NavThemeContext = createContext<{
  beige: boolean;
  setBeige: (value: boolean) => void;
}>({
  beige: false,
  setBeige: () => {},
});

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [beige, setBeige] = useState(false);
  return (
    <NavThemeContext.Provider value={{ beige, setBeige }}>
      {children}
    </NavThemeContext.Provider>
  );
}

export const useNavTheme = () => useContext(NavThemeContext);
