import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurFormComponent } from './collaborateur-form.component';

describe('CollaborateurFormComponent', () => {
  let component: CollaborateurFormComponent;
  let fixture: ComponentFixture<CollaborateurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
