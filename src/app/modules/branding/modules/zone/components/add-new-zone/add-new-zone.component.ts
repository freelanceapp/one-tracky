import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { ZoneModel } from 'src/app/modules/branding/model/zone.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';

@Component({
  selector: 'app-add-new-zone',
  templateUrl: './add-new-zone.component.html',
  styleUrls: ['./add-new-zone.component.scss']
})
export class AddNewZoneComponent implements OnInit {
  public zoneForm: FormGroup;
  public errMsg: string = '';
  public websiteId: number = null;
  public bannerSizeInput: boolean = false;


  public zoneSizeArr: Array<{ key: string, value: string }> = [{
    value: '468x60',
    key: 'IAB Full Banner (468 x 60)'
  },
  {
    value: '120x600',
    key: 'IAB Skyscraper (120 x 600)'
  },
  {
    value: '728x90',
    key: 'IAB Leaderboard (728 x 90)'
  },
  {
    value: '120x90',
    key: 'IAB Button 1 (120 x 90)'
  },
  {
    value: '120x60',
    key: 'IAB Button 2 (120 x 60)'
  },
  {
    value: '234x60',
    key: 'IAB Half Banner (234 x 60)'
  },
  {
    value: '88x31',
    key: 'IAB Micro Bar (88 x 31)'
  },
  {
    value: '125x125',
    key: 'IAB Square Button (125 x 125)'
  },
  {
    value: '120x240',
    key: 'IAB Vertical Banner (120 x 240)'
  },
  {
    value: '180x150',
    key: 'IAB Rectangle (180 x 150)'
  },
  {
    value: '300x250',
    key: 'IAB Medium Rectangle (300 x 250)'
  },
  {
    value: '336x280',
    key: 'IAB Large Rectangle (336 x 280)'
  },
  {
    value: '240x400',
    key: 'IAB Vertical Rectangle (240 x 400)'
  },
  {
    value: '250x250',
    key: 'IAB Square Pop-up (250 x 250)'
  },
  {
    value: '160x600',
    key: 'IAB Wide Skyscraper (160 x 600)'
  },
  {
    value: '720x300',
    key: 'IAB Pop-Under (720 x 300)'
  },
  {
    value: '300x100',
    key: 'IAB 3:1 Rectangle (300 x 100)'
  },
  {
    value: 'custom',
    key: 'Custom'
  }
  ];

  constructor(
    private fb: FormBuilder,
    public zoneService: ZoneService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.websiteId = parseInt(this.activatedRoute.snapshot.paramMap.get('websiteId'), 10);

  }




  public createZoneForm() {
    return this.fb.group({
      zoneId: [''],
      description: [''],
      zoneName: ['', [Validators.required, CustomValidators.isAlphaNumericWithSpace]],
      delivery: [''],
      zoneType: [''],
      width: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      comments: [''],
      size: [null],
      affiliateId: this.websiteId
    });
  }

  public setSize(event: MatSelectChange) {
    const size: string = event.value;
    if (size === 'custom') {
      this.zoneForm.controls['zoneType'].setValue('custom');
      this.zoneForm.controls['width'].setValue('');
      this.zoneForm.controls['height'].setValue('');
      this.bannerSizeInput = false;
    } else {
      this.zoneForm.controls['width'].setValue(this.getSize(size)[0]);
      this.zoneForm.controls['height'].setValue(this.getSize(size)[1]);
      this.zoneForm.controls['zoneType'].setValue('default');
      this.bannerSizeInput = true;
    }
  }

  private getSize(size: string): string[] {
    return size.split('x');
  }

  public onSubmit() {
    if (this.zoneForm.valid) {
      const data: ZoneModel = this.zoneForm.value;
      this.zoneService.addNewZone(data)
        .then(reps => {
          this.router.navigateByUrl('/branding/zone')
          this.snackBar.open('Zone Succefully Added', 'Done', {
            duration: 2000,
          });
        })
        .catch(err => {
          this.errMsg = err;
        });
    }
  }

  ngOnInit() {
    this.zoneForm = this.createZoneForm();
  }

}
