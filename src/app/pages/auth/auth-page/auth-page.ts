import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; // Pour séparer connexion/inscription
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule
  ],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Formulaire de connexion
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // Formulaire d'inscription (ajout d'email pour le réalisme)
  signUpForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSignIn(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.signIn(username, password);

      if (success) {
        alert('Connexion réussie !');
        this.router.navigate(['/search']);
      } else {
        alert('Échec de la connexion. Vérifiez vos identifiants.');
      }
    }
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const { username, password } = this.signUpForm.value;
      const success = this.authService.signUp(username, password);

      if (success) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        // Passer à l'onglet de connexion ou vider le formulaire
        this.signUpForm.reset();
      } else {
        alert('Échec de l\'inscription. Le nom d\'utilisateur existe déjà.');
      }
    }
  }
}