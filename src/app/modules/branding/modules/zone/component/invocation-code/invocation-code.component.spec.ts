import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocationCodeComponent } from './invocation-code.component';

describe('InvocationCodeComponent', () => {
  let component: InvocationCodeComponent;
  let fixture: ComponentFixture<InvocationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvocationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvocationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
