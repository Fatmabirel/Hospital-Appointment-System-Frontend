import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointmentModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

  apiUrl = 'http://localhost:60805/api/Appointments';

  constructor(private httpClient: HttpClient) {}

  getDoctorAppointments(
    doctorId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Appointment>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString())
      .set('doctorId', doctorId); // doctorId parametresini doğrudan params'a ekliyoruz
    
    return this.httpClient.get<ResponseModel<Appointment>>(
      `${this.apiUrl}/getByDoctorId`,
      { params }
    );
  }
}
