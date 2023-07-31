import { createContext, useContext, useState } from 'react';

export const UserEmailContext = createContext();

export const UserEmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('isLoggedIn'));

  return (
    <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserEmailContext.Provider>
  );
};

export const useUserEmail = () => useContext(UserEmailContext);
