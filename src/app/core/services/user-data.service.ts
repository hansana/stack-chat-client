import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  loginBaseUrl = 'https://localhost:44348/api/users';
  connection = {
    connectionId: ''
  }

  constructor(
    private http: HttpClient
    ) { }

  updateConnectionId(id: string, connectionId: string): Observable<any> {
    this.connection.connectionId = connectionId;

    this.http.get<any>(`${this.loginBaseUrl}?searchString=hansana`)
    .pipe(
      catchError(this.handleError)
    );

    return this.http.put<any>(`${this.loginBaseUrl}/${id}`, this.connection)
      .pipe(
        map(res => {
          console.log(res);
          return res;
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
