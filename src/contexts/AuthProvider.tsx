import React, {useState, useContext, createContext, useEffect} from 'react';
import {Alert} from 'react-native';

import {supabase} from '../services/supabaseClient';
import {getUserProfile} from '../queries/users';
import type {UserProfile} from '../queries/users';
import {useSupabaseMutation} from '../hooks/use-supabase';

interface AuthContextProps {
  currentUser: UserProfile | null;
  loading: boolean;
  registerWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  updateCurrentUser: (
    fields: Partial<Omit<UserProfile, 'id' | 'email'>>,
  ) => void;
  logout: () => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const {execute, error} = useSupabaseMutation();

  useEffect(() => {
    (async () => {
      setUserInitialState();
    })();

    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        if (currentSession && currentSession.user) {
          const user = await getUserProfile(currentSession.user.id);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      },
    );
    return () => {
      authListener?.subscription!.unsubscribe();
    };
  }, []);

  const setUserInitialState = async () => {
    const {
      data: {user},
    } = await supabase.auth.getUser();
    const {data: session, error} = await supabase.auth.getSession();
    if (session && user !== null) {
      const profile = await getUserProfile(user.id);
      setCurrentUser(profile);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  };

  const updateCurrentUser = async (
    fields: Partial<Omit<UserProfile, 'id' | 'email'>>,
  ) => {
    setCurrentUser(prevUser => (prevUser ? {...prevUser, ...fields} : null));
  };

  const registerWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    setLoading(true);
    execute(
      supabase.auth.signUp({
        email,
        password,
      }),
    );
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    execute(
      supabase.auth.signInWithPassword({
        email,
        password,
      }),
    );
  };

  const logout = async () => {
    setLoading(true);
    execute(supabase.auth.signOut());
  };

  if (error) {
    Alert.alert(error.message);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        registerWithEmailAndPassword,
        loginWithEmailAndPassword,
        updateCurrentUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const useCurrentUser = (): UserProfile => {
  const {currentUser} = useAuth();

  if (!currentUser) {
    throw new Error('useCurrentUser must be used in an authenticated screen');
  }

  return currentUser;
};
