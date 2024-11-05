import { Component, OnInit } from '@angular/core';
import { AgilityService } from '../../../agility.service';
import { isDevMode } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'agility-preview-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './preview-bar.component.html',
})
export class PreviewBarComponent implements OnInit {
  public visible: boolean = true;
  public isPreview: boolean;
  public isDevMode: boolean = false
  faGithub = faGithub;
  faInfoCircle = faInfoCircle;

  constructor(private agilityService: AgilityService) {
    this.isPreview = agilityService.isPreviewMode();
    this.isDevMode = isDevMode();
  }
  togglePreviewMode() {
    if (this.isPreview) {
      this.agilityService.exitPreviewMode();
      this.isPreview = false;
    } else {
      this.agilityService.enterPreviewMode();
      this.isPreview = true;
    }
  }
  toggle() {
    this.visible = !this.visible;
  }

  ngOnInit(): void {}
}
