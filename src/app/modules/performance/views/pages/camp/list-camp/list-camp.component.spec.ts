/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListCampComponent } from './list-camp.component';

describe('ListCampComponent', () => {
  let component: ListCampComponent;
  let fixture: ComponentFixture<ListCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
