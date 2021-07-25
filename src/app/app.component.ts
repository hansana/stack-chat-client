import { Component, NgZone } from '@angular/core';
import { LoginService } from './core/services/login.service';
import { IUser } from './shared/interfaces/shared-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean = false;
  user: IUser;

  constructor(
    private _loginService: LoginService,
    private _ngZone: NgZone
  ) {
    this.checkUserLoggedIn();
    this.subscribeToEvents();
  }

  ngOnInit() {
  }

  private subscribeToEvents(): void {  
    this._loginService.authenticated.subscribe((user: IUser) => {  
      this._ngZone.run(() => {
        if (user.id !== undefined || user.id !== '') {
          this.user = user;
          this.isAuthenticated = true;
        };
      });  
    });  
  }

  checkUserLoggedIn() {
    this.user = JSON.parse(sessionStorage.getItem('isUserAvailable'));
    if (this.user !== undefined && this.user !== null && this.user.userName !== undefined && this.user.userName !== "") {
      this.isAuthenticated = true;
    }
  }
}
