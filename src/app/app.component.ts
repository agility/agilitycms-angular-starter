import { Component } from '@angular/core';
import { PageComponent } from './agility/pages/pages.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    PageComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AglityCMS Angular SSR Starter';
  ngOnInit() {
    // app level initialization
  }
}
