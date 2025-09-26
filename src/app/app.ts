import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importez le composant que vous voulez tester
import { SearchPageComponent } from './pages/search-page/search-page'; 
// Assurez-vous d'utiliser 'search-page' (sans le .ts)

@Component({
  selector: 'app-root',
  standalone: true,
  // 💡 Laissez RouterOutlet pour le futur routage, et ajoutez votre composant de test
  imports: [RouterOutlet, SearchPageComponent], 
  // 💡 Pour le test, affichez uniquement le composant de recherche
  template: `
    <h1>{{ title() }} - Mode Test TMDB</h1>
    <app-search-page></app-search-page> 
  `,
  styleUrl: './app.scss'
})
export class AppComponent { 
  // Utilisez le signal pour le titre (bonne pratique)
  readonly title = signal('MyTube'); 
}