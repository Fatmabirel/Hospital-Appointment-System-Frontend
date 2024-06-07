import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DoctorService{

  apiUrl = 'http://localhost:60805/api/Doctors';
  constructor(private httpClient: HttpClient) {}

  getDoctors(pageIndex: number, pageSize: number): Observable<ResponseModel<Doctor>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Doctor>>(this.apiUrl, { params });
  }

}
