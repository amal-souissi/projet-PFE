import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionformationListComponent } from './sessionformation-list.component';

describe('SessionformationListComponent', () => {
  let component: SessionformationListComponent;
  let fixture: ComponentFixture<SessionformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionformationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
