import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Assurez-vous d'utiliser 'search-page' (sans le .ts)

@Component({
  selector: 'app-root',
  standalone: true,
  // 💡 Laissez RouterOutlet pour le futur routage, et ajoutez votre composant de test
  imports: [RouterOutlet], 
  // 💡 Pour le test, affichez uniquement le composant de recherche
  template: `
    <h1>{{ title() }}</h1>
    <router-outlet></router-outlet> 
  `,
  styleUrl: './app.scss'
})
export class AppComponent { 
  // Utilisez le signal pour le titre (bonne pratique)
  readonly title = signal('MyTube'); 
}