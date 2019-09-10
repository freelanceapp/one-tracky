import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitePropertiesComponent } from './website-properties.component';

describe('WebsitePropertiesComponent', () => {
  let component: WebsitePropertiesComponent;
  let fixture: ComponentFixture<WebsitePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
