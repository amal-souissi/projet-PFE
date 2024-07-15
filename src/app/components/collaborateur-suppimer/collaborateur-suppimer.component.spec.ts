import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurSuppimerComponent } from './collaborateur-suppimer.component';

describe('CollaborateurSuppimerComponent', () => {
  let component: CollaborateurSuppimerComponent;
  let fixture: ComponentFixture<CollaborateurSuppimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurSuppimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurSuppimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
