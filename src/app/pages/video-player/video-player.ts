import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, MatCardModule, SafeUrlPipe],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss'
})
export class VideoPlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  youtubeKey: string | null = null;
  videoUrl: string = '';
  
  private readonly YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Le paramètre 'videoId' contient la clé YouTube
      this.youtubeKey = params.get('videoId');
      
      if (this.youtubeKey) {
        // Construction de l'URL finale avec la clé YouTube
        this.videoUrl = `${this.YOUTUBE_BASE_URL}${this.youtubeKey}?autoplay=1`;
      }
    });
  }
}