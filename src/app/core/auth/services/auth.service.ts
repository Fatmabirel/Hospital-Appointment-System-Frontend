import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { ResponseTokenModel } from '../models/responseTokenModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:60805/api/Auth';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<ResponseTokenModel> {
    return this.httpClient.post<ResponseTokenModel>(`${this.apiUrl}/Login`, loginModel);
  }

  // Patient register
  register(registerModel: RegisterModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(`${this.apiUrl}/Register/Patient`, registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
