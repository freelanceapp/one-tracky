import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent implements OnInit {
  public bannerForm: FormGroup

  constructor(private fb: FormBuilder) { }

  public createBannerForm() {
    return this.fb.group({
      
    })

  }




  ngOnInit() {
  }

}
