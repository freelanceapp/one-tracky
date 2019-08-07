import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdvertisersComponent } from './all-advertisers.component';

describe('AllAdvertisersComponent', () => {
  let component: AllAdvertisersComponent;
  let fixture: ComponentFixture<AllAdvertisersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAdvertisersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdvertisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
