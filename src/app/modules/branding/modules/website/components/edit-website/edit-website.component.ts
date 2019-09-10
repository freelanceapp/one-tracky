import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-website',
  templateUrl: './edit-website.component.html',
  styleUrls: ['./edit-website.component.scss']
})
export class EditWebsiteComponent implements OnInit {
  public websiteId: string = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.getParameters();
  }

  private getParameters() {
    const websiteId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('websiteId'), 10);

    if (websiteId) {
      this.websiteId = websiteId.toString();
    } else {
      this.router.navigateByUrl('/branding/zone/not-found');
    }
  }

  ngOnInit() {
  }

}
