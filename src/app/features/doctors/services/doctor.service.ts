import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { ResponseModel } from '../../models/responseModel';
import { jwtDecode } from 'jwt-decode';
import { Appointment } from '../../appointments/models/appointmentModel';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  apiUrl = 'http://localhost:60805/api/Doctors';
  constructor(private httpClient: HttpClient) {}

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Token decode edilemedi', Error);
      return null;
    }
  }

  getDoctors(
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Doctor>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Doctor>>(this.apiUrl, { params });
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  addDoctor(doctor: any): Observable<Doctor> {
    return this.httpClient.post<any>(this.apiUrl, doctor);
  }

  updateDoctor(doctor: Doctor): Observable<ResponseModel<Doctor>> {
    return this.httpClient.put<ResponseModel<Doctor>>(this.apiUrl, doctor);
  }
  
  deleteDoctor(id: string): Observable<ResponseModel<any>> {
    return this.httpClient.delete<ResponseModel<any>>(`${this.apiUrl}/${id}`);
  }

  getDoctorProfile(): Observable<Doctor> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const doctorId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return this.httpClient.get<Doctor>(`${this.apiUrl}/${doctorId}`);
  }
}
