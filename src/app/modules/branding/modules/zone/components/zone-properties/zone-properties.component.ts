import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone-properties',
  templateUrl: './zone-properties.component.html',
  styleUrls: ['./zone-properties.component.scss']
})
export class ZonePropertiesComponent implements OnInit {


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

  ngOnInit() {
  }

}
