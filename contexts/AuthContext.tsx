import type { User } from 'firebase/auth';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getCurrentUserProfile,
  getUserProfile,
  isFirebaseConfigured,
  signIn as firebaseSignIn,
  signOutUser,
  signUp as firebaseSignUp,
  subscribeToAuthState,
  type FirestoreUser,
} from '@/lib/firebase';

type AuthContextValue = {
  isConfigured: boolean;
  isLoading: boolean;
  user: User | null;
  profile: FirestoreUser | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    displayName: string;
    organization?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const isConfigured = isFirebaseConfigured();
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<FirestoreUser | null>(null);

  const loadProfile = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser || !isConfigured) {
      setProfile(null);
      return;
    }

    const userProfile = await getUserProfile(firebaseUser.uid);
    setProfile(userProfile);
  }, [isConfigured]);

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      setUser(firebaseUser);
      await loadProfile(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [isConfigured, loadProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    await firebaseSignIn(email, password);
  }, []);

  const signUp = useCallback(
    async (params: {
      email: string;
      password: string;
      displayName: string;
      organization?: string;
    }) => {
      await firebaseSignUp({
        ...params,
        role: 'participant',
      });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await signOutUser();
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    const userProfile = await getCurrentUserProfile();
    setProfile(userProfile);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured,
      isLoading,
      user,
      profile,
      isAdmin: profile?.role === 'admin',
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [isConfigured, isLoading, user, profile, signIn, signUp, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
