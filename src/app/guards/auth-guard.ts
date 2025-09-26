import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

/**
 * Fonction de garde pour protéger les routes nécessitant une authentification.
 * * @returns {boolean | UrlTree} Vrai si l'utilisateur est authentifié, sinon redirige vers la page d'authentification.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Injecter les dépendances nécessaires
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier l'état d'authentification
  if (authService.isAuthenticated()) {
    // L'utilisateur est connecté : autoriser l'accès à la route
    return true;
  } else {
    // L'utilisateur n'est PAS connecté : rediriger vers la page /auth
    // Le Router.parseUrl('/auth') crée un objet UrlTree qui indique la redirection
    return router.parseUrl('/auth');
  }
};