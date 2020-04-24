import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceFeatureComponent } from './voice-feature.component';

describe('VoiceFeatureComponent', () => {
  let component: VoiceFeatureComponent;
  let fixture: ComponentFixture<VoiceFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
