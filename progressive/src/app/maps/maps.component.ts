import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  public dropMarker(address: string) {
    this.http.get("https://geocoder.api.here.com/6.2/geocode.json", {
      params: {
        app_id: this.appId,
        app_code: this.appCode,
        searchtext: address
      }
    }).subscribe(result => {
      console.log(result);
      let location = result;
      // let marker = new L.Marker([location.Latitude, location.Longitude]);
      // marker.addTo(this.map);
    });
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let marker = new L.Marker([this.currentLat, this.currentLong]);

    marker.addTo(this.map);
  }
}
