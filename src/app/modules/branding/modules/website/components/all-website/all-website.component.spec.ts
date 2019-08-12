import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWebsiteComponent } from './all-website.component';

describe('AllWebsiteComponent', () => {
  let component: AllWebsiteComponent;
  let fixture: ComponentFixture<AllWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
