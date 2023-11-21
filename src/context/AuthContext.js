import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { logoutUser } from '../api/authApi';

export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          logoutUser();
          setUser(null);
        }
        setLoading(false);
      });
    }, []);

  return loading ? null : (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}