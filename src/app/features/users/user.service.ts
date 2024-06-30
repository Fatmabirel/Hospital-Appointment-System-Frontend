import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:60805/api/Users/ChangePassword';

 
  constructor(private httpClient: HttpClient) {}



  ChangePassword(User: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}`, User);
  

}
}