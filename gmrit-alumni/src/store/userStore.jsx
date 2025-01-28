// UserContext.js
import { createContext, useContext, useState } from 'react';

// Create a UserContext to provide and consume user state
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name_of_the_alumni:""
  }); // Initial state for the user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
