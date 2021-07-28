import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { LoginService } from 'src/app/core/services/login.service';
import { IResponse, IUser } from '../../interfaces/shared-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  user: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    connectionId: '',
    createdAt: ''
  }

  constructor(
    private _loginService: LoginService,
    private logger: LoggerService) { }

  ngOnInit() {
  }

  createLogin() {
    this.isLoading = true;
    this._loginService.createLogin(this.user)
      .subscribe(
        (res: IResponse<IUser>) => {
          this.user = res.data;
        },
        (err: any) => {
          this.isLoading = false;
          this.logger.logError(err);
        },
        () => {
          this.isLoading = false;
          this.logger.log(`User created successfylly`);
        }
      )
  }
}
