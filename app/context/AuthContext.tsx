"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/user';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/auth';

// Un composant de chargement que nous pouvons réutiliser
function FullPageLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F8F9FA]">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#F18A00] border-t-transparent"></div>
    </div>
  );
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // <-- NOUVEAU: Pour savoir si on vérifie la session
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Cette requête se lancera au chargement de l'application pour vérifier si un cookie de session existe
  const { data: initialUser, isFetched, isError, isLoading: isQueryLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false, // Ne pas réessayer en cas d'erreur 401
    refetchOnWindowFocus: false, // Évite les refetchs inutiles
  });

  // Met à jour notre état local une fois que la requête est terminée
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  // L'état de chargement est vrai tant que la requête initiale n'est pas terminée
  const isLoading = isQueryLoading && !isFetched;

  // Pendant la vérification initiale de la session, on affiche un loader pour toute l'application.
  // Cela empêche tout "flash" de contenu ou redirection prématurée.
  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};