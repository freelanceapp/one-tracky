import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-advertiser',
  templateUrl: './edit-advertiser.component.html',
  styleUrls: ['./edit-advertiser.component.scss']
})
export class EditAdvertiserComponent implements OnInit {
  public avdId: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.avdId = this.activatedRoute.snapshot.paramMap.get('advertiserId');
  }

  ngOnInit() {
  }

}
