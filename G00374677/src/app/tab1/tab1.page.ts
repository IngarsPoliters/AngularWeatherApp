import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  background: string = "";

  constructor(private geolocation: Geolocation,
    private weatherService: WeatherService,
    private mapsAPILoader: MapsAPILoader,
    private platform: Platform,
    private storage: Storage
  ) { }

  coords: {
    latitude: number;
    longitude: number;
  }

  weatherData = {
    name: "",
    region: "",
    country: "",
    localtime: "",
    temp_c: "",
    temp_f: "",
    conditionText: "",
    conditionIcon: "",
    wind_direction: "",
    pressure_mb: "",
    humidity: "",
    feelsLike_c: "",
    feelsLike_f: "",
    uvIndex: "",
  }

  ionViewDidEnter() {

    this.storage.get('location').then((value) => {
      if (value != null) {
        this.coords = JSON.parse(value);
        this.getCurrentWeatherData(this.coords.latitude, this.coords.longitude);
      } else {
        // get current location
        this.geolocation.getCurrentPosition().then((pos) => {
          this.coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }
          this.storage.set('currentLoc', JSON.stringify(this.coords));

          console.log(this.coords);
          this.getCurrentWeatherData(this.coords.latitude, this.coords.longitude);
        })

      }
    })



    // get current location weather data



  }// end of ionViewDidEnter

  getCurrentWeatherData(latitude, longitude) {
    this.weatherService.GetCurrentTemperature(latitude, longitude).subscribe((tempData) => {
      this.weatherData.name = tempData.location.name;
      this.weatherData.region = tempData.location.region;
      this.weatherData.country = tempData.location.country;
      this.weatherData.localtime = tempData.location.localtime;
      this.weatherData.temp_c = tempData.current.temp_c;
      this.weatherData.temp_f = tempData.current.temp_f;
      this.weatherData.conditionText = tempData.current.condition.text;
      this.weatherData.conditionIcon = tempData.current.condition.icon;
      this.weatherData.wind_direction = tempData.current.wind_dir;
      this.weatherData.pressure_mb = tempData.current.pressure_mb;
      this.weatherData.humidity = tempData.current.humidity;
      this.weatherData.feelsLike_c = tempData.current.feelslike_c;
      this.weatherData.feelsLike_f = tempData.current.feelslike_f;
      this.weatherData.uvIndex = tempData.current.uv;

      this.GetCurrentdescription(this.weatherData.conditionText);
    })
  }

  GetCurrentdescription(description) {
    console.log(description)
    if (description == "Cloudy" || description == "Overcast") {
      this.background = "cloudy-weather";
      this.storage.set('background', this.background);
    }



    if (description == "Clear" || description == "Sunny" || description == "Partly cloudy") {
      this.background = "clear-weather";
      this.storage.set('background', this.background);
    }

    if (description == "Mist" || description == "Fog" || description == "Freezing fog") {
      this.background = "foggy-weather";
      this.storage.set('background', this.background);
    }

    if (description == "Snow" || description == "Light sleet showers"
      || description == "Moderate or heavy sleet showers" || description == "Light snow showers"
      || description == "Moderate or heavy snow showers" || description == "Patchy snow possible"
      || description == "Patchy sleet possible" || description == "Blowing snow"
      || description == "Blizzard" || description == "Light sleet" || description == "Moderate or heavy sleet"
      || description == "Patchy light snow" || description == "Light snow" || description == "Patchy moderate snow"
      || description == "Moderate snow" || description == "Patchy heavy snow"
      || description == "Heavy snow" || description == "Ice pellets" || description == "Patchy light snow with thunder"
      || description == "Moderate or heavy snow with thunder") {
      this.background = "snow-weather";
      this.storage.set('background', this.background);
    }

    if (description == "Rain" || description == "Patchy rain possible"
      || description == "Patchy freezing drizzle possible"
      || description == "Patchy light drizzle" || description == "Light drizzle"
      || description == "Freezing drizzle" || description == "Heavy freezing drizzle"
      || description == "Patchy light rain" || description == "Light rain"
      || description == "Moderate rain at times" || description == "Moderate rain"
      || description == "Heavy rain at times" || description == "Heavy rain"
      || description == "Light freezing rain" || description == "Moderate or heavy freezing rain"
      || description == "Light rain shower" || description == "Moderate or heavy rain shower"
      || description == "Torrential rain shower"  ) {
      this.background = "rain-weather";
      this.storage.set('background', this.background);
    }

    if (description == "Thundery outbreaks possible" || description == "Patchy light rain with thunder"
      || description == "Moderate or heavy rain with thunder") {
      this.background = "windy-weather";
      this.storage.set('background', this.background);
    }
  }




}
