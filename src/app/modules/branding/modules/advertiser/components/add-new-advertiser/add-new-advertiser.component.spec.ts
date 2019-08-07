import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdvertiserComponent } from './add-new-advertiser.component';

describe('AddNewAdvertiserComponent', () => {
  let component: AddNewAdvertiserComponent;
  let fixture: ComponentFixture<AddNewAdvertiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAdvertiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
