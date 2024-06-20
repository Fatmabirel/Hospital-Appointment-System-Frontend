import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Admin } from '../models/admin';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = 'http://localhost:60805/api/Users';
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  getAdminProfile(): Observable<Admin> {
    const userId: string = this.tokenService.getUserId();
    if (!userId) {
      throw new Error('Böyle bir kullanıcı bulunamadı');
    }
    return this.httpClient.get<Admin>(`${this.apiUrl}/${userId}`);
  }
}
