import { Component, OnInit } from '@angular/core';
import { AgilityService } from '../../services/agility.service';
import {
  faTwitter,
  faInstagram,
  faSlack,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-site-footer',
  templateUrl: 'site-footer.component.html',
  styles: [],
})
export class SiteFooterComponent implements OnInit {
  // fontawesome icons
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSlack = faSlack;
  faYoutube = faYoutube;
  faGithub = faGithub;

  constructor(private agilityService: AgilityService) {}

  async ngOnInit(): Promise<void> {}
}
