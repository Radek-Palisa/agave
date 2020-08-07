import React, { createContext, useContext, useEffect, useState } from 'react';
import store from '../store';

type AuthStatus = 'loading' | 'signedOut' | 'loggedIn';

export const AuthContext = createContext<AuthStatus>('loading');

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    return store.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthStatus('loggedIn') : setAuthStatus('signedOut');
    });
  }, []);

  return <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>;
}
