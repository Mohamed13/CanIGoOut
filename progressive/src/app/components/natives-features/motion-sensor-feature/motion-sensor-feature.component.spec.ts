import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionSensorFeatureComponent } from './motion-sensor-feature.component';

describe('MotionSensorFeatureComponent', () => {
  let component: MotionSensorFeatureComponent;
  let fixture: ComponentFixture<MotionSensorFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotionSensorFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotionSensorFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
