import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { AgilityService } from '../../../agility.service';
import { isDevMode } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'agility-preview-bar',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, NgClass],
  templateUrl: './preview-bar.component.html',
})
export class PreviewBarComponent implements OnInit {
  public visible: boolean = false;
  public isPreview: boolean = false;
  public isDevMode: boolean = false;
  public showPreviewMode: boolean = false;
  public faGithub = faGithub;
  public faInfoCircle = faInfoCircle;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;

  constructor(
    private agilityService: AgilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isPreview = agilityService.isPreviewMode;
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

  ngOnInit(): void {

    this.isPreview = this.agilityService.isPreviewMode;

    this.route.queryParams.subscribe((params) => {
     const previewKey = params['agilitypreviewkey'];
     if (previewKey) {
      this.agilityService.enterPreviewMode(previewKey);
      this.isPreview = true;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        queryParamsHandling: ''
      });
     }
    });

  }
}
