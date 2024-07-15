import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionformationFormComponent } from './sessionformation-form.component';

describe('SessionformationFormComponent', () => {
  let component: SessionformationFormComponent;
  let fixture: ComponentFixture<SessionformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionformationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
