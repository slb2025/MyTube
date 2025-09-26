// src/app/services/search.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importez la config

// Interface pour le format de réponse (simplifiée)
interface TmdbResponse {
  results: any[]; // Les vidéos/films
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly BASE_URL = environment.tmdbApiUrl;
  private readonly API_KEY = environment.tmdbApiKey;

  constructor(private http: HttpClient) { }

  /**
   * Fonction de test : Récupère les films populaires pour vérifier l'API.
   */
  getPopularMovies(): Observable<TmdbResponse> {
    // Le point de terminaison pour les films populaires
    const endpoint = `${this.BASE_URL}/movie/popular`;

    // Construction des paramètres HTTP : toujours nécessaire pour TMDB
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'fr-FR'); // Optionnel : pour avoir les titres en français

    console.log(`Appel à : ${endpoint}?${params.toString()}`);

    return this.http.get<TmdbResponse>(endpoint, { params });
  }

  /**
   * Fonction de recherche réelle (pour une utilisation future)
   */
  searchTmdb(query: string): Observable<TmdbResponse> {
    const endpoint = `${this.BASE_URL}/search/movie`;

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('query', query)
      .set('language', 'fr-FR');

    return this.http.get<TmdbResponse>(endpoint, { params });
  }
}