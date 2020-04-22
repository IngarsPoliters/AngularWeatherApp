import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import { Observable } from 'rxjs';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {
  place:String="";
  type:string="";
  icon:string="";
  temperature:string="";
  appId:string = "52ec9ebb1db6f2205112b1e15e8db961" 
  constructor(public httpClient:HttpClient, public geolocation:Geolocation, 
    public platform:Platform , private ionicStorage: Storage){
    this.platform.ready().then(()=>{
    this.GetCurrentLocation();
      })
   }
  // for my weather api I found this tutorial on youtube on how to link the weather data to my app
  //https://www.youtube.com/watch?v=QpX30euw-MI
  //I have looked through the code and I understand what is happening, 
  //I have explained as much as possible through the comments

  // this gets the current location of your device in terms of lat and long. 
  // Imports include: HttpClientModule, Gelocation, Platform
  GetCurrentLocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
      var latitude = position.coords.latitude; // gets the current lat and long possition and sends it to GetCurrentTemperature method  
      var longitude = position.coords.longitude;// to get the current temperature of your devices current location
     this.GetCurrentTemperature(latitude, longitude);
    })
  }
  // this gets the current temperature based on your current location
  GetCurrentTemperature(latitude, longitude):Observable<any>{
    //for my weather app I am using  openweathermap.org, I have signed up and requested appid key.
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude // assigns the weather api url to var and added lat and long 
    +"&appid="+this.appId;                                          //as the current position for your  weather data.
   return this.httpClient.get(url).subscribe((temperaturedata)=>{         // subscribe causes get request to execute on the api server
      console.log('Data Received');
      console.log(latitude + " "+ longitude);
      
      var obj:any = temperaturedata;        // passes all the incoming temperature data to var obj
      this.place = obj.timezone;            // and assigns each tempdata to its corresponding data.
      console.log(this.place);
      //this.type = obj.weather[0].main;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather.icon // icon for what type of weather it is. eg. snow, rain, clear, windy.
      +".png";
      this.temperature = ((parseFloat(obj.main.temp)-273.15) // temperature data comes in as Kelvin, so have to minus 1 kelvin to incoming value from api
      .toFixed(2)).toString()+"°C";
    })
  }


}
