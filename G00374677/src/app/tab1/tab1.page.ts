import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WeatherService } from '../Service/weather.service';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { stringify } from 'querystring';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  place: string = "";
  country: string = "";
  type: string = "";
  icon: string = "";
  temperature: string = "";
  humidity: string = "";
  uvIndex: string = "";
  description: string = "";
  pressure: string = "";
  feelsLike: string = "";
  tempMin: string = "";
  tempMax: string = "";

  background: string = "";
  appId: string = "3acfb956e3501bdf00bfd62a5fcd3c82"
  constructor(private geolocation: Geolocation, private weatherService: WeatherService, private platform: Platform, private ionicStorage: Storage) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.GetCurrentData();
      console.log("working");
    })
  }
  GetCurrentData() {
    this.geolocation.getCurrentPosition().then((position) => {
      var latitude = position.coords.latitude; // gets the current lat and long possition and sends it to GetCurrentTemperature method  
      var longitude = (position.coords.longitude).toString();// to get the current temperature of your devices current location
      console.log(latitude + " " + longitude);


      this.weatherService.GetCurrentTemperature(latitude, longitude).subscribe((temperaturedata) => {         // subscribe causes get request to execute on the api server       // passes all the incoming temperature data to var temperaturedata
        this.description = temperaturedata.weather[0].main;
        this.GetCurrentdescription(this.description);
        this.humidity = temperaturedata.main.humidity;
        this.pressure = temperaturedata.main.pressure;

        this.place = temperaturedata.name;            // and assigns each tempdata to its corresponding data.
        this.country = temperaturedata.sys.country;
        if (this.country == "IE") { this.country = "Ireland" }

        this.type = temperaturedata.weather[0].main; //  http://openweathermap.org/img/wn/10d@2x.png
        console.log(this.type);
        this.icon = "http://openweathermap.org/img/wn/" + temperaturedata.weather[0].icon // icon for what type of weather it is. eg. snow, rain, clear, windy.
          + "@2x.png";
        console.log(this.icon);

        this.tempMin = ((parseFloat(temperaturedata.main.temp_min) - 273.15)
          .toFixed(2)).toString() + "°C"
        this.tempMax = ((parseFloat(temperaturedata.main.temp_max) - 273.15)
          .toFixed(2)).toString() + "°C"

        this.feelsLike = ((parseFloat(temperaturedata.main.feels_like) - 273.15)
          .toFixed(2)).toString() + "°C"
        this.temperature = ((parseFloat(temperaturedata.main.temp) - 273.15) // temperature data comes in as Kelvin, so have to minus 1 kelvin to incoming value from api
          .toFixed(2)).toString() + "°C";
        console.log(this.temperature);
      })
    })
  }
  
  GetCurrentdescription(description) {
    console.log(description)
    if (description == "Clouds") { this.background = "cloudy-weather" }
    if (description == "Clear") { this.background = "clear-weather" }
    if (description == "Atmosphere") { this.background = "foggy-weather" }
    if (description == "Snow") { this.background = "snow-weather" }
    if (description == "Rain") { this.background = "rain-weather" }
    if (description == "Thunderstorm") { this.background = "windy-weather" }
  }
}


