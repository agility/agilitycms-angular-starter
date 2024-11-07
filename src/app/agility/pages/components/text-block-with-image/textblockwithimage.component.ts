import { Component, Input, OnInit, isDevMode } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AgilityService } from '../../../agility.service';

@Component({
  selector: 'app-module-textblockwithimage',
  templateUrl: './textblockwithimage.component.html',
  standalone: true,
  imports: [RouterLink, NgIf],

})
export class ModuleTextBlockWithImage implements OnInit {
  @Input() data: any;

  public item: any = null;
  public isDevMode: boolean = false;


  constructor(private router: Router, private agilityService: AgilityService) {
    this.isDevMode = isDevMode();
  }

  public navigate(e: Event, url: string) {
    e.preventDefault();
    if(this.isDevMode || this.agilityService.isPreviewMode) {
    this.router.navigate([url]);
    } else {
      window.location.href = url;
    }
  }

  ngOnInit(): void {
    this.item = this.data.item.fields;
  }
}
