import { Component, OnInit } from '@angular/core';
import { AgilityService } from '../../../services/agility.service';
import { isDevMode } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preview-bar',
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
