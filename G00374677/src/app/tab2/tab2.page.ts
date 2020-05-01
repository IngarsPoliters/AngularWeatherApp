import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  city: string = "";
  background: string = "";
  zoom: number;
  address: string;
  private geoCoder;


  latitude: number;
  longitude: number;

  // AGM map, Google places and google map key enabled.
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(public storage: Storage,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ionViewDidEnter() {
    // loads the map and sets the current location, of location is typed, it is autocompleted 
    this.mapsAPILoader.load().then(() => {
      // get backround from storage and apply
      this.storage.get('background').then((value) => {
        this.background = value;
      })

      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          //assign searched lat and long
          let coords = {
            latitude: this.latitude,
            longitude: this.longitude,
          }
          //store searched lat and long
          this.storage.set('location', JSON.stringify(coords));
          console.log(coords);
        })
      })

    })

  }
//sets current location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;

        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  // gets the address.
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })
  }



}
