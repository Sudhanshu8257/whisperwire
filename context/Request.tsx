"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RequestContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
);

export function RequestContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RequestContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </RequestContext.Provider>
  );
}
/*
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
*/
