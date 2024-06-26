import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointmentModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';
import { Doctor } from '../../doctors/models/doctor';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

  apiUrl = 'http://localhost:60805/api/Appointments';

  constructor(private httpClient: HttpClient) {}


  getAllAppointments(
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Appointment>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Appointment>>(
      `${this.apiUrl}/getAll`,
      { params }
    );
  }

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

  getPatientAppointments(
    patientId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Appointment>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString())
      .set('patientId', patientId);

    return this.httpClient.get<ResponseModel<Appointment>>(
      `${this.apiUrl}/getByPatientId`,
      { params }
    );
  }

  getAppointmentId(
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Appointment>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Appointment>>(this.apiUrl, { params });
  }

  deleteAppointment(appointmentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${appointmentId}`);
  }
  

}
