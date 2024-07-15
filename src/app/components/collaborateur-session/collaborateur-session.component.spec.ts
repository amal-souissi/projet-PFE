import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurSessionComponent } from './collaborateur-session.component';

describe('CollaborateurSessionComponent', () => {
  let component: CollaborateurSessionComponent;
  let fixture: ComponentFixture<CollaborateurSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
