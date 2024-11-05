import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-module-textblockwithimage',
  templateUrl: './textblockwithimage.component.html',
  standalone: true,
  imports: [RouterLink, NgIf],

})
export class ModuleTextBlockWithImage implements OnInit {
  @Input() data: any;

  public item: any = null;

  constructor() {}

  ngOnInit(): void {
    this.item = this.data.item.fields;
  }
}
