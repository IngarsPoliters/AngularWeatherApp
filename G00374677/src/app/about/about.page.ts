import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  background: string = "";

  constructor(private storage:Storage) { }

  ngOnInit() {
    this.storage.get('background').then((value) =>{
      this.background = value;
    })
  }

}
