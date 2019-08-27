import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit {
  public websiteId: string = null;
  public zoneId: string = null;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.getParameters();
  }

  private getParameters() {
    const websiteId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('websiteId'), 10);
    const zoneId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('zoneId'), 10);

    if (websiteId && zoneId) {

      this.zoneId = zoneId.toString();
      this.websiteId = websiteId.toString();
    } else {
      this.router.navigateByUrl('/branding/zone/not-found');
    }
  }

  ngOnInit() {
  }

}
