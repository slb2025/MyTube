import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search-service';
import { PlaylistService, PlaylistVideo } from '../../services/playlist-service';
import { AuthService } from '../../services/auth-service';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule,
    MatIcon
],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPageComponent implements OnInit {
  public searchService = inject(SearchService);
  public playlistService = inject(PlaylistService);
  public authService = inject(AuthService);
  public router = inject(Router);
  public snackBar = inject(MatSnackBar);
  public cdr = inject(ChangeDetectorRef);

  searchTerm: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  imageBaseUrl = this.searchService.IMAGE_BASE_URL;

  ngOnInit(): void {
    // Afficher les films populaires par défaut
    this.fetchPopular();
  }

  fetchPopular(): void {
    this.isLoading = true;
    this.searchService.getPopularMovies()
      .subscribe({
        next: (response) => {
          this.searchResults = response.results;
          this.isLoading = false;
          this.cdr.detectChanges(); // Forcer la détection des changements
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.searchService.searchTmdb(this.searchTerm)
        .subscribe({
                next: (response) => {
                    this.searchResults = response.results; // 2. Mise à jour des résultats
                    this.isLoading = false; // ✅ Correction : Arrêt du chargement dans le 'next'
                    this.cdr.detectChanges(); // Forcer la détection des changements
                  },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false; // Arrêt en cas d'erreur
                    this.cdr.detectChanges();
                }
            });
    } else {
      this.fetchPopular(); // Si la recherche est vide, revenir aux populaires
    }
  }

  addToPlaylist(result: any): void {
    const username = this.authService.getCurrentUsername();
    if (!username) {
      this.snackBar.open('Veuillez vous connecter pour ajouter des vidéos.', 'Fermer', { duration: 3000 });
      return;
    }

    // Transformer le résultat TMDB en objet PlaylistVideo
    const videoItem: PlaylistVideo = {
      id: result.id,
      title: result.title,
      thumbnailUrl: `${this.imageBaseUrl}${result.poster_path}`
    };

    this.playlistService.addVideo(username, videoItem);
      this.snackBar.open(`${result.title} ajouté à la playlist !`, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  
  // Gère la navigation vers le lecteur vidéo
  playVideo(tmdbId: number): void {
    this.isLoading = true;
    this.searchService.getVideoKey(tmdbId)
      .subscribe({
          next: (key) => {
            if (key) {
              this.router.navigate(['/video', key]);
            } else {
              alert('Aucune vidéo YouTube trouvée pour ce film.');
            }
            this.isLoading = false; // Arrêt du chargement
            this.cdr.detectChanges();
          },
          error: (err) => {
              console.error(err);
              this.isLoading = false;
              this.cdr.detectChanges();
          }
        });
  }
}