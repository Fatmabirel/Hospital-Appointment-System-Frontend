import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Patient } from './patientModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseApiUrl = 'http://localhost:60805/api';
  apiUrl = 'http://localhost:60805/api/Patients';
  constructor(private httpClient: HttpClient) {}


  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Token decode edilemedi', Error);
      return null;
    }
  }

  getByPatientId(
    id: string,
    pageIndex: number,
    pageSize: number
  ): Observable<Patient> {
    let params = new HttpParams()
    //.set('PageIndex', pageIndex.toString())
    //.set('PageSize', pageSize.toString())
     .set('id', id);
     

    return this.httpClient.get<Patient>(`${this.apiUrl}/${id}`);
  }


  getPatients(
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Patient>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Patient>>(this.apiUrl, { params });
  }






  getPatientProfile(): Observable<Patient> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const patientId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return this.httpClient.get<Patient>(`${this.apiUrl}/${patientId}`);
  }


}


