// app/context/theme.js

"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(null);

  return (
    <ThemeContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
