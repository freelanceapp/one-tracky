import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedBannerComponent } from './linked-banner.component';

describe('LinkedBannerComponent', () => {
  let component: LinkedBannerComponent;
  let fixture: ComponentFixture<LinkedBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
