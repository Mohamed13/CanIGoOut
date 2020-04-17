import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { nextContext } from '@angular/core/src/render3';
import * as firebase from 'firebase';
import { SignalDialogComponent } from '../signal-dialog/signal-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';


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
  currentPosition: any;
  db: any;

  arrayOfControls: [] = [];

  icon = {
    icon: L.icon({
      iconSize: [10, 10],
      iconAnchor: [13, 0],
      iconUrl: '../../assets/icons/police_icon.png',
      shadowUrl: '../../assets/icons/police_icon.png'
    })
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private authService: AuthService) {
    this.db = firebase.firestore();
  }

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

    var _that = this;
    this.db.collection("Controls").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            var newMarker = new L.Marker([change.doc.data().position.latitude, change.doc.data().position.longitude], _that.icon);
            _that.addMarker(newMarker);
          }
          if (change.type === "modified") {
              console.log("Updated control");
          }
          if (change.type === "removed") {
              console.log("Removed control");
          }
      });
  });
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
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    
    this.currentPosition = new L.Marker([this.currentLat, this.currentLong]);

    this.currentPosition.addTo(this.map);
    this.map.setView([this.currentLat, this.currentLong], 15)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignalDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "myPosition") {
        let newMarker = new L.Marker([this.currentLat, this.currentLong], this.icon);
        this.addMarker(newMarker);
        
        firebase.database().ref('/Controls').set({
          last_signalment: Date.now(),
          position: { latitude: this.currentLat, longitude: this.currentLong }
        });
      }
      else if (result == "chooseOnMap") {
        this.map.on("click", e => {
          let newMarker = new L.Marker([e.latlng.lat, e.latlng.lng], this.icon);
          this.addMarker(newMarker);
          this.removeEvent();
        });
      }
    });
  }

  public addMarker(marker) {
    marker.addTo(this.map); // add the marker onclick

  }

  public removeEvent() {
    this.map.removeEventListener("click");
  }

}
