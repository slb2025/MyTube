import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>Résultats du test : {{ testTitle }}</h1><div *ngFor="let movie of testResults">({{ movie.id }}) {{ movie.title }}</div>',
  styleUrl: './search-page.scss'
})
export class SearchPageComponent implements OnInit {
  testTitle = 'Chargement...';
  testResults: any[] = [];
  
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.testApiConnection();
  }

  testApiConnection(): void {
    this.searchService.getPopularMovies().subscribe({
      next: (data: any) => { 
        console.log('TMDB API test réussi !', data);
        this.testTitle = `TMDB a trouvé ${data.total_pages} pages de films populaires.`;
        this.testResults = data.results.slice(0, 5); 
      },
      error: (err) => {
        console.error('Erreur de connexion à TMDB', err);
        this.testTitle = 'Erreur : Échec de la connexion à l\'API. Vérifiez la clé.';
      }
    });
  }
}