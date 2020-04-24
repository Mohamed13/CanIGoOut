import { Component, OnInit, NgZone } from '@angular/core';
import { SpeechService } from 'ngx-speech';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
declare const annyang: any;

@Component({
  selector: 'app-voice-feature',
  templateUrl: './voice-feature.component.html',
  styleUrls: ['./voice-feature.component.scss']
})
export class VoiceFeatureComponent implements OnInit {

  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  message: string = "...";

  context = '';
  subscription = Subscription.EMPTY;
  good: any;
  started = false;

  private _destroyed = new Subject<void>();

  constructor(private ngZone: NgZone, public speech: SpeechService) { }

  ngOnInit() {
    this.speech.start();
    this.speech.message.pipe(takeUntil(this._destroyed)).subscribe(msg =>
      this.message = msg.message);

    this.speech.context.pipe(
      takeUntil(this._destroyed)
    ).subscribe(context => this.context = context);
    this.good = { message: 'Try me!' };
    this.speech.started.pipe(
      takeUntil(this._destroyed)
    ).subscribe(started => this.started = started);

  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.subscription.unsubscribe();
  }

  toggleVoiceRecognition(): void {
    if (this.started) {
      this.speech.stop();
    } else {
      this.speech.start();
    }
  }

  recordStart(): void {
    this.subscription = this.speech.message.subscribe(msg => {
      this.message += msg.message + '\n';
    });
  }

  recordStop(): void {
    this.subscription.unsubscribe();
  }

}
