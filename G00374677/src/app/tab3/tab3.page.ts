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
    this.storage.get('background').then((value) =>{
      this.background = value;
    })
  }

  change(){
    this.storage.set('toggleF', this.toggleF);
    console.log(this.toggleF);
  }

  openAbout(){
    this.navControl.navigateForward('/about');
  }
  

}
