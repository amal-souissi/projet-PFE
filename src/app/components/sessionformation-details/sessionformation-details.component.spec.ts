import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionformationDetailsComponent } from './sessionformation-details.component';

describe('SessionformationDetailsComponent', () => {
  let component: SessionformationDetailsComponent;
  let fixture: ComponentFixture<SessionformationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionformationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionformationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
