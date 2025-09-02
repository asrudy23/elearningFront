import { useMutation,useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { loginUser ,logoutUser} from '@/lib/api/auth';
import { useAuth } from '../../../app/context/AuthContext';
import { LoginCredentials, LoginResponse } from '../../../app/types/auth';

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: setAuthUser } = useAuth(); // Renommer pour éviter la confusion

  return useMutation<LoginResponse, AxiosError<{ message?: string }>, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 1. Mettre à jour le contexte global avec les informations de l'utilisateur
      setAuthUser(data.user);

      // 2. Rediriger en fonction du rôle (en MAJUSCULES)
      switch (data.user.role) {
        case "STUDENT":
          router.push("/student/dashboard");
          break;
        case "TEACHER":
          router.push("/teacher/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/");
      }
    },
    onError: (error) => {
      console.error("Échec de la connexion:", error);
    },
  });
};

export const useLogoutMutation = () => {
  const { logout: logoutFromContext } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
  
      logoutFromContext();

    
      queryClient.resetQueries({ queryKey: ['currentUser'] });

      router.push('/login');
    },
    onError: (error) => {
      console.error("Erreur lors de la déconnexion:", error);
      
      logoutFromContext();
      queryClient.resetQueries({ queryKey: ['currentUser'] });
      router.push('/login');
    },
  });
};
