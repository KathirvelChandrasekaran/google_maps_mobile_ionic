import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Platform } from '@ionic/angular';
import { DeviceService } from '../device.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map') mapView: ElementRef;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  public isDesktop: boolean;
  mapProps: any;

  constructor(private deviceService: DeviceService,
    public platform: Platform) {
    this.isDesktop = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'mapBox',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
      accessToken: environment.mapBox.accessToken
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  ionViewDidEnter() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.86,
      longitude: 151.20,
      zoom: 12
    });

    CapacitorGoogleMaps.addListener('onMapReady', () => {
      CapacitorGoogleMaps.addMarker({
        latitude: -33.86,
        longitude: 151.20,
        title: 'Custom Title',
        snippet: 'Custom Snippet',
      });

      CapacitorGoogleMaps.setMapType({
        type: 'normal'
      });
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

}
