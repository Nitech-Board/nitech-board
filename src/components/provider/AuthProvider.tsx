"use client";
import { auth } from "@/lib/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect } from "react";
import { useContext } from "react";

// コンテキストを作成
const AuthContext = createContext<User | null | undefined>(undefined);

export function useAuth() {
  // useContextで作成したコンテキストを呼び出す
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
