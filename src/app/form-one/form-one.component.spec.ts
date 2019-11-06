import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOneComponent } from './form-one.component';

describe('FormOneComponent', () => {
  let component: FormOneComponent;
  let fixture: ComponentFixture<FormOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOneComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
