import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserPropertiesComponent } from './advertiser-properties.component';

describe('AdvertiserPropertiesComponent', () => {
  let component: AdvertiserPropertiesComponent;
  let fixture: ComponentFixture<AdvertiserPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiserPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
