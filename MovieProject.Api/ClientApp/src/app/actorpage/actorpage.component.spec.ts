/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActorpageComponent } from './actorpage.component';

describe('ActorpageComponent', () => {
  let component: ActorpageComponent;
  let fixture: ComponentFixture<ActorpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
