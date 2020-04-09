import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-signal-dialog',
  templateUrl: './signal-dialog.component.html',
  styleUrls: ['./signal-dialog.component.scss']
})
export class SignalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignalDialogComponent>) { }

  ngOnInit() {
  }

  public currentPosition() {
    this.dialogRef.close("myPosition");
  }

  public chooseOnMap() {
    this.dialogRef.close("chooseOnMap");
  }

}
