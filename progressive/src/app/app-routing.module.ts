import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { MapsComponent } from './components/maps/maps.component';
import { CameraFeatureComponent } from './components/natives-features/camera-feature/camera-feature.component';
import { VoiceFeatureComponent } from './components/natives-features/voice-feature/voice-feature.component';
import { MotionSensorFeatureComponent } from './components/natives-features/motion-sensor-feature/motion-sensor-feature.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'camera-feature', component: CameraFeatureComponent, canActivate: [AuthGuard] },
  { path: 'voice-feature', component: VoiceFeatureComponent, canActivate: [AuthGuard] },
  { path: 'motion-sensor-feature', component: MotionSensorFeatureComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
