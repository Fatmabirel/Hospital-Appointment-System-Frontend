import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl = 'http://localhost:60805/api/Feedbacks';
  constructor(private httpClient: HttpClient) {}

  getFeedbacks(
    pageIndex: number,
    pageSize: number
  ): Observable<ResponseModel<Feedback>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    return this.httpClient.get<ResponseModel<Feedback>>(this.apiUrl, { params });
  }
}
