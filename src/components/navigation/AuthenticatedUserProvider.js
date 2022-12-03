import React, { useState, createContext } from "react";

export const AuthenticatedUserContext = createContext({});

function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

export default AuthenticatedUserProvider;
