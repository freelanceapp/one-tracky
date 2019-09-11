import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertiserComponent } from './edit-advertiser.component';

describe('EditAdvertiserComponent', () => {
  let component: EditAdvertiserComponent;
  let fixture: ComponentFixture<EditAdvertiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdvertiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
