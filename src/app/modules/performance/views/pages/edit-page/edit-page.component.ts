import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  value: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Objective', value: 'Impressions'},
  {position: 2, name: 'Advertiser', value: 'common_advertiser_publisher1'},
  {position: 3, name: 'Status', value: 'active'},
  {position: 4, name: 'Currency', value: 'USD'},
  {position: 5, name: 'Devices', value: 'Desktop'},
  {position: 6, name: 'Title', value: 'campaign119'},
  {position: 7, name: 'Preview URL', value:'http://youtube.com'},
  {position: 8, name: 'URL', value: 'http://qadsqwasddsadsaale.com/?a={click_id}&{hmm}'},
  {position: 9, name: 'Created At', value: '2019-01-07T12:59:24.902739+05:30'},
  {position: 10, name: 'Visibility', value: 'public'},
];
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'value'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}


