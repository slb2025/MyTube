import { Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page';
import { VideoPlayerComponent } from './pages/video-player/video-player';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'search', component: SearchPageComponent, canActivate: [authGuard] },
  { path: 'video/:videoId', component: VideoPlayerComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthPageComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];