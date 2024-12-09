import React, { createContext, useState } from "react";

export const AuthContext = createContext<{ isAdmin: boolean }>({ isAdmin: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true); // Upravit na základě reálné autentizace

  return (
    <AuthContext.Provider value={{ isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};