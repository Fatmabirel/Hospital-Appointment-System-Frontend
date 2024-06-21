// src/app/services/drschedule.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDrScheduleRequest } from '../models/create-request-drschedule';

import { jwtDecode } from 'jwt-decode';
import { DoctorSchedule } from '../models/doctorschedule';
@Injectable({
  providedIn: 'root'
})
export class DrscheduleService {
  apiUrl = 'http://localhost:60805/api/DoctorSchedules';

  constructor(private httpClient: HttpClient) {}

  add(CreateDrScheduleRequest:CreateDrScheduleRequest,):Observable<DoctorSchedule>
  {
     return this.httpClient.post<DoctorSchedule>(this.apiUrl,CreateDrScheduleRequest);
  }


}
