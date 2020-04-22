import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  place:string="";
  country:string="";
  type:string="";
  icon:string="";
  temperature:string="69";
  appId:string = "3acfb956e3501bdf00bfd62a5fcd3c82" 
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
  GetCurrentTemperature(latitude, longitude){
    //for my weather app I am using  openweathermap.org, I have signed up and requested appid key.
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude // assigns the weather api url to var and added lat and long 
    +"&appid="+this.appId;                                          //as the current position for your  weather data.
    this.httpClient.get(url).subscribe((temperaturedata)=>{         // subscribe causes get request to execute on the api server
      console.log('Data Received');
      console.log(latitude + " "+ longitude);
      
      var obj:any = temperaturedata;        // passes all the incoming temperature data to var obj
      
      this.place = obj.name;            // and assigns each tempdata to its corresponding data.
      this.country = obj.sys.country;
      if(this.country == "IE"){this.country = "Ireland" }
     
      this.type = obj.weather[0].main; //  http://openweathermap.org/img/wn/10d@2x.png
      console.log(this.type);
      this.icon = "http://openweathermap.org/img/wn/"+obj.weather[0].icon // icon for what type of weather it is. eg. snow, rain, clear, windy.
      +"@2x.png";
      console.log(this.icon);
      this.temperature = ((parseFloat(obj.main.temp)-273.15) // temperature data comes in as Kelvin, so have to minus 1 kelvin to incoming value from api
      .toFixed(2)).toString()+"°C";
      console.log(this.temperature);
    })
  }



}
