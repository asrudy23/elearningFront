import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { createUser } from '@/lib/api/users';
import { CreateUserPayload, User } from '../../../app/types/user';

import { useToast } from '@/hooks/use-toast';

// (Optionnel mais recommandé) Définir un type pour les erreurs API
interface ApiError {
  message: string;
  // Ajoutez d'autres champs si votre backend en renvoie (ex: timestamp, path)
}

export const useCreateUserMutation = () => {
  const router = useRouter();
  const { toast } = useToast();

  // --- CORRECTION 2: Remplacement de 'any' par des types précis ---
  return useMutation<User, AxiosError<ApiError>, CreateUserPayload>({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        title: "Compte créé avec succès !",
        description: "Vous pouvez maintenant vous connecter avec vos identifiants.",
        // Laisser la variante par défaut pour le succès (souvent vert ou bleu)
      });
      router.push('/login');
    },
    onError: (error) => {
      console.error("Échec de l'inscription:", error);
      toast({
        title: "Erreur lors de l'inscription",
        // Utilise le message d'erreur de l'API s'il existe, sinon un message par défaut
        description: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive", // Variante rouge pour les erreurs
      });
    }
  });
};