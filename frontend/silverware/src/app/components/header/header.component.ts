import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private firebase: FirebaseService)
    {

    }
  public logout() {
    this.firebase.logout();
  }
}
