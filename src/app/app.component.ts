import { Component, importProvidersFrom } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { PreviewBarComponent } from './components/preview-bar/preview-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AgilityCMS Angular SSR';
}