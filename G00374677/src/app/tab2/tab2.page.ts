import { Component , NgZone, ElementRef,ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
  background:string="";
  constructor(public storage:Storage) {
    storage.get('background').then((val) =>{
      console.log("Background = ", val);
      this.background = val;
    })
  }

  
  

}