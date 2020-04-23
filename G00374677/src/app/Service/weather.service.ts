import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  background: string = "";
  appId: string = "3acfb956e3501bdf00bfd62a5fcd3c82";

  constructor(private httpClient: HttpClient) {
  }

  GetCurrentTemperature(latitude, longitute): Observable<any> {
    //for my weather app I am using  openweathermap.org, I have signed up and requested appid key.
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitute// assigns the weather api url to var and added lat and long 
      + "&appid=" + this.appId;                                          //as the current position for your  weather data.
    return this.httpClient.get(url);
  }
}

