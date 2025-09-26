import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {
  // Injecter le DomSanitizer pour désactiver la désinfection de l'URL
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(url: string): SafeResourceUrl {
    // 💡 Ceci permet d'utiliser l'URL dans une iframe.
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}