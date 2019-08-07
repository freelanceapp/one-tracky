import { Component, OnInit, ViewChild } from '@angular/core';
import { AllPostbackPublisherService } from './postback-publisher.service';
import { PostbackPublisher} from './postback-publisher.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-postback-publisher',
  templateUrl: './postback-publisher.component.html',
  styleUrls: ['./postback-publisher.component.scss']
})
export class PostbackPublisherComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['publisher_name', 'campaign_title', 'url'];

  dataSource:MatTableDataSource<PostbackPublisher>;

  constructor(
    private _AllPostbackPublisherService: AllPostbackPublisherService
    ) { 

  }

  postbackPublisher:PostbackPublisher[];

  ngOnInit() {
     this.getData();    
  }

  getData(){
    this._AllPostbackPublisherService.getAllPubPostback()
    .subscribe(
           data =>{
                      this.postbackPublisher = data.data.results;
                      this.dataSource = new MatTableDataSource(this.postbackPublisher);
                      this.dataSource.paginator = this.paginator;
                      console.log("PostBackPub",  this.postbackPublisher);
           } 
    );
  }


}
