import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignalDialogComponent } from './components/signal-dialog/signal-dialog.component';
import { AuthService } from './shared/services/auth.service';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material'
import { MapsComponent } from './components/maps/maps.component';
import { CameraFeatureComponent } from './components/natives-features/camera-feature/camera-feature.component';
import { VoiceFeatureComponent } from './components/natives-features/voice-feature/voice-feature.component';
import { SpeechModule } from 'ngx-speech';
import { MotionSensorFeatureComponent } from './components/natives-features/motion-sensor-feature/motion-sensor-feature.component';
import { CoreModule } from './core';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    SignalDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    CameraFeatureComponent,
    VoiceFeatureComponent,
    MotionSensorFeatureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    SpeechModule,
    CoreModule
  ],
  providers: [AuthService,
    { provide: 'SPEECH_LANG', useValue: 'en-US' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SignalDialogComponent]
})
export class AppModule { }
