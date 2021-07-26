import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {
  messagesBaseUrl = `${environment.baseUrl}/api/messages`;

  constructor(
    private http: HttpClient
    ) { }

  getAllMessage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.messagesBaseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(
        map(res => {
          const response = res.Value;
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
