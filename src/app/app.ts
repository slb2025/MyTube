import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './core/header/header';
import { SidebarComponent } from './core/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,      
    SidebarComponent,     
    MatSidenavModule      
  ],
  template: `
     <!-- Le header se trouve au-dessus de tout -->
    <app-header></app-header>

    <!-- Le conteneur MatSidenav pour la barre latérale et le contenu principal -->
    <mat-sidenav-container class="app-container">

      <!-- La barre latérale avec le composant SidebarComponent -->
      <mat-sidenav mode="side" opened>
        <app-sidebar></app-sidebar>
      </mat-sidenav>

      <!-- Le contenu principal de la page, géré par le routeur -->
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styleUrl: './app.scss'
})
export class AppComponent { 
  readonly title = signal('MyTube'); 
}