import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { ZoneModel } from 'src/app/modules/branding/model/zone.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-zone',
  templateUrl: './add-new-zone.component.html',
  styleUrls: ['./add-new-zone.component.scss']
})
export class AddNewZoneComponent implements OnInit {
  public zoneForm: FormGroup;
  public isNewZone: boolean = true;
  public errMsg: string = '';
  public zoneId: number = null;

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

  constructor(private fb: FormBuilder,
    public zoneService: ZoneService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.zoneId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.zoneId) {
      this.getZoneById();
      this.isNewZone = false;
    }
  }




  public createZoneForm() {
    return this.fb.group({
      zoneId: [''],
      description: [''],
      zoneName: ['', [Validators.required]],
      delivery: [''],
      zoneType: [''],
      width: [''],
      height: [''],
      comments: [''],
      size: [null]
    })
  }

  public setSize(event: MatSelectChange) {
    const size: string = event.value;
    if (size == 'custom') {
      this.zoneForm.controls['zoneType'].setValue('custom');
      this.zoneForm.controls['width'].setValue('');
      this.zoneForm.controls['height'].setValue('');
    }
    else {
      this.zoneForm.controls['width'].setValue(this.getSize(size)[0]);
      this.zoneForm.controls['height'].setValue(this.getSize(size)[1]);
      this.zoneForm.controls['zoneType'].setValue('default');
    }
  }

  private getSize(size: string): string[] {
    return size.split('x');
  }

  public getZoneById() {
    this.zoneService.getZone(this.zoneId)
      .then(zone => {
        this.setZoneForm(zone);
      })
      .catch(err => {
        this.errMsg = err;
      })
  }

  public setZoneForm(zone: ZoneModel) {
    this.zoneForm.patchValue({
      zoneId: zone.zoneId,
      description: zone.description,
      zoneName: zone.zoneName,
      delivery: zone.delivery,
      zoneType: zone.zoneType,
      width: zone.width,
      height: zone.height,
      comments: zone.comments,
    })
    this.setbannerSize(zone)
  }

  private setbannerSize(zone: ZoneModel) {
    if (zone) {
      let width = zone.width;
      let height = zone.height;

      if (zone.zoneType == "default") {
        this.zoneForm.controls['size'].setValue(width + "x" + height);
      }
      if (zone.zoneType == "custom") {
        this.zoneForm.controls['size'].setValue(zone.zoneType);

      }
    }
  }
  public onSubmit() {
    if (this.zoneForm.valid) {
      let data: ZoneModel = this.zoneForm.value;
      if (this.zoneId) {
        this.zoneService.editZone(this.zoneId, data)
          .then(reps => {
            this._snackBar.open('Zone Succefully Edit', 'Done', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.errMsg = err;
          })
          .finally(() => {
          })
      }
      else {
        this.zoneService.addNewZone(data)
          .then(reps => {
            this.router.navigateByUrl('/branding/zone')
            this._snackBar.open('Zone Succefully Added', 'Done', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.errMsg = err;
          })

      }
    }
  }

  ngOnInit() {
    this.zoneForm = this.createZoneForm();
  }

}
