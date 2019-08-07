import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBannerComponent } from './add-new-banner.component';

describe('AddNewBannerComponent', () => {
  let component: AddNewBannerComponent;
  let fixture: ComponentFixture<AddNewBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
