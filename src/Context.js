import React, { createContext, useState } from "react";

export const Context = createContext();

// This context provider is passed to any component requiring the context
export const Provider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [dateSearched, setDateSearched] = useState('')

  return (
    <Context.Provider
      value={{
        deals,
		setDeals,
		dateSearched,
		setDateSearched
      }}
    >
      {children}
    </Context.Provider>
  );
};