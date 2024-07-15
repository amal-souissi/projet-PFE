import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPowerBiComponent } from './dashbord-power-bi.component';

describe('DashbordPowerBiComponent', () => {
  let component: DashbordPowerBiComponent;
  let fixture: ComponentFixture<DashbordPowerBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordPowerBiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordPowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
