import React, { createContext, useState, useMemo, useEffect, ReactNode } from 'react';

interface Theme {
  primaryColor: string;
  backgroundColor: string;
  font: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: {
    primaryColor: '#FF5733',
    backgroundColor: '#FFFFFF',
    font: 'Inter',
  },
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem('theme');
    return localTheme ? JSON.parse(localTheme) : {
      primaryColor: '#FF5733',
      backgroundColor: '#FFFFFF',
      font: 'Inter',
    };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--font-family', theme.font);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};