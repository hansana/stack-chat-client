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
    private dataService: LoginService,
    private logger: LoggerService) { }

  ngOnInit() {
  }

  createLogin() {
    this.dataService.createLogin(this.user)
      .subscribe(
        (res: IResponse<IUser>) => {
          this.user = res.data;
        },
        (err: any) => this.logger.logError(err),
        () => this.logger.log(`User created successfylly`)
      )
  }
}
