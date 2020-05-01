import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherAPI: string = "07538985627d410e958162246202804";

  constructor(private httpClient: HttpClient) { }

  GetCurrentTemperature(latitude, longitute): Observable<any> {
    // I have signed up and requested appid key.
    var url = "http://api.weatherapi.com/v1/current.json?key="+this.weatherAPI+"&q="+
      latitude+","+longitute;
    // assigns the weather api url to var and added lat and long 
                                          //as the current position for my weather data.
    return this.httpClient.get(url);
  } 
}
