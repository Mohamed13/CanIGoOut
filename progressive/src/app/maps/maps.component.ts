import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { SignalDialogComponent } from '../component/signal-dialog/signal-dialog.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input("appId")
  public appId: string;

  @Input("appCode")
  public appCode: string;

  private map: any;

  public srcTiles: string;

  public height: string;
  currentLat: any;
  currentLong: any;
  isTracking: boolean;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.initMap();

    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let marker = new L.Marker([this.currentLat, this.currentLong]);

    marker.addTo(this.map);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignalDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "myPosition") {

      } else if (result == "chooseOnMap") {
        alert("Choisissez un point sur la map");
      }
    });
  }
}
