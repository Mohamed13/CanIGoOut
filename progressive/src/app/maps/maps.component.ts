import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);
  }
}
