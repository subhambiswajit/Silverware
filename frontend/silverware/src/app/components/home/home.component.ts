import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public firebase: FirebaseService) {
      
  }
  title = 'Silverware';
  
  login() {
    this.firebase.login().then( () => {
        console.log('login user success from home')
    })
  }
}
