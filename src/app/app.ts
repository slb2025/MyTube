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
    <!-- Votre structure HTML complète de l'application -->
    <app-header></app-header>

    <mat-sidenav-container class="app-container">

      <mat-sidenav mode="side" opened>
        <app-sidebar></app-sidebar>
      </mat-sidenav>

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