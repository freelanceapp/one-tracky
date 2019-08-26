import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSelectChange } from '@angular/material';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { ZoneModel } from 'src/app/modules/branding/model/zone.model';

@Component({
  selector: 'app-zone-properties',
  templateUrl: './zone-properties.component.html',
  styleUrls: ['./zone-properties.component.scss']
})
export class ZonePropertiesComponent implements OnInit {

  public zoneForm: FormGroup;
  public bannerSizeInput: boolean = false;
  public errMsg: string = '';
  public zoneId: number = null;
  public websiteId: number = null;

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

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private snackBar: MatSnackBar, private zoneService: ZoneService) {
    if (this.activatedRoute.parent.snapshot.paramMap.get('zoneId')) {
      this.zoneId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('zoneId'), 10);
    }
    if (this.activatedRoute.parent.snapshot.paramMap.get('websiteId')) {
      this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    }

    if (this.zoneId && this.websiteId) {
      this.getZoneById();
    }
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
      size: [null]
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

  public getZoneById() {
    this.zoneService.getZone(this.zoneId)
      .then(zone => {
        this.setZoneForm(zone);
      })
      .catch(err => {
        this.errMsg = err;
      });
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
    });
    this.setbannerSize(zone);
  }

  private setbannerSize(zone: ZoneModel) {
    if (zone) {
      const width = zone.width;
      const height = zone.height;

      if (zone.zoneType === 'default') {
        this.zoneForm.controls['size'].setValue(width + 'x' + height);
        this.bannerSizeInput = true;
      }
      if (zone.zoneType === 'custom') {
        this.zoneForm.controls['size'].setValue(zone.zoneType);
        this.bannerSizeInput = false
      }
    }
  }
  public onSubmit() {
    if (this.zoneForm.valid) {
      const data: ZoneModel = this.zoneForm.value;
      this.zoneService.editZone(this.zoneId, data)
        .then(reps => {
          this.snackBar.open('Zone Succefully Edit', 'Done', {
            duration: 2000,
          });
        })
        .catch(err => {
          this.errMsg = err;
        })
        .finally(() => {
        });
    }
  }

  ngOnInit() {
    this.zoneForm = this.createZoneForm();
  }

}
