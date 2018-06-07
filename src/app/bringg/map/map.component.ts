import { Component, OnInit, Input, ViewChild } from '@angular/core';
import User from '../models/User';
import { } from '@types/googlemaps';
import Actions from '../models/Actions';
import { ActionsEnum } from '../interfaces/IActions';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() users: Array<User> = [];
  @Input() actions: Actions;
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: object = {};
  infowindows: object = {};

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes) {
    if (!this.map) {
      this.initMap();
    }
    if (changes.actions && changes.actions.currentValue) {
      this.handleChange(changes.actions.currentValue);
    }
  }

  handleChange(change: Actions) {
    const user = <User>change.item;

    switch (change.action) {
      case ActionsEnum.Init:
        this.initMarkers();
        break;
      case ActionsEnum.Remove: 
        this.removeMarker(user);
        break;
      case ActionsEnum.Add:
        this.markers[user.id] = this.createMarker(user);
        break;
    }
  }

  initMap() {
    var myLatLng = { lat: -25.363, lng: 131.044 };

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: myLatLng
    });
  }

  initMarkers() {
    if (!this.users.length) {
      return;
    }

    this.markers = [];
    this.infowindows = {};

    this.users.forEach(user => this.markers[user.id] = this.createMarker(user));
  }

  removeMarker(user: User) {
    this.markers[user.id].setMap(null);

    delete this.markers[user.id];
  }

  handleMarkerClick(marker: google.maps.Marker) {
    const id = marker.get('user').id;

    this.infowindows[id].open(this.map, marker);
  }

  createMarker(user: User): google.maps.Marker {
    const marker = new google.maps.Marker({
      position: { lat: parseFloat(user.latitude.toString()), lng: parseFloat(user.longitude.toString()) },
      map: this.map,
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div class="infowindow-name">${user.firstName}  ${user.lastName}</div>`
    });

    this.infowindows[user.id] = infowindow;

    marker.set('user', user);
    marker.addListener('click', () => { this.handleMarkerClick(marker) });

    return marker;
  }



}