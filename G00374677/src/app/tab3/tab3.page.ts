import { Component } from '@angular/core';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AboutPage} from '../about/about.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  background: string = "";
  public toggleF: boolean = false;
  aboutPage = AboutPage;

  constructor(private storage:Storage, private navControl: NavController) {
    // Storage access for dynamic background
    this.storage.get('background').then((value) =>{
      this.background = value;
    })
  }
  // if toggle "change to farenheight " then all values will be changed from Celsius to Farenheit
  change(){
    this.storage.set('toggleF', this.toggleF);
    console.log(this.toggleF);
  }
  // clicked event triggered on ion-item to open about page.
  openAbout(){
    this.navControl.navigateForward('/about');
  }
  

}
