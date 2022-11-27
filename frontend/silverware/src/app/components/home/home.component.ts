import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router } from '@angular/router';
import { LocalStorageModel } from 'src/app/models/local-storage/localStorage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public firebase: FirebaseService,
    private localStorageService : LocalStorageService,
    private router: Router
    ) {
      if(this.localStorageService.getItem(LocalStorageModel.userId))
      { 
        this.router.navigate(['/dashboard'])
      }
  }
  title = 'Silverware';
  login() {
    this.firebase.login().then( () => {
        console.log('login user success from home')
    })
  }
}
