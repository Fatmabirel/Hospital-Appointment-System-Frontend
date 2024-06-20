import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseReport } from '../models/responseReport';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';
import { UpdateRequestReport } from '../models/update-request-report';
import { AddReport } from '../models/addReport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="http://localhost:60805/api/Reports/"


  getDoctorReports(pageIndex:number,pageSize:number,doctorId:string):Observable<ResponseModel<ResponseReport>>
  {
    let newPath=this.apiUrl+'getByDoctorId'
   let params = new HttpParams()
   .set('PageIndex', pageIndex.toString())
   .set('PageSize', pageSize.toString())
   .set('doctorId',doctorId);

   return this.httpClient.get<ResponseModel<ResponseReport>>(newPath,{params});
  }

  getReportDetails(reportId: number): Observable<ResponseReport> {
    const url = `${this.apiUrl}${reportId}`; // /Reports/1 gibi URL oluşturur

    return this.httpClient.get<ResponseReport>(url);
  }


  updateReport(report: UpdateRequestReport): Observable<Report> {
    return this.httpClient.put<Report>(this.apiUrl, report);
  }

  addReport(addReport:AddReport):Observable<Report>
  {
       return this.httpClient.post<Report>(this.apiUrl,addReport);
  }
}
