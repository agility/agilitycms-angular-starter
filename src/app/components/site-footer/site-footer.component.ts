import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTwitter,
  faInstagram,
  faSlack,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'site-footer',
  standalone: true,
  templateUrl: 'site-footer.component.html',
  styles: [],
  imports: [FontAwesomeModule],
})
export class SiteFooterComponent implements OnInit {
  // fontawesome icons
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSlack = faSlack;
  faYoutube = faYoutube;
  faGithub = faGithub;

  constructor() {}

  async ngOnInit(): Promise<void> {}
}
