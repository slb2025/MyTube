// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// ⭐ CORRECTION 1 : Importer la bonne classe. 
// L'importation devrait probablement être './app/app.component' ou './app/app' si vous utilisez app.ts.
// Basons-nous sur la classe que vous avez définie : 'AppComponent'.
import { AppComponent } from './app/app'; // Si le fichier est nommé app.component.ts

// ⭐ CORRECTION 2 : Utiliser la bonne classe.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));