import axios, { AxiosError } from 'axios';

/**
 * Création d'une instance Axios personnalisée.
 * L'utilisation d'une instance dédiée nous permet de centraliser la configuration
 * pour tous les appels API de l'application (URL de base, headers, gestion des cookies, etc.).
 */
const apiClient = axios.create({
  /**
   * L'URL de base de votre API Spring Boot.
   * Elle est chargée depuis les variables d'environnement pour ne pas la coder en dur.
   * Le préfixe NEXT_PUBLIC_ est obligatoire pour que la variable soit accessible côté client.
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  /**
   * C'EST LA LIGNE LA PLUS IMPORTANTE POUR VOTRE CAS.
   * `withCredentials: true` indique à Axios (et au navigateur) qu'il doit
   * envoyer les cookies (y compris les cookies HttpOnly) avec chaque requête
   * vers le domaine de l'API. Sans cela, votre backend ne recevra jamais
   * le cookie JWT et ne pourra pas vous authentifier.
   */
  withCredentials: true,

  /**
   * Headers par défaut pour chaque requête.
   * Utile pour les requêtes POST/PUT qui envoient du JSON.
   */
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * (OPTIONNEL MAIS RECOMMANDÉ) Intercepteur de réponse.
 * Cet intercepteur s'exécute après chaque réponse de l'API.
 * Il est parfait pour gérer les erreurs globales de manière centralisée.
 */
apiClient.interceptors.response.use(
  // Si la réponse est réussie (status 2xx), on la retourne simplement.
  (response) => {
    return response;
  },
  // Si la réponse est une erreur...
  (error: AxiosError) => {
    // On peut vérifier des codes d'erreur spécifiques.
    // Par exemple, un code 401 (Unauthorized) signifie souvent que le cookie JWT
    // est manquant, invalide ou expiré.
    if (error.response && error.response.status === 401) {
      // Dans une vraie application, on pourrait :
      // 1. Déconnecter l'utilisateur de l'état global (via AuthContext).
      // 2. Rediriger vers la page de login.
      // Attention : La redirection directe ici peut causer des problèmes dans Next.js.
      // Il est souvent préférable de laisser le hook `useQuery` ou `useMutation`
      // gérer l'erreur et de déclencher la redirection depuis le composant.
      console.error("ERREUR 401: Non autorisé. Le cookie de session est peut-être invalide.");
    }

    // Il est crucial de rejeter la promesse avec l'erreur pour que les
    // blocs `.catch()` ou la propriété `onError` de React Query puissent la récupérer.
    return Promise.reject(error);
  }
);


export default apiClient;