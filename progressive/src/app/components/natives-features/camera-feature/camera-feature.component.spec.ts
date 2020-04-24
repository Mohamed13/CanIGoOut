import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraFeatureComponent } from './camera-feature.component';

describe('CameraFeatureComponent', () => {
  let component: CameraFeatureComponent;
  let fixture: ComponentFixture<CameraFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
