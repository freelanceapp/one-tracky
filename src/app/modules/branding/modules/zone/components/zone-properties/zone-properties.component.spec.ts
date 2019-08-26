import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePropertiesComponent } from './zone-properties.component';

describe('ZonePropertiesComponent', () => {
  let component: ZonePropertiesComponent;
  let fixture: ComponentFixture<ZonePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
