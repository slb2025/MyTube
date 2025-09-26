import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

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
  public readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Rendu public pour le template

  constructor(public http: HttpClient) { }

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

  /**
   * Récupère la clé YouTube du trailer principal d'un film.
   */
   getVideoKey(tmdbId: number): Observable<string | null> {
    const endpoint = `${this.BASE_URL}/movie/${tmdbId}/videos`;

    const params = new HttpParams()
      .set('api_key', this.API_KEY);

    return this.http.get<any>(endpoint, { params }).pipe(
      // Trouver la première vidéo de type 'Trailer' ou 'Clip' provenant de YouTube
      map(response => {
        const trailer = response.results.find((video: any) => 
          (video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Clip'))
        );
        return trailer ? trailer.key : null;
      })
    );
  }
}