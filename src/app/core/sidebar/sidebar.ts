import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PlaylistService, PlaylistVideo } from '../../services/playlist-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  private playlistService = inject(PlaylistService);
  private authService = inject(AuthService);

  get playlist(): PlaylistVideo[] {
    const username = this.authService.getCurrentUsername();
    return username ? this.playlistService.getPlaylist(username) : [];
  }

  removeVideo(videoId: string | number): void {
    const username = this.authService.getCurrentUsername();
    if (username) {
      this.playlistService.removeVideo(username, videoId);
    }
  }
}