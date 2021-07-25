import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IResponse, IUser } from 'src/app/shared/interfaces/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated = new EventEmitter<IUser>();
  loginBaseUrl = 'https://localhost:44348/api/login';

  constructor(
    private http: HttpClient
    ) { }

  createLogin(user: IUser): Observable<any> {
    return this.http.post<any>(this.loginBaseUrl, user)
      .pipe(
        map(res => {
          const response = res.Value.Data as IUser;
          sessionStorage.setItem('isUserAvailable', JSON.stringify(response));
          this.authenticated.emit(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
        // Use the following instead if using lite-server
        // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Server error');
  }
}
