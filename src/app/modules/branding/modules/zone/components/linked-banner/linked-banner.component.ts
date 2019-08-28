import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linked-banner',
  templateUrl: './linked-banner.component.html',
  styleUrls: ['./linked-banner.component.scss']
})
export class LinkedBannerComponent implements OnInit {
  public websiteId: number = null;
  public zoneId: number = null;

  constructor(private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.parent.snapshot.paramMap.get('websiteId')) {
      this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    }
    if (this.activatedRoute.parent.snapshot.paramMap.get('zoneId')) {
      this.zoneId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('zoneId'), 10);
    }
  }
  displayedColumns: string[] = ['position', 'name', 'size', 'action'];
  // dataSource = ELEMENT_DATA;
  ngOnInit() {
  }

}
