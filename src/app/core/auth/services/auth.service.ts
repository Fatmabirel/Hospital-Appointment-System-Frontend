import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { ResponseTokenModel } from '../models/responseTokenModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:60805/api/Auth/Login';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<ResponseTokenModel> {
    return this.httpClient.post<ResponseTokenModel>(this.apiUrl, loginModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }


  }
}
