import { Injectable } from '@angular/core';

// Interface pour les données de la vidéo stockées dans la playlist
export interface PlaylistVideo {
  id: string | number;
  title: string;
  thumbnailUrl: string; // Utilisera 'poster_path' ou équivalent de l'API
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  /** Récupère la playlist de l'utilisateur. Retourne un tableau vide si aucune playlist n'est trouvée. */
  getPlaylist(username: string): PlaylistVideo[] {
    if (!username) return [];
    const playlist = localStorage.getItem(`playlist_${username}`);
    return playlist ? JSON.parse(playlist) : [];
  }

  /** Ajoute une vidéo (objet complet) à la playlist de l'utilisateur. */
  addVideo(username: string, video: PlaylistVideo): void {
    if (!username) return;
    
    const playlist = this.getPlaylist(username);
    
    // Éviter les doublons
    if (!playlist.find(v => v.id === video.id)) {
      playlist.push(video);
      localStorage.setItem(`playlist_${username}`, JSON.stringify(playlist));
    }
  }

  /** Supprime une vidéo de la playlist en utilisant son identifiant. */
  removeVideo(username: string, videoId: string | number): void {
    if (!username) return;

    const playlist = this.getPlaylist(username);
    const updatedPlaylist = playlist.filter(v => v.id !== videoId);
    
    localStorage.setItem(`playlist_${username}`, JSON.stringify(updatedPlaylist));
  }
}