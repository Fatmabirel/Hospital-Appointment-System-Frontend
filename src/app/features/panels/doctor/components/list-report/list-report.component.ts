import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import { ResponseReport } from '../../../../reports/models/responseReport';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../reports/services/report.service';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { response } from 'express';
import { Router } from '@angular/router'; // Router modülünü ekledik

@Component({
    selector: 'app-list-report',
    standalone: true,
    templateUrl: './list-report.component.html',
    styleUrl: './list-report.component.scss',
    imports: [DoctorSidebarComponent,CommonModule]
})
export class ListReportComponent implements OnInit{



  reports: ResponseReport[]=[]
  pageIndex: number = 0;
  pageSize: number = 100;


  constructor(private reportService:ReportService,
    private tokenService:TokenService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getDoctorReports();
  }
  getDoctorReports()
  {
    let  doctorId = this.tokenService.getUserId().toString();
    this.reportService.getDoctorReports(this.pageIndex,this.pageSize,doctorId).subscribe(response=>{
    this.reports=response.items;

  }
   )}


   goToReport(reportId: number) { // reportId'nin tipi number olmalı
    this.router.navigate(['report-detail',reportId]); // yönlendirme işlemi

  }

}
