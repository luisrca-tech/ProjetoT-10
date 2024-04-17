"use client";

import { ReactNode, createContext, useState, useContext } from "react";

interface ScrolldownContextType {
  handleInputChange: (id: string, value: string) => void;
}

export const ScrolldownContext = createContext<ScrolldownContextType>({
  handleInputChange: () => {},
});

interface ScrolldownContextProviderProps {
  children: ReactNode;
}

export function ScrolldownContextProvider({
  children,
}: ScrolldownContextProviderProps) {

  const handleInputChange = (id: string, value: string) => {
    // Implemente a lógica para manipular o estado dos inputs
  };

  return (
    <ScrolldownContext.Provider
      value={{
        handleInputChange,
      }}
    >
      {children}
    </ScrolldownContext.Provider>
  );
}
