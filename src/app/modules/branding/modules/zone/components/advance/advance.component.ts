import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent implements OnInit {
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
