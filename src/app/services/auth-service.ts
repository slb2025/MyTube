import { Injectable, signal } from '@angular/core';

// Interface pour définir la structure des informations utilisateur dans localStorage
interface User {
  username: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public USERS_STORAGE_KEY = 'myTubeUsers';
  public SESSION_KEY = 'authenticatedUser';

  // Signal pour suivre l'utilisateur actuellement connecté
  public currentUser = signal<string | null>(null);

  constructor() {
    // Mettre à jour le signal au démarrage de l'application
    this.currentUser.set(sessionStorage.getItem(this.SESSION_KEY));
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }

  signUp(username: string, password: string): boolean {
    const users = this.getUsers();
    
    // Vérifier si l'utilisateur existe déjà
    if (users.find(u => u.username === username)) {
      return false; // Échec : L'utilisateur existe déjà
    }

    // Créer et sauvegarder le nouvel utilisateur
    const newUser: User = { username, passwordHash: password }; // Simplifié pour ce projet
    users.push(newUser);
    this.saveUsers(users);
    
    return true; // Succès
  }

  signIn(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.passwordHash === password);

    if (user) {
      // Stocker le nom d'utilisateur dans sessionStorage pour marquer la session
      sessionStorage.setItem(this.SESSION_KEY, username);
      // Mettre à jour le signal après une connexion réussie
      this.currentUser.set(username);
      return true;
    }
    return false;
  }

  signOut(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    // Mettre à jour le signal après une déconnexion
    this.currentUser.set(null);
  }
  
  /** Retourne le nom d'utilisateur connecté ou null. */
  getCurrentUsername(): string | null {
    return sessionStorage.getItem(this.SESSION_KEY);
  }

  /** Indique si un utilisateur est actuellement connecté. */
  isAuthenticated(): boolean {
    return this.getCurrentUsername() !== null;
  }
}
