import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agility-preview',
  templateUrl: './preview.component.html',
})
export class PreviewHandlerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const preview = params.get('preview');
      if (preview) {
        console.log("Preview mode enabled");
        // Handle preview logic here
      }
    });
  }
}