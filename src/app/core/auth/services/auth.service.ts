import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { ResponseTokenModel } from '../models/responseTokenModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

import { jwtDecode } from 'jwt-decode';

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

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Token decode edilemedi', Error);
      return null;
    }
  }


  getUserProfile(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return userId;
  }




}
