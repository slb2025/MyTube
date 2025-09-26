import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service'; // Assurez-vous d'avoir le bon chemin
import { CommonModule } from '@angular/common'; // Pour *ngIf
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, CommonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  // Injection des dépendances modernes
  public authService = inject(AuthService);
  public router = inject(Router);

  onSignOut(): void {
    this.authService.signOut();
    // Après la déconnexion, rediriger vers la page d'authentification
    this.router.navigate(['/auth']);
  }
}