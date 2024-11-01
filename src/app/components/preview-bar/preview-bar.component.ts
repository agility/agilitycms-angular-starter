import { Component, OnInit } from '@angular/core';
import { AgilityService } from '../../services/agility.service';
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
  faGithub = faGithub;
  faInfoCircle = faInfoCircle;

  constructor(private agilityService: AgilityService) {
    this.isPreview = isDevMode();
  }

  toggle() {
    this.visible = !this.visible;
  }

  ngOnInit(): void {}
}
