import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from "../../sidebar/doctorSidebar.component";
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../../reports/services/report.service';
import { TokenService } from '../../../../../../core/auth/services/token.service';
import { Router } from '@angular/router';
import { ResponseReport } from '../../../../../reports/models/responseReport';
import { FormsModule } from '@angular/forms';
import { FilterReportIdentityPipe } from '../../../../../pipe/filter-report-identity.pipe';

@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss',
    imports: [DoctorSidebarComponent,CommonModule,FormsModule,FilterReportIdentityPipe,]
})
export class ReportsComponent implements OnInit {

  reports: ResponseReport[] = [];
  pageIndex: number = 0;
  pageSize: number = 100;
  filterText:string = "";

  constructor(
    private reportService: ReportService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDoctorReports();
  }
  getDoctorReports() {
    let doctorId = this.tokenService.getUserId().toString();
    this.reportService
      .getDoctorReports(this.pageIndex, this.pageSize, doctorId)
      .subscribe((response) => {
        this.reports = response.items;
      });
  }

  goToReport(reportId: number) {
    // reportId'nin tipi number olmalı
    this.router.navigate(['report-detail', reportId]); // yönlendirme işlemi
  }
}

