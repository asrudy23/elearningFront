"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getCurrentUser } from "@/lib/api/auth";

// Le loader peut être importé ou redéfini ici si besoin
function FullPageLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F8F9FA]">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#F18A00] border-t-transparent"></div>
    </div>
  );
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // On attend la fin du chargement initial pour prendre une décision
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Si le chargement est en cours, on patiente
  if (isLoading) {
    return <FullPageLoader />;
  }
  
  // Si on a un utilisateur, on affiche la page
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Sinon, on affiche un loader pendant que le useEffect effectue la redirection
  return <FullPageLoader />;
}